import ExpandedProjectItem from "./ExpandedProjectItem";
import CarouselItem from "./CarouselItem";
import React, { useState } from "react";

function ProjectCarousel(props) {
    const [selectedProject, setSelectedProject] = useState(props.content.sectionContent[0].project)
    const projects = props.content.sectionContent;
    const carouselItems = [];
    var counter = 0

    projects.forEach(element => {
        carouselItems.push(<CarouselItem project={element.project} key={counter+=1} selectedProject={selectedProject.name} handleClick={setSelectedProject}/>)
    });

  return (
    <div className="flex flex-col w-full gap-4">
        <ExpandedProjectItem project={selectedProject} />
        <div className="flex">
        <div className="snap-x snap-mandatory flex overflow-x-auto w-1/5 flex-grow gap-4 h-full">
            {carouselItems}
        </div>
        <button>View All Projects</button>
        </div>
    </div>
  );
}
  
export default ProjectCarousel;