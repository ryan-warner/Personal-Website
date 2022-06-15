import './index.css';
import Header from './Header';
import React, { useRef, useState } from 'react';
import content from './content.json';
import Background from './Background';
import SectionHeader from './SectionHeader';
import About from './About';
import Experience from './Experience';
import Projects from './Projects';
import Contact from './Contact';
import Footer from './Footer';
//import ReactDOM from 'react-dom/client';

function App() {
  const headerContent = content.header;
  const introContent = content.intro;
  const footerContent = content.footer.links;
  const aboutRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  const aboutScroll = () => { aboutRef.current.scrollIntoView({ behavior: 'smooth' }); if (menuState) {handleClick()} };
  const experienceScroll = () => { experienceRef.current.scrollIntoView({ behavior: 'smooth' }); if (menuState) {handleClick()} };
  const projectsScroll = () => { projectsRef.current.scrollIntoView({ behavior: 'smooth' }); if (menuState) {handleClick()} };
  const contactScroll = () => { contactRef.current.scrollIntoView({ behavior: 'smooth' }); if (menuState) {handleClick()} };

  const [menuState, setMenuState] = useState(false);
  function handleClick() {
    setMenuState(!menuState);
  }

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
          sectionContent = <Projects content={element.item} key={counter+=1}/>;
          break
        case "Contact":
          sectionContent = <Contact content={element.item} key={counter+=1}/>;
          break
        default: 
          sectionContent = null
    }

    // Text Color must be alongside opacity for proper functionality
    var sectionHeader = null;
    if (sectionContent != null) {
      switch (element.item.heading) {
        case "About":
          sectionHeader = <SectionHeader ref={aboutRef} sectionHeading={element.item.heading} key={counter+1} />;
          break
        case "Experience":
          sectionHeader = <SectionHeader ref={experienceRef} sectionHeading={element.item.heading} key={counter+1} />;
          break
        case "Projects":
          sectionHeader = <SectionHeader ref={projectsRef} sectionHeading={element.item.heading} key={counter+1} />;
          break
        case "Contact":
          sectionHeader = <SectionHeader ref={contactRef} sectionHeading={element.item.heading} key={counter+1} />;
          break
        default: 
          sectionContent = null
    }
      contentArr.push(
        <div className="w-full flex flex-col divide-y-2" key={counter}>
          {sectionHeader}
          {sectionContent}
        </div>
      )
    }
  });

  return (
    <div className="h-screen w-full">
      <Header click={handleClick} menuState={menuState} aboutScroll={aboutScroll} experienceScroll={experienceScroll} projectsScroll={projectsScroll} contactScroll={contactScroll} headerItems={headerContent}/>
      <Background menuItems={headerContent} menuState={menuState} aboutScroll={aboutScroll} experienceScroll={experienceScroll} projectsScroll={projectsScroll} contactScroll={contactScroll} introContent={introContent}/>
      <div className="pt-8 lg:px-32 md:px-24 sm:px-16 px-4 w-full">
        {contentArr}
      </div>
      <Footer footerContent={footerContent}/>
    </div>
  );
}
// Add footer, otherwise, keep all content in the contentArr
export default App;
