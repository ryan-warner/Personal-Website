function CarouselItem(props) {
    return (
        <button className="px-4 py-2 bg-purple-400 rounded-md" onSelect={() => props.handleClick(props.project)}>
        <p className={"snap-start snap-always min-w-min flex-none text-center text-xl" + (props.selectedProject === props.project.name ? " font-bold" : " font-normal")}>{props.project.name}</p>
        </button>
    );

}

export default CarouselItem;