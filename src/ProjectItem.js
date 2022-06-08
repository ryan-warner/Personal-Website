import { ChevronDownIcon } from "@heroicons/react/outline";
import ExpandedProjectItem from "./ExpandedProjectItem";

function ProjectItem(props) {
    //hover:scale-105 duration-100
    return (
        <div className="flex align-top rounded-lg">
            <div className="relative w-2/3 aspect-square rounded-lg h-full overflow-hidden">
                <img className="object-cover h-full w-full absolute inset-0 object-center" src={require("./images/" + props.project.images[0])}></img>
            </div>
            <div className="w-full h-auto  px-4 flex flex-col">
                <p className="font-semibold text-lg">{props.project.name}</p>
                <p className="">{props.project.shortDescription}</p>
                <button className="min-w-fit" onClick={props.onClick}>{"Test " + props.expanded}</button>
            </div>
        </div>
    );
  }
  
  export default ProjectItem;