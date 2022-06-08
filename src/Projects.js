import ProjectItem from "./ProjectItem"
import ExpandedProjectItem from "./ExpandedProjectItem";
import React, { useState } from "react";

function Projects(props) {
  const [expanded, setExpanded] = useState({name: ""});

  // Must be state somehow
  var expandedItem = null

  function handleExpand(name, item) {
   if (name === expanded.name) {
    setExpanded({"name": null})
   } else {
    setExpanded({"name": name})
    expandedItem = item
    console.log(expandedItem)
   }
  }

  const projectItems = [];
    
  var counter = 0
  props.content.sectionContent.forEach(element => {
    counter+=1;
    projectItems.push(<ProjectItem project={element.project} key={counter} onClick={() => handleExpand(element.project.name, element.project)} expanded={expanded.name === element.project.name ? true : false} />)
  });
  return (
    //<div>
    <div className="w-full h-auto flex justify-center">
      {expandedItem === null ? 
        <div className="w-full h-full py-8 gap-8 grid grid-cols-3">
          {projectItems}
        </div> :
        <ExpandedProjectItem project={expandedItem} />
      }
    </div>
    //</div>
  );
}
  
export default Projects;