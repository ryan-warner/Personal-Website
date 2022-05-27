function About(props) {
    return (
        <div>
            <div className="w-full h-min py-4 flex gap-8">
                <div className="w-2/3 h-min">
                    {props.content.sectionContent}
                </div>
                <div className="w-1/3 self-center object-contain h-fit overflow-hidden rounded-lg shadow-lg -rotate-2">
                    <img className="object-contain w-full self h-min scale-110 inset-x-0 top-0" src={require("./images/" + props.content.photoPath)} alt={props.content.photoAlt}></img>
                </div>
            </div>
      </div>
    );
  }
  
  export default About;