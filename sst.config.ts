/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "www",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "local",
      providers: {
        digitalocean: {
          version: "4.35.1",
          token: process.env.DIGITALOCEAN_TOKEN,
        },
        std: "1.7.3",
        command: "1.0.1",
        cloudflare: {
          version: "5.44.0",
          apiToken: process.env.CLOUDFLARE_API_TOKEN,
        },
      },
    };
  },
  async run() {
    const publicKey = await std.file({
      // Must be an absolute path for some reason
      input: "/Users/rwarner/.ssh/id_rsa.pub",
    });
    const privateKey = await std.file({
      input: "/Users/rwarner/.ssh/id_rsa",
    });
    const sshKey = new digitalocean.SshKey("sshKey", {
      name: "sshKey",
      publicKey: publicKey.result,
    });
    const droplet = new digitalocean.Droplet("VPS", {
      image: "ubuntu-24-04-x64",
      region: "nyc1",
      size: "s-1vcpu-512mb-10gb",
      sshKeys: [sshKey.fingerprint],
    });

    const zone = new cloudflare.Zone("zone", {
      zone: "ryanwarner.xyz",
      accountId: process.env.CLOUDFLARE_DEFAULT_ACCOUNT_ID || "",
      plan: "free",
    });

    const dnssec = new cloudflare.ZoneDnssec("siteDnssec", {
      zoneId: zone.id,
    });

    const record = new cloudflare.Record("record", {
      zoneId: zone.id,
      name: zone.zone,
      value: droplet.ipv4Address,
      type: "A",
    });

    const connection = {
      host: droplet.ipv4Address,
      user: "root",
      privateKey: privateKey.result,
    };
    // MARK: Install Dependencies
    const update = new command.remote.Command(
      "update",
      {
        create: [
          `apt-get update`,
          `apt-get upgrade -y`,
          `apt-get install -y snapd`,
          `apt-get install -y nginx`,
          `snap install certbot --classic`,
          `test -L /usr/bin/certbot || ln -s /snap/bin/certbot /usr/bin/certbot`,
        ].join("\n"),
        connection,
      },
      {
        dependsOn: [droplet],
      },
    );
    // MARK: Configure UFW
    new command.remote.Command(
      "ufw",
      {
        create: [
          `ufw allow 80,443/tcp`,
          `ufw allow 22/tcp`,
          `ufw --force enable`,
        ].join("\n"),
        connection,
      },
      {
        dependsOn: [update],
      },
    );
    // Mark: Build Site
    const build = new command.local.Command(
      "build",
      {
        create: `bun run build`,
        dir: "../../packages/www",
        triggers: [Date.now()],
      },
      {
        dependsOn: [update],
      },
    );
    // MARK: Create directories, config files if they don't exist, set permissions to 755
    const mkdir = new command.remote.Command(
      "mkdir",
      {
        create: [
          `mkdir -p /var/www/html`,
          `chmod 755 /var/www/html`,
          `mkdir -p /etc/nginx/sites-available`,
          `test -f /etc/nginx/sites-available/default || touch /etc/nginx/sites-available/default`,
          `chmod 755 /etc/nginx/sites-available/default`,
        ].join("\n"),
        connection,
      },
      {
        dependsOn: [build],
      },
    );

    const site = new $util.asset.FileArchive("../../packages/www/dist");

    // MARK: Copy Site FROM local TO remote
    const copy = new command.remote.CopyToRemote(
      "copy",
      {
        source: site,
        remotePath: "/var/www/html",
        connection,
        triggers: [Date.now()],
      },
      {
        dependsOn: [mkdir, build],
      },
    );
    // Unpack the asset
    const unpack = new command.remote.Command(
      "unpack",
      {
        create: [
          `rsync -av --remove-source-files /var/www/html/dist/ /var/www/html/`,
        ].join("\n"),
        connection,
        triggers: [Date.now()],
      },
      {
        dependsOn: [copy],
      },
    );
    // Create config file
    const config = zone.zone.apply(
      (name) =>
        new command.remote.Command(
          "config",
          {
            create: `
cat << 'EOF' | tee /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default
server {
    listen 80;
    server_name ${name};
    root /var/www/html;
    index index.html;
    location / {
        try_files $uri $uri/ =404;
    }
}
EOF`,
            connection,
          },
          {
            dependsOn: [unpack],
          },
        ),
    );
    // MARK: Configure Nginx
    new command.remote.Command(
      "nginx",
      {
        create: [
          `systemctl enable nginx`,
          `systemctl start nginx`,
          `systemctl status nginx`,
        ].join("\n"),
        connection,
      },
      {
        dependsOn: [config],
      },
    );
    // MARK: Configure SSL
    zone.zone.apply((name) => {
      new command.remote.Command(
        "certbot",
        {
          create: [
            `certbot --nginx --non-interactive --agree-tos -m ry@nwarner.me -d ${name}`,
            `certbot renew --dry-run`,
          ].join("\n"),
          connection,
        },
        {
          dependsOn: [config, zone],
        },
      );
    });

    // MARK: Restart Nginx
    new command.remote.Command(
      "restart",
      {
        create: `systemctl reload nginx`,
        connection,
        triggers: [Date.now()],
      },
      {
        dependsOn: [config],
      },
    );

    new sst.x.DevCommand("Astro", {
      dev: {
        command: "bun astro dev",
        directory: "packages/www",
        autostart: true,
      },
    });
  },
});
