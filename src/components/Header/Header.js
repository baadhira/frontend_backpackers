import React, { useState } from "react";
import { SearchBar } from "../Search Bar/SearchBar";
import { TopNav } from "../TopNav/TopNav";

import "./Header.scss";

import { PrimaryBtn } from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { Icon } from "../Icon/Icon";
import { DropdownBtn } from "../Dropdown/Dropdown";
import { Notifications } from "../../modules/Notifications/Notifications";

export const Header = () => {
  const navigate = useNavigate();

  const [explore,setExplore] = useState("Explore")
  const[not_details,setNotdetails] = useState(false)


  return (
    <div className="header">
      <div className="header_holder">
        <img width="60px" src={require("../../assets/images/logo/logo.png")} />

        <SearchBar explore={explore} text="Where are you going?" />
      </div>

      {/* <div className="dropdown">
        <button className="dropbtn">{explore}</button>
        <div className="dropdown-content">
          <a  onClick={() =>setExplore('Find Host')}>
            Find Host
          </a>
          <a  onClick={() => setExplore("Find Query")}>
            Find Query
          </a>
          <a  onClick={() => setExplore("Find Event")}>
            Find Event
          </a>
          <a  onClick={() => setExplore("Find User")}>
            Find User
          </a>
        </div>
      </div> */}
      <DropdownBtn text={explore}>
      <a  onClick={() =>setExplore('Find Host')}>
            Find Host
          </a>
          <a  onClick={() => setExplore("Find Query")}>
            Find Query
          </a>
          <a  onClick={() => setExplore("Find Event")}>
            Find Event
          </a>
          <a  onClick={() => setExplore("Find User")}>
            Find User
          </a>

      </DropdownBtn>

      <div className="header_holder">
        <TopNav />
      </div>

      <div className="header_holder">
        {localStorage.getItem("authToken") ? (
          <>
            {/* <Icon
              backgroundColor="white"
              color="dodgerblue"
              border="1px solid dodgerblue"
              margin="0 10px"
              className="fa-solid fa-bell"
            /> */}

            {/* <Icon
              onClick={() => navigate("/settings")}
              backgroundColor="white"
              color="dodgerblue"
              border="1px solid dodgerblue"
              margin="0 10px"
              className="fa-solid fa-gear"
            /> */}
          
              <Icon
                  margin="10px"
                  icon="fa-solid fa-bell"
                  onClick={()=>setNotdetails(true)}
                  backgroundColor="dodgerblue"
                />

{/* <i class="fa-solid fa-bell"></i> */}
{/* <i className="fa fa-close"  onClick={() => setNotdetails(false)}></i> */}
{not_details?
    <div className="popupalbum">
    {/* <Icon backgroundColor="white" color="black" className="fa fa-close"  onClick={() => setNotdetails(false)} /> */}
    <i className="fa fa-close"  onClick={() => setNotdetails(false)}></i>
    <Notifications/>
    </div>: null
    }
          </>
          
        ) : (
          <>
            <PrimaryBtn margin="0 10px" onClick={() => navigate("/login")}>
              Log In
            </PrimaryBtn>

            <PrimaryBtn margin="0 10px" onClick={() => navigate("/signup")}>
              Sign Up
            </PrimaryBtn>
          </>
        )}
      </div>
    </div>
  );
};
