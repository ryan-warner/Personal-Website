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
      },
    };
  },
  async run() {
    const droplet = new digitalocean.Droplet("VPS", {
      image: "ubuntu-24-04-x64",
      region: "nyc1",
      size: "s-1vcpu-512mb-10gb",
    });

    new sst.x.DevCommand("Astro", {
      dev: {
        command: "bun astro dev",
        directory: "packages/www",
        autostart: true,
      },
    });

    /* const container = new docker.Container("regalo", {
      image: "nginx",
      ports: [{ internal: 80, external: 80 }],
    }); */
  },
});
