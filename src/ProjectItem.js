import { ChevronLeftIcon } from "@heroicons/react/outline";
import { ChevronRightIcon } from "@heroicons/react/outline";
import React, { useState } from 'react';

// Use State? Probably
//import { useState } from "react";
// Best strategy -- carousel with expanded item visible
// WIth a view all button that shows the grid w/ short description, preview photo, and if selected, returns to carousel view

function ExpandedProjectItem(props) {
    const[focusedImage, setFocusedImage] = useState(props.project.images[0]);
    
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
      tagItems.push(<p className="font-normal hover:scale-110 bg-blue-500 rounded-full py-2 px-4 text-white" key={counter+=1}>{element}</p>)
    });
    
    return (
        <div className="relative w-full h-72 overflow-hidden flex align-top rounded-lg py-4">
            <div className={"relative group h-full w-2/3 overflow-hidden rounded-xl" + (props.even ? " order-1" : " order-2")}>
                <img className="object-cover h-full w-full absolute inset-0 object-center select-none" src={require("./images/" + focusedImage)}></img>
                <div className="absolute left-0 flex flex-col justify-center h-full w-min">
                    <ChevronLeftIcon onClick={() => getLastImage(props.project.images, props.project.images.indexOf(focusedImage))} className="h-10 aspect-square invisible group-hover:visible z-40 opacity-25 hover:opacity-90 stroke-white"/>
                </div>
                <div className="absolute right-0 flex flex-col justify-center h-full w-min">
                    <ChevronRightIcon onClick={() => getNextImage(props.project.images, props.project.images.indexOf(focusedImage))} className="h-10 aspect-square invisible group-hover:visible z-40 opacity-25 hover:opacity-90 stroke-white"/>
                </div>
            </div>
            <div className={"w-full h-full px-4 flex flex-col flex-grow" + (props.even ? " order-2" : " order-1")}>
                <p className="font-semibold text-2xl">{props.project.name}</p>
                <p className="text-lg">{props.project.longDescription}</p>
                <div className="flex mt-4 gap-2">{tagItems}</div>
            </div>
        </div>
    );
  }
  
  export default ExpandedProjectItem;