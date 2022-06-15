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
    return (
        <div>
            <div className="w-full h-min min-h-min py-4 flex gap-8">
                <div className="w-2/3 h-min flex-col flex justify-start">
                    {sections}
                </div>
                <div className="w-1/3 self-stretch">
                <div className="relative h-full overflow-hidden rounded-lg shadow-lg -rotate-2">
                    <img className="absolute object-center w-full h-full object-cover inset-0" src={require("./images/" + currentPhoto)} alt={props.content.photoAlt}></img>
                </div>
                </div>
            </div>
      </div>
    );
  }
  
  export default About;