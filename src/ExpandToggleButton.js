function ExpandToggleButton(props) {
    if (props.necessary === false) {
        return null;
    } else {
        return (
            <button className="w-24 shadow-md rounded-full" onClick={() => props.handleClick() }>
                <div className="flex-col rounded-full bg-neutral-300 px-2 flex w-full justify-center align-baseline h-8">
                    <p className="font-semibold w-full self-center h-min text-sm">{"Read " + (props.expanded ? "Less" : "More")}</p>
                </div>
            </button>
        )
    }
}

export default ExpandToggleButton;

