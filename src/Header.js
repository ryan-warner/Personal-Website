import './index.css';
import HeaderItem from './HeaderItem';

function Header(props) {
  const headerItems = [];
  const pageTitleContent = {"heading": "Ryan Warner"};

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
    <div className="md:h-16 h-12 flex justify-between w-full md:p-8 p-4  text-2xl font-medium items-center absolute z-10">
      {pageTitle}
      <div className="flex md:flex-row flex-col w-auto h-full gap-4 text-xl font-light items-center">
        {headerItems}
      </div>
    </div>
  );
}

export default Header;
