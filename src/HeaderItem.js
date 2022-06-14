function HeaderItem(props) {
  var text = null  
  if (props.item.heading === "Resume") {
    text = <a href={require("./assets/" + props.item.filePath)} download={"Resume.pdf"} target="_blank" rel="noreferrer"><p className={props.classProps}>{props.item.heading}</p></a>
  } else {
    text = <button onClick={props.click}><p className={props.classProps}>{props.item.heading}</p></button>
  }
    
    return (
      <div>
       {text}
      </div>
    );
  }
  
  export default HeaderItem;