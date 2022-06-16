import {ReactComponent as Github} from "./assets/logo-github.svg"
import {ReactComponent as LinkedIn} from "./assets/logo-linkedin.svg"
import {ReactComponent as Instagram} from "./assets/logo-instagram.svg"
import {ReactComponent as Twitter} from "./assets/logo-twitter.svg"

function Footer(props) {
    const footerItems = [];
    
    var counter = 0
    props.footerContent.forEach(element => {
      var footerItem = null
        
      switch (element.item.linkTo) {
        case "LinkedIn":
            footerItem = <a className="absolute inset-0 m-2 flex justify-center" href={element.item.url} target="_blank" rel="noreferrer"><LinkedIn className="h-8 place-self-center"/></a>
            break
        case "Instagram":
            footerItem = <a className="absolute inset-0 m-2 flex justify-center" href={element.item.url} target="_blank" rel="noreferrer"><Instagram className="h-8 place-self-center" /></a>
            break
        case "Github":
            footerItem = <a className="absolute inset-0 m-2 flex justify-center" href={element.item.url} target="_blank" rel="noreferrer"><Github  className="h-8 place-self-center"/></a>
            break
        case "Twitter":
            footerItem = <a className="absolute inset-0 m-2 flex justify-center" href={element.item.url} target="_blank" rel="noreferrer"><Twitter className="h-8 place-self-center"/></a>
            break
        default:
            footerItem = null
      }

      if (footerItem != null) {
        footerItems.push(<div className="aspect-square fill-black opacity-75 hover:opacity-50 relative" key={counter+=1}>{footerItem}</div>)
      }
      
    });

    return (
        <div className="w-full flex flex-col justify-center h-auto py-8">
            <p className="text-center h-full font-normal text-lg">Made with &#10084; in Atlanta, GA</p>
            <div className="flex gap-2 justify-center overflow-hidden h-16 py-2">
               {footerItems}
            </div>
      </div>
    );
  }
  
  export default Footer;