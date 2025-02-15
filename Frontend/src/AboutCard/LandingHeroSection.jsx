// import React from "react";
// import "./LandingHeroSecStyle.scss";
// import ther1 from "../assets/heroimge.jpg"; // Import your image here

// const LandingHeroSection = () => {
//   return (
//     <div className="landing-hero-section">
//       <div className="image-wrapper-landing">
//         <img src={ther1} alt="Hero" className="imge" />
//         <div className="text">
//           <h1>Join The Conversation!</h1>
//           <p>
//             ComicPlane is a community-driven platform where comic book fans can
//             gather, discuss, connect with artist and share their love for the
//             medium. Participate in forums, rate and review comics, and connect
//             with fellow enthusiasts. Become part of a vibrant and inclusive
//             community that celebrates all things comics!
//           </p>
//           <button>Zeal</button>
//           <button>Passion</button>
//           <button>Dream</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LandingHeroSection;
import React, { useState, useEffect } from "react";
import "./LandingHeroSecStyle.scss";
import hero1 from "../assets/heroimge.jpg";
import hero2 from "../assets/landingimage.jpg";
import hero3 from "../assets/Chullu1.jpeg";

const images = [hero1, hero2, hero3]; // Array of images

const LandingHeroSection = () => {
  const [currentImage, setCurrentImage] = useState(hero1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => {
        const currentIndex = images.indexOf(prevImage);
        const nextIndex = (currentIndex + 1) % images.length;
        return images[nextIndex];
      });
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="landing-hero-section">
      <div className="image-wrapper-landing">
        <div className="new-release-badge">New Release</div>
        <img src={currentImage} alt="Hero" className="hero-image" />
      </div>
      <div className="text-content">
        <h1>Enter the World of Comics!</h1>
        <p>
          Welcome to <strong>ComicPlane</strong>! The ultimate destination for comic lovers, artists, and dreamers.
          Explore thrilling stories, discuss your favorite characters, and connect with fellow fans.
        </p>
        <div className="cta-buttons">
          <button className="start-reading">Start Reading</button>
          <button className="join-community">Join Community</button>
        </div>
      </div>
    </div>
  );
};

export default LandingHeroSection;
