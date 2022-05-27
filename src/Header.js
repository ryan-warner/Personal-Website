import './index.css';
import HeaderItem from './HeaderItem';

function Header(props) {
  const headerItems = [];
  const pageTitleContent = {"heading": "Ryan Warner"};

  const pageTitle = <HeaderItem item={pageTitleContent}/>;
  var counter = 0
  props.headerItems.forEach(element => {
    // Text Color must be alongside opacity for proper functionality
    headerItems.push(<HeaderItem classProps="text-black text-opacity-70 hover:text-opacity-100" item={element.item} key={counter+=1} />)
  });
  return (
    <div className="h-16 flex justify-between w-full px-8 text-2xl font-medium items-center absolute z-10">
      {pageTitle}
      <div className="flex w-auto h-full gap-4 text-xl font-light items-center">
        {headerItems}
      </div>
    </div>
  );
}

export default Header;
