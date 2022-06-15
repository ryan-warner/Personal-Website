import './index.css';
import HeaderItem from './HeaderItem';
import { MenuIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/outline";

function Header(props) {
  const headerItems = [];
  const pageTitleContent = {"heading": "Ryan Warner"};
  const width = window.innerWidth;

  var scrollFunction = null;

  const pageTitle = <HeaderItem item={pageTitleContent}/>;
  var counter = 0
  props.headerItems.forEach(element => {
    // Text Color must be alongside opacity for proper functionality

    switch (element.item.heading) {
      case "About":
        scrollFunction = props.aboutScroll;
        break
      case "Experience":
        scrollFunction = props.experienceScroll;
        break
      case "Projects":
        scrollFunction = props.projectsScroll;
        break
      case "Contact":
        scrollFunction = props.contactScroll;
        break
      default: 
        scrollFunction = null
    }

    headerItems.push(<HeaderItem click={scrollFunction} classProps="text-black text-opacity-70 hover:text-opacity-100" item={element.item} key={counter+=1} />)
  });

  return (
    <div className="h-16 flex justify-between w-full md:p-8 px-4 py-4 text-2xl font-medium items-center absolute z-10">
      {pageTitle}
      <div className="flex flex-row w-auto h-full gap-4 text-xl font-light items-center">
        {width < 640 ? (props.menuState ? <XIcon className="h-full flex-shrink stroke-1" onClick={props.click}/> : <MenuIcon className="h-full flex-shrink stroke-1" onClick={props.click}/>) : headerItems}
      </div>
    </div>
  );
}

export default Header;
