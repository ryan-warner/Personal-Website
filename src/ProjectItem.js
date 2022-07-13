import { ChevronLeftIcon } from "@heroicons/react/outline";
import { ChevronRightIcon } from "@heroicons/react/outline";
import ExpandToggleButton from "./ExpandToggleButton";
import React, { useState, useEffect } from 'react';
import { useSwipeable } from "react-swipeable";

function ProjectItem(props) {
    const [focusedImage, setFocusedImage] = useState(props.project.images[0]);
    const [focusedVisible, setFocusedVisible] = useState(true);
    const [tempImage, setTempImage] = useState(props.project.images[0]);
    const [resetCarousel, setResetCarousel] = useState(false);
    const [runEffect, setRunEffect] = useState(true);

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => getNextImage(),
        onSwipedRight: () => getLastImage()
    },
        {
            preventScrollOnSwipe: true
        }
    )

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
        if (navDirection !== "" && runEffect) {
            setRunEffect(false);
            if (navDirection === "right") {
                setTempImage(nextImage);
            } else {
                setTempImage(previousImage);
            }
            const currentImage = focusedImage;
            const indexOfNext = props.project.images.indexOf(nextImage);
            const indexOfPrev = props.project.images.indexOf(previousImage);
            const numImages = props.project.images.length;
            const imageArray = props.project.images;
            setTimeout(() => {
                setResetCarousel(true);
                setFocusedVisible(false);
                setNextImage(
                    navDirection === "right" ? (indexOfNext === (numImages - 1) ? imageArray[0] : imageArray[indexOfNext + 1] ) : currentImage
                );
                setPreviousImage(
                    navDirection === "left" ? (indexOfPrev === 0 ? imageArray[numImages - 1] : imageArray[indexOfPrev - 1]) : currentImage
                );
                if (navDirection === "right") {
                    setFocusedImage(nextImage);
                } else {
                    setFocusedImage(previousImage);
                }
                setTimeout(
                    () => {
                        setFocusedVisible(true);
                    },100
                )
                setTimeout(() => {
                    setResetCarousel(false);
                    setNavDirection("");
                    setTimeout(
                        () => {setRunEffect(true);},
                        50
                    )
                },150)
            },350)
        }
        
    }, [navDirection, focusedImage, nextImage, previousImage, tempImage, props.project.images, runEffect])
    
    function getNextImage() {
        if (runEffect) {
            setNavDirection("right");
        }
    }

    function getLastImage() {
        if (runEffect) {
            setNavDirection("left");
        }
    }

    const tagItems = [];
    var counter = 0;

    props.project.tags.forEach(element => {
      tagItems.push(<p className="font-normal drop-shadow-lg bg-blue-500 rounded-full py-2 px-4 text-white" key={counter+=1}>{element}</p>)
    });

    const width = window.innerWidth
    
    return (
        <div { ...swipeHandlers } className={(width < 640 ? "flex-col " : "flex-row ") + "relative w-full overflow-hidden flex align-top rounded-md lg:py-4 md:py-2 gap-4"}>
            <div className={(width < 640 ? " self-stretch aspect-square" : (props.even ? " order-1 self-stretch w-2/3" : " order-2 self-stretch w-2/3"))}>
                <div className="relative group h-full w-full overflow-hidden rounded-xl drop-shadow-lg">
                    <img className={(navDirection === "right" && !resetCarousel ? "right-[105%] inset-y-0" : (navDirection === "left" && !resetCarousel ? "left-[105%] inset-y-0" : "inset-y-0 right-0 left-0 z-10")) + (!focusedVisible ? " duration-0 invisible" : " duration-300 visible") + " rounded-md object-cover h-full w-full absolute object-center select-none"} src={require("./images/" + focusedImage)} alt="Project"></img>
                    <img className={(navDirection === "left" && !resetCarousel? "right-0 opacity-0" : "right-[105%]") + (resetCarousel ? " duration-0 invisible " : " duration-300 visible") + " z-10 opacity-100 inset-y-0 object-cover h-full w-full absolute object-center select-none"} src={require("./images/" + previousImage)} alt="Project"></img>
                    <img className={(navDirection === "right" && !resetCarousel ? "left-0 opacity-0" : "left-[105%]") + (resetCarousel ? " duration-0 invisible " : " duration-300 visible") + " z-10 opacity-100 inset-y-0 object-cover h-full w-full absolute object-center select-none"} src={require("./images/" + nextImage)} alt="Project"></img>
                    <img className={(resetCarousel ? "visible" : "invisible" ) +  " inset-y-0 right-0 left-0 duration-0 z-50 rounded-md object-cover h-full w-full absolute object-center select-none"} src={require("./images/" + tempImage)} alt="Project"></img>
                    <div className="absolute left-0 flex flex-col justify-center h-full w-min">
                        <ChevronLeftIcon onClick={() => getLastImage()} className={"h-10 aspect-square z-50 opacity-[0.5] hover:opacity-90 stroke-white visible"}/>
                    </div>
                    <div className="absolute right-0 flex flex-col justify-center h-full w-min">
                        <ChevronRightIcon onClick={() => getNextImage()} className={"h-10 aspect-square z-50 opacity-[0.5] hover:opacity-90 stroke-white visible"}/>
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