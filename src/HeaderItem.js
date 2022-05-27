function HeaderItem(props) {
    const text = <p className={props.classProps}>{props.item.heading}</p>
    return (
      <div>
       {text}
      </div>
    );
  }
  
  export default HeaderItem;