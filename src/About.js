//import React, { useState } from "react";


function About(props) {
    const sections = [];
    
    var counter = 0
    props.content.sectionContent.forEach(element => {
        counter+=1;
        if (props.content.sectionContent.length === counter) {
            sections.push(<div key={counter}><p>{element}</p></div>)
        } else {
            sections.push(<div key={counter}><p>{element}</p><br></br></div>)
        }
    })

    //const [currentPhoto, setCurrentPhoto] = useState(props.content.photoPath)
    const currentPhoto = props.content.photoPath;
    //function handleSlideShow() {
        
    //}

    // should make the photos a slideshow
    const image = 
        <div className={"w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 aspect-[3/4] pl-2 float-right"}>
        <div className="relative h-full overflow-hidden rounded-xl shadow-lg md:-rotate-2">
            <img className="absolute object-center w-full h-full object-cover inset-0" src={require("./images/" + currentPhoto)} alt={props.content.photoAlt}></img>
        </div>
        </div>
    
    return (
        <div>
            <div className={"w-full h-min min-h-min md:py-4 py-2"}>
                <div className={"w-full h-min "}>
                    {image}
                    {sections}
                </div>
            </div>
      </div>
    );
  }
  
  export default About;