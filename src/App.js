import './index.css';
import Header from './Header';
import React from 'react';
import content from './content.json';
import Background from './Background';
import SectionHeader from './SectionHeader';
import About from './About';
import Experience from './Experience';
import Projects from './Projects';
import Contact from './Contact';
//import ReactDOM from 'react-dom/client';

function App() {
  const headerContent = content.header;
  const introContent = content.intro;

  const contentArr = [];
  var counter = 0
  
  headerContent.forEach(element => {
      var sectionContent = null;
      switch (element.item.heading) {
        case "About":
          sectionContent = <About content={element.item} key={counter+=1}/>;
          break
        case "Experience":
          sectionContent = <Experience content={element.item} key={counter+=1}/>;
          break
        case "Projects":
          sectionContent = <Projects sectionContent={element.item.heading} key={counter+=1}/>;
          break
        case "Contact":
          sectionContent = <Contact sectionContent={element.item.heading} key={counter+=1}/>;
          break
        default: 
          <div></div>
    }

    // Text Color must be alongside opacity for proper functionality
    contentArr.push(
      <div className="w-full flex flex-col divide-y-2" key={counter}>
        <SectionHeader sectionHeading={element.item.heading} key={counter+1} />
        {sectionContent}
      </div>
    )
  });

  return (
    <div className="h-screen w-full">
      <Header headerItems={headerContent}/>
      <Background introContent={introContent}/>
      <div className="p-8 w-full">
        {contentArr}
      </div>
    </div>
  );
}
// Add footer, otherwise, keep all content in the contentArr
export default App;
