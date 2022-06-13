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
            footerItem = <a href={element.item.url} target="_blank" rel="noreferrer"><LinkedIn /></a>
            break
        case "Instagram":
            footerItem = <a href={element.item.url} target="_blank" rel="noreferrer"><Instagram /></a>
            break
        case "Github":
            footerItem = <a href={element.item.url} target="_blank" rel="noreferrer"><Github /></a>
            break
        case "Twitter":
            footerItem = <a href={element.item.url} target="_blank" rel="noreferrer"><Twitter /></a>
            break
        default:
            footerItem = null
      }

      if (footerItem != null) {
        footerItems.push(<div className="aspect-square p-2 fill-black opacity-75 hover:opacity-50" key={counter+=1}>{footerItem}</div>)
      }
      
    });

    return (
        <div className="w-full h-auto py-8">
            <p className="text-center h-full font-light text-lg">Made with &#10084; in Atlanta, GA</p>
            <div className="flex gap-2 justify-center overflow-hidde h-16 py-2">
               {footerItems}
            </div>
      </div>
    );
  }
  
  export default Footer;