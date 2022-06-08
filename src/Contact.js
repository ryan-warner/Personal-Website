import { HomeIcon } from "@heroicons/react/outline"
import { DeviceMobileIcon } from "@heroicons/react/outline"
import { UserIcon } from "@heroicons/react/outline"
import { MailIcon } from "@heroicons/react/outline"
import Obfuscate from "react-obfuscate";

function Contact(props) {
    return (
      <div className="w-full h-full py-4 flex flex-col gap-2">
        <div className="flex gap-2">
          <UserIcon className="h-6"/>
          <p className="font-light text-lg">{props.content.name}</p>
        </div>
        <div className="flex gap-2">
          <HomeIcon className="h-6"/>
          <p className="font-light text-lg">{props.content.address}</p>
        </div>
        <div className="flex gap-2">
          <MailIcon className="h-6"/>
          <Obfuscate className="text-lg font-light" email={props.content.email} />
        </div>
        <div className="flex gap-2">
          <DeviceMobileIcon className="h-6"/>
          <Obfuscate className="font-light text-lg" sms={props.content.phone} />
        </div>
      </div>
    );
  }
  
  export default Contact;