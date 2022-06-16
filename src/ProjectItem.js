import { ChevronLeftIcon } from "@heroicons/react/outline";
import { ChevronRightIcon } from "@heroicons/react/outline";
import ExpandToggleButton from "./ExpandToggleButton";
import React, { useState, useEffect } from 'react';

function ProjectItem(props) {
    const [focusedImage, setFocusedImage] = useState(props.project.images[0]);
    const [focusedZIndex, setFocusedZIndex] = useState(0);
    const [focusedReturn, setFocusedReturn] = useState(false);
    const [runOnce, setRunOnce] = useState(true);

    const [nextImage, setNextImage] = useState(
        (props.project.images.length === 1 ? focusedImage : props.project.images[1]));
    const [previousImage, setPreviousImage] = useState(
        (props.project.images.length === 1 ? focusedImage : props.project.images[props.project.images.length - 1]));
    const [navDirection, setNavDirection] = useState("");

    const [expandedProject, setExpandedProject] = useState(false)
    function handleClick() {
        setExpandedProject(!expandedProject)
    }

    useEffect(() => {
        if (navDirection !== "" && runOnce) {
            setRunOnce(false)
            console.log(navDirection)
            const currentImage = focusedImage;
            const numImages = props.project.images.length;
            const indexOfNext = props.project.images.indexOf(nextImage);
            const indexOfPrev = props.project.images.indexOf(previousImage); 
            const oldNavDirection = navDirection;
            setTimeout(() => { 
                setFocusedImage((navDirection === "right" ? nextImage : previousImage))
                setFocusedReturn(true)
                setTimeout(
                    () => {
                        setFocusedZIndex(1);
                        setTimeout(
                            () => {
                                setNextImage((oldNavDirection === "right" ? (indexOfNext === numImages - 1 ? props.project.images[0] : props.project.images[indexOfNext + 1]) : currentImage))
                                setPreviousImage((oldNavDirection === "left" ? (indexOfPrev === 0 ? props.project.images[numImages - 1] : props.project.images[indexOfPrev - 1]) : currentImage))
                                setNavDirection("");
                                setTimeout(() => {
                                    setFocusedZIndex(0);
                                    setRunOnce(true);
                                    setFocusedReturn(false);
                                },500)
                            },100
                        )
                    },100
                )
            },600)
        }
        
    }, [navDirection, focusedImage, nextImage, previousImage, props.project.images, runOnce])
    
    function getNextImage(images, imageIndex) {
        if (navDirection === "") {
            setNavDirection("right")
            if (imageIndex === images.length - 1) {
                imageIndex = 0
            } else {
                imageIndex+=1
            }
            //setFocusedImage(images[imageIndex]);
        }  
    }

    function getLastImage(images, imageIndex) {
        if (navDirection === "") {
            setNavDirection("left")
            if (imageIndex === 0) {
                imageIndex = images.length - 1
            } else {
                imageIndex-=1
            }
            //setFocusedImage(images[imageIndex])
        }
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
                    <img className={(navDirection === "right" && !focusedReturn ? "right-[105%] inset-y-0 duration-500" : (navDirection === "left" && !focusedReturn ? "left-[105%] inset-y-0 duration-500" : "inset-y-0 right-0 left-0 duration-0")) + (focusedZIndex === 1 ? " z-40" : " z-20") + " rounded-md object-cover h-full w-full absolute object-center select-none"} src={require("./images/" + focusedImage)} alt="Project"></img>
                    <img className={(navDirection === "left" ? "right-0 z-30 opacity-0 duration-500" : "right-[105%] z-10 duration-0") + " opacity-100 inset-y-0 object-cover h-full w-full absolute object-center select-none"} src={require("./images/" + previousImage)} alt="Project"></img>
                    <img className={(navDirection === "right" ? "left-0 z-30 opacity-0 duration-500" : "left-[105%] z-10 duration-0") + " opacity-100 inset-y-0 object-cover h-full w-full absolute object-center select-none"} src={require("./images/" + nextImage)} alt="Project"></img>
                    <div className="absolute left-0 flex flex-col justify-center h-full w-min">
                        <ChevronLeftIcon onClick={() => getLastImage(props.project.images, props.project.images.indexOf(focusedImage))} className={"h-10 aspect-square z-50 opacity-[0.5] hover:opacity-90 stroke-white visible"}/>
                    </div>
                    <div className="absolute right-0 flex flex-col justify-center h-full w-min">
                        <ChevronRightIcon onClick={() => getNextImage(props.project.images, props.project.images.indexOf(focusedImage))} className={"h-10 aspect-square z-50 opacity-[0.5] hover:opacity-90 stroke-white visible"}/>
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