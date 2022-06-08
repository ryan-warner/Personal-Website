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
    projectItems.push(<ExpandedProjectItem project={element.project} key={counter} even={(counter + 1) % 2 === 0} />)
  });
  return (
    <div className="w-full h-auto flex justify-center">
      <div className="w-full h-full py-8 gap-10 flex flex-col">
        {projectItems}
      </div>
    </div>
  );
}
  
export default Projects;