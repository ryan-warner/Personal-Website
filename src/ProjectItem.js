import { ChevronLeftIcon } from "@heroicons/react/outline";
import { ChevronRightIcon } from "@heroicons/react/outline";
import ExpandToggleButton from "./ExpandToggleButton";
import React, { useState } from 'react';

function ProjectItem(props) {
    const [focusedImage, setFocusedImage] = useState(props.project.images[0]);

    const [expandedProject, setExpandedProject] = useState(false)
    function handleClick() {
        setExpandedProject(!expandedProject)
    }
    
    //const scrollToRef = (ref) => 
    // Infinite carousel to add
    
    function getNextImage(images, imageIndex) {
        if (imageIndex === images.length - 1) {
            imageIndex = 0
        } else {
            imageIndex+=1
        }
        setFocusedImage(images[imageIndex]);
    }

    function getLastImage(images, imageIndex) {
        if (imageIndex === 0) {
            imageIndex = images.length - 1
        } else {
            imageIndex-=1
        }
        setFocusedImage(images[imageIndex])
    }

    const tagItems = [];
    var counter = 0;

    props.project.tags.forEach(element => {
      tagItems.push(<p className="font-normal drop-shadow-lg bg-blue-500 rounded-full py-2 px-4 text-white" key={counter+=1}>{element}</p>)
    });

    const width = window.innerWidth
    
    return (
        <div className={(width < 640 ? "flex-col " : "flex-row ") + "relative w-full overflow-hidden flex align-top rounded-md lg:py-4 md:py-2 gap-4"}>
            <div className={(width < 640 ? " self-stretch aspect-square" : (props.even ? " order-1 self-stretch w-2/3" : " order-2 self-stretch w-2/3"))}>
                <div className="relative group h-full w-full overflow-hidden rounded-xl drop-shadow-lg">
                    <img className="z-20 object-cover h-full w-full absolute inset-0 object-center select-none" src={require("./images/" + focusedImage)} alt="Project"></img>
                    <div className="absolute left-0 flex flex-col justify-center h-full w-min">
                        <ChevronLeftIcon onClick={() => getLastImage(props.project.images, props.project.images.indexOf(focusedImage))} className={"h-10 aspect-square z-40 opacity-[0.5] hover:opacity-90 stroke-white visible"}/>
                    </div>
                    <div className="absolute right-0 flex flex-col justify-center h-full w-min">
                        <ChevronRightIcon onClick={() => getNextImage(props.project.images, props.project.images.indexOf(focusedImage))} className={"h-10 aspect-square z-40 opacity-[0.5] hover:opacity-90 stroke-white visible"}/>
                    </div>
                </div>
            </div>
            <div className={"w-full h-full flex flex-col flex-grow" + (props.even ? " order-2" : " order-1")}>
                <p className="font-semibold text-2xl">{props.project.name}</p>
                <p className={"text-lg duration-150 " + (width < 640 & !expandedProject ? "line-clamp-4" : "" )} >{props.project.longDescription}</p>
                <div className="flex align-top">
                    <div className="order-2 flex justify-end h-min mt-4 overflow-visible"><ExpandToggleButton necessary={width < 640} handleClick={handleClick} expanded={expandedProject}/></div>
                    <div className="flex flex-wrap mt-4 gap-2 grow h-min">{tagItems}</div>
                </div>
            </div>
        </div>
    );
  }
  
  export default ProjectItem;