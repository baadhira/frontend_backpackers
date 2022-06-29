import { useLocation, useNavigate } from "react-router-dom";

import "./TopNav.css";

import { H4, H5, H6 } from "../Text/Text";
import { Icon } from "../Icon/Icon";

export const TopNav = () => {
  let navigate = useNavigate();

  const location = useLocation();

  var pathname = window.location.pathname;
  var appId = pathname.split("/")[2];

  const navigation = [
    {
      id: 1,
      icon: "fa-solid fa-house",
      text: "Home",
      url: "/",
    },

    {
      id: 2,
      icon: "fa-solid fa-calendar-check",
      text: "Event",
      url: "/event",
      url2: "/eventdetail",
    },

    {
      id: 3,
      icon: "fa-solid fa-door-open",
      text: "Query",
      url: "/queries",
    },
    {
      id: 4,
      icon: "fa-solid fa-message",
      text: "Inbox",
      url: "/chat",
    },
    {
      id: 5,
      icon: "fa-solid fa-user",
      text: "Profile",
      url: "/profile",
    },
    
  ];

  return (
    <div className="top_nav">
      {navigation.map((data) => (
        <div className="btn_tab" key={data.id}>
          {data.url === location.pathname || data.url2 === location.pathname ? (
            <div className="active" onClick={() => navigate(data.url)}>
              {/* <i class={data.icon}></i> */}
             <H5>{data.text}</H5>

            </div>
          ) : (
            <div className="not_active" onClick={() => navigate(data.url)}>
              {/* <i class={data.icon}></i> */}
              <H5>{data.text}</H5>
              
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
