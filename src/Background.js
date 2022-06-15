import HeaderItem from "./HeaderItem";

function Background(props) {
    const interval1 = 10 + Math.round(Math.random() * 15) * 2;
    const interval2 = 10 + Math.round(Math.random() * 15) * 2;
    const interval3 = 10 + Math.round(Math.random() * 15) * 2;

    const height = window.innerHeight;
    const width = window.innerWidth;

    const direction1 = Math.round(Math.random() + 1/3) === 1 ? "spin-normal" : "spin-reverse";
    const direction2 = Math.round(Math.random() + 1/3) === 1 ? "spin-normal" : "spin-reverse";
    const direction3 = Math.round(Math.random() + 1/3) === 1 ? "spin-normal" : "spin-reverse";

    var scrollFunction = null;
    const menuItems = [];
    var counter = 0
    props.menuItems.forEach(element => {
    // Text Color must be alongside opacity for proper functionality

    switch (element.item.heading) {
      case "About":
        scrollFunction = props.aboutScroll;
        break
      case "Experience":
        scrollFunction = props.experienceScroll;
        break
      case "Projects":
        scrollFunction = props.projectsScroll;
        break
      case "Contact":
        scrollFunction = props.contactScroll;
        break
      default: 
        scrollFunction = null
    }

    menuItems.push(<HeaderItem click={scrollFunction} classProps="text-black text-opacity-70 hover:text-opacity-100" item={element.item} key={counter+=1} />)
  });

    return (
        <div className="h-5/6 w-full bg-transparent overflow-hidden z-0 relative">
            <div className={((height * 5/6) > width ? "h-[265%] w-auto " :"w-[265%] h-auto " ) + "absolute aspect-square top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] isolate mix-blend-screen"}>
                <div className="w-full h-full aspect-square absolute inset-0 overflow-visible z-40">
                    <div className={" w-full h-full aspect-square relative overflow-visible origin-center animate-[" + direction1 + "_" + interval1 + "s_linear_infinite]"}>
                        <div className="w-full h-full absolute -left-1/4 -bottom-1/4 bg-gradient-radial from-[#00ffffce] overflow-visible opacity-95 mix-blend-screen"></div>
                    </div>
                </div>
                <div className="w-full h-full aspect-square absolute inset-0 overflow-visible z-30">
                    <div className={"w-full h-full aspect-square relative overflow-visible origin-center animate-[" + direction2 + "_" + interval2 + "s_linear_infinite]"}>
                        <div className="w-full h-full absolute -right-1/4 -top-1/4 bg-gradient-radial from-[#ff00ffce] overflow-visible opacity-95 mix-blend-screen">
                        </div>
                    </div>
                </div>
                <div className="w-full h-full aspect-square absolute inset-0 overflow-visible z-50">
                    <div className={"w-full h-full aspect-square relative overflow-visible origin-center animate-[" + direction3 + "_" + interval3 + "s_linear_infinite]"}>
                        <div className="w-full h-full absolute -left-1/4 -top-1/4 bg-gradient-radial from-[#ffff00ce] overflow-visible opacity-95 mix-blend-screen">
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gradient-to-t from-white h-1/5 absolute bottom-0 inset-x-0 w-full"></div>
            
            <div className={(props.menuState ? "opacity-0 " : "opacity-100 ") + "duration-200 absolute inset-x-0 md:-top-[10%] -top-[10%] w-[90%] h-full flex flex-col justify-center md:p-16 p-6 gap-8"}>
                <p className="text-3xl">{props.introContent.primaryIntro}</p>
                <p className="text-xl font-light">{props.introContent.secondaryIntro}</p>
            </div>
            <div className={(props.menuState ? "opacity-100" : "opacity-0 invisible") + " h-5/6 justify-center absolute z-20 transition-200 gap-4 text-2xl font-light w-full inset-x-0 flex flex-col items-center"}>{menuItems}</div>
        </div>
    )
}

export default Background;