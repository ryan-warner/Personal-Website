function ExperienceItem(props) {
    const jobBullets = [];
  
    var counter = 0
    props.job.bullets.forEach(element => {
        // Text Color must be alongside opacity for proper functionality
        jobBullets.push(<li key={counter+=1}>{" " + element}</li>)
    });
    
    return (
        <div className="flex align-top gap-4">
            <div className="my-4 w-24 h-24 relative aspect-square overflow-hidden">
                <img className="object-cover w-full aspect-square object-center absolute inset-0" src={require("./images/" + props.job.imagePath)} alt={props.job.company + " logo"}></img>
            </div>
            <div className="w-full h-full py-4">
                <p className="text-xl font-semibold">{props.job.jobTitle + " (" + props.job.start + " - " + props.job.end + ")"}</p>
                <p className="text-lg font-light min-w-fit w-min">{props.job.company + " - " + props.job.location}</p>
                <p className="pt-1 text-lg">{props.job.description}</p>
                <ul className="list-disc pt-1 text-lg pl-12">{jobBullets}</ul>
            </div>
        </div>
    );
  }
  
  export default ExperienceItem;