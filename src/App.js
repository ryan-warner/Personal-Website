import './index.css';
import Header from './Header';
import React from 'react';
import content from './content.json';
import Background from './Background';
import SectionHeader from './SectionHeader';
import About from './About';
import Experience from './Experience';
import Projects from './Projects';
import ProjectCarousel from './ProjectCarousel';
import Contact from './Contact';
import Footer from './Footer';
//import ReactDOM from 'react-dom/client';

function App() {
  const headerContent = content.header;
  const introContent = content.intro;
  const footerContent = content.footer.links;

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
          sectionContent = <div><Projects content={element.item} key={counter+=1}/><ProjectCarousel content={element.item}/></div>;
          break
        case "Contact":
          sectionContent = <Contact content={element.item} key={counter+=1}/>;
          break
        default: 
          sectionContent = null
    }

    // Text Color must be alongside opacity for proper functionality
    if (sectionContent != null) {
      contentArr.push(
        <div className="w-full flex flex-col divide-y-2" key={counter}>
          <SectionHeader sectionHeading={element.item.heading} key={counter+1} />
          {sectionContent}
        </div>
      )
    }
  });

  return (
    <div className="h-screen w-full">
      <Header headerItems={headerContent}/>
      <Background introContent={introContent}/>
      <div className="pt-8 px-24 w-full">
        {contentArr}
      </div>
      <Footer footerContent={footerContent}/>
    </div>
  );
}
// Add footer, otherwise, keep all content in the contentArr
export default App;
