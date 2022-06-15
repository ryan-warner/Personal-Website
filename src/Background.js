function Background(props) {
    const interval1 = 10 + Math.round(Math.random() * 15) * 2;
    const interval2 = 10 + Math.round(Math.random() * 15) * 2;
    const interval3 = 10 + Math.round(Math.random() * 15) * 2;

    const direction1 = Math.round(Math.random() + 1/3) === 1 ? "spin-normal" : "spin-reverse";
    const direction2 = Math.round(Math.random() + 1/3) === 1 ? "spin-normal" : "spin-reverse";
    const direction3 = Math.round(Math.random() + 1/3) === 1 ? "spin-normal" : "spin-reverse";

    return (
        <div className="h-5/6 w-full bg-transparent overflow-hidden z-0 relative">
            <div className="absolute md:w-[250%] md:h-auto h-[250%] w-auto   aspect-square top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] isolate mix-blend-screen">
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
            
            <div className="absolute inset-x-0 -top-[10%] w-2/3 h-full flex flex-col justify-center p-16 gap-8">
                <p className="text-3xl">{props.introContent.primaryIntro}</p>
                <p className="text-xl font-light">{props.introContent.secondaryIntro}</p>
            </div>
        </div>
    )
}

export default Background;