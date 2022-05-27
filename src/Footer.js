function Footer(props) {
    return (
        <div>
            <div className="w-full h-full py-4 flex">
                <div className="flex-1">
                    {props.content.sectionContent}
                </div>
                <img className="object-contain flex-shrink w-1/5" src={require("./images/" + props.content.photoPath)} alt={props.content.photoAlt}></img>
            </div>
      </div>
    );
  }
  
  export default Footer;