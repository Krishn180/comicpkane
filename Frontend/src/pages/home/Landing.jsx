import React from "react";
import "./style.scss";
import HeroBanner from "./heroBanner/HeroBanner";
import AboutCard from "../../AboutCard/AboutCard";

import Section2 from "../../AboutCard/Section2";
import Navbar from "../../AboutCard/Navbar";
import LandingHeroSection from "../../AboutCard/LandingHeroSection";
import Curated from './curated/Curated';
import ComicSubmissionForm from "../../components/SubmitForm/SubmitForm";

const Landing = () => {
  return (
    <div>
      <Navbar />
      {/* <HeroBanner /> */}
      <LandingHeroSection />
      
      <br />
      <br />
      <br />
      <br />
      <br />
      <Curated/>
      
      <AboutCard />

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      
      <Section2 />

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <ComicSubmissionForm/>
    </div>
  );
};

export default Landing;
