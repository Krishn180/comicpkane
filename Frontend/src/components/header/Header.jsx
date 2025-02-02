import React, { useState, useEffect } from "react";
import { FaBell, FaSearch, FaUsers } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import { FiSettings } from "react-icons/fi";
import avatar from "../../assets/avatar.png";
import axios from "axios";
import logozp from "/src/assets/logoZP.png";
import Logout from "./logout/Logout"; // Import the Logout component
import axiosInstance from "../../Auth/Axios";
import Searchbar from "./Searchbar";
import Navbar from "../../AboutCard/Navbar";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]); // Store search results
  const [showSearchList, setShowSearchList] = useState(false); // Toggle search results visibility
  const [showSearch, setShowSearch] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const userIdRedux = useSelector((state) => state.user.userId);
  const userIdLocalStorage = localStorage.getItem("Id");
  const userId = userIdRedux || userIdLocalStorage;
  const [userName, setUserName] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    if (token && userId) {
      const fetchUserDetails = async () => {
        try {
          const response = await axiosInstance.get(
            `${apiBaseUrl}/users/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("User data fetched for header:", response.data.user);

          setUserName(response.data.user.username);
          setProfilePic(response.data.user.profilePic || avatar);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };

      fetchUserDetails();
    }
  }, [token, userId]);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const handleProfileClick = () => {
    setIsClicked(!isClicked); // Toggle the click state
    setShowProfileOptions(!showProfileOptions); // Toggle the profile options visibility
  };
  // Show profile options on hover
  const handleMouseEnter = () => {
    setShowProfileOptions(true); // Show options on hover
  };

  const handleMouseLeave = () => {
    setShowProfileOptions(false); // Hide options when mouse leaves
  };

  const handleVisitProfile = () => {
    navigate(`/profile/${userId}`);
    setShowProfileOptions(false);
  };

  const handleNotificationClick = () => {
    navigate(`/home/Notification`);
  };

  const handleForumClick = () => {
    navigate("/forum");
  };

  if (!token) {
    return <Navbar />;
  }

  return (
    <header
      className={`header1 ${show}`}
      style={{
        position: "fixed",
        background: "rgba(0, 0, 0, 0.4)",
        width: "100%",
      }}
    >
      <ContentWrapper>
        <div className="logo" onClick={() => navigate("/home")}>
          <img src={logozp} alt="Logo" />
        </div>
        <Searchbar axiosInstance={axiosInstance} />

        <ul className="menuItems">
          <li className="menuItem1" onClick={handleForumClick}>
            {window.innerWidth <= 568 ? (
              <div className="iconWrapper">
                <FaUsers className="communityIcon" />
                <span className="hoverText">Communities</span>
              </div>
            ) : (
              "Communities"
            )}
          </li>
          <li
            className="menuItem1"
            style={{ color: "white" }}
            onClick={handleNotificationClick}
          >
            <FaBell />
          </li>

          <li
            className="menuItem1 profile-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={profilePic || avatar}
              alt="Profile"
              className="avatarImage"
              onClick={handleProfileClick}
            />
            {userName && (
              <span
                className="username"
                onClick={handleProfileClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {userName}
              </span>
            )}
            {showProfileOptions && (
              <div
                className={`profile-options ${
                  showProfileOptions ? "active" : ""
                }`}
              >
                <ul>
                  <li onClick={handleVisitProfile}>Profile</li>
                  <hr />
                  <li>
                    <Logout />
                  </li>
                  <li onClick={() => navigate("/settings")}>
                    <FiSettings className="header-icon" /> Settings
                  </li>
                </ul>
              </div>
            )}
          </li>
        </ul>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or TV show...."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
