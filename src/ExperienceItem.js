import ExpandToggleButton from "./ExpandToggleButton";
import { useState } from "react";

function ExperienceItem(props) {
    const jobBullets = [];
    const [expandedExperience, setExpandedExperience] = useState(false)
    function handleClick() {
        setExpandedExperience(!expandedExperience)
    }
  
    var counter = 0
    props.job.bullets.forEach(element => {
        // Text Color must be alongside opacity for proper functionality
        jobBullets.push(<li key={counter+=1}><p className="my-0">{" " + element}</p></li>)
    });

    const width = window.innerWidth;
    
    return (
        <div className={(width < 640 ? "pb-4" : "")}>
        <div className={(width < 640 ? "align-baseline" : "align-top") + " flex gap-4"}>
            <div className={(width < 640 ? "self-stretch aspect-square w-28 my-2 sm:my-4" : "w-24 h-24 aspect-square mb-2 mt-1 sm:mb-4" ) + " shrink relative overflow-hidden"}>
                <img className="object-cover w-full overflow-visible object-center absolute inset-0" src={require("./images/" + props.job.imagePath)} alt={props.job.company + " logo"}></img>
            </div>
            <div className="w-full h-min grow place-self-center">
                {width < 640 ? <p className="text-xl font-semibold">{props.job.jobTitle}</p> : <p className="text-xl font-semibold">{props.job.jobTitle + " (" + props.job.start + " - " + props.job.end + ")"}</p> }
                {width < 640 ? <p className="text-xl font-semibold">{props.job.start + " - " + props.job.end}</p> : null }
                <p className="text-lg font-light min-w-fit w-min">{props.job.company + " - " + props.job.location}</p>
                {width < 640 ? null : <p className="pt-1 text-lg">{props.job.description}</p> }
                {width < 640 || jobBullets.length === 0 ? null : <ul className="list-disc pt-1 text-lg pb-2 pl-12 prose text-black">{jobBullets}</ul>}
            </div>
        </div>
            {width < 640 ? <p className="pt-1 text-lg">{props.job.description}</p> : null}
            <div className="w-full flex justify-end overflow-visible mt-2"><ExpandToggleButton necessary={jobBullets.length !== 0 && (width < 640 && !expandedExperience) } handleClick={handleClick} expanded={expandedExperience}/></div>
            {width < 640 ? (expandedExperience ? <ul className="list-disc pt-1 text-lg pl-12 prose text-black">{jobBullets}</ul> : null) : null}
            <div className="w-full flex justify-end overflow-visible mt-2"><ExpandToggleButton necessary={jobBullets.length !== 0 && (width < 640 && expandedExperience) } handleClick={handleClick} expanded={expandedExperience}/></div>
        </div>
    );
  }
  
  export default ExperienceItem;