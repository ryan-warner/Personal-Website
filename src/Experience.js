import ExperienceItem from "./ExperienceItem";

function Experience(props) {
  const experienceItems = [];
  
  var counter = 0
  props.content.sectionContent.forEach(element => {
    // Text Color must be alongside opacity for proper functionality
    experienceItems.push(<ExperienceItem job={element.job} key={counter+=1} />)
  });

    return (
      <div className="w-full h-full md:py-4 py-2">
       {experienceItems}
      </div>
    );
  }
  
  export default Experience;