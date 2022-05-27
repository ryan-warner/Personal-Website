function ExperienceItem(props) {
    return (
      <div className="w-full h-full py-4">
        <p className="text-xl font-semibold">{props.job.jobTitle}</p>
        <p className="text-lg">{props.job.company}</p>
        <p className="text-lg">{props.job.start + " - " + props.job.end}</p>
        <p className="">{props.job.description}</p>
      </div>
    );
  }
  
  export default ExperienceItem;