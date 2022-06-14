import React, { forwardRef } from 'react';

const SectionHeader = forwardRef((props, ref) => {
    return (
      <div ref={ref} className="w-full h-12 font-light text-3xl flex">
        <p className="h-min min-h-min self-center">
          {props.sectionHeading}
        </p>
      </div>
    );
  })
  
  export default SectionHeader;