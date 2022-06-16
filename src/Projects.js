import ProjectItem from "./ProjectItem"
import { useState } from "react";

function Projects(props) {
  const [expandedProject, setExpandedProject] = useState({name: ""})
  function handleClick(projectName) {
    var newExpanded = null;
    if (projectName.name === expandedProject.name) {
      newExpanded = {name: ""}
    } else {
      newExpanded = projectName
    }
    setExpandedProject(newExpanded)
  }

  const projectItems = [];
    
  var counter = 0
  props.content.sectionContent.forEach(element => {
    counter+=1;
    projectItems.push(<ProjectItem click={handleClick} expanded={expandedProject} project={element.project} key={counter} even={(counter + 1) % 2 === 0} />)
  });
  return (
    <div className="w-full h-auto flex justify-center pt-2">
      <div className="w-full h-full md:py-4 py-2 gap-8 flex flex-col">
        {projectItems}
      </div>
    </div>
  );
}
  
export default Projects;