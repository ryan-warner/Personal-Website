import ProjectItem from "./ProjectItem"
import React, { useState } from "react";

function Projects(props) {

  const projectItems = [];
    
  var counter = 0
  props.content.sectionContent.forEach(element => {
    counter+=1;
    projectItems.push(<ProjectItem project={element.project} key={counter} even={(counter + 1) % 2 === 0} />)
  });
  return (
    <div className="w-full h-auto flex justify-center">
      <div className="w-full h-full py-8 gap-8 flex flex-col">
        {projectItems}
      </div>
    </div>
  );
}
  
export default Projects;