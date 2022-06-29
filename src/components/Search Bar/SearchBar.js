import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getEvents } from "../../modules/Event/method/Method";
import { H4, H5, H6 } from "../Text/Text";

import "./SearchBar.css";
import { useNavigate } from "react-router-dom";
import { SearchQuery } from "../SearchData/SearchQuery";
import { SearchHost } from "../SearchData/SearchHost";
import { SearchEvent } from "../SearchData/SearchEvent";
import { SearchUser } from "../SearchData/SearchUser";
import { SearchContent } from "./SearchContent";

export const SearchBar = () => {
  const [searchTerm, SetSearchTerm] = useState("");
  const [explore,setExplore] = useState("User")
  
  const [searchState, setSearchState] = useState(false);

  const { data: event } = useQuery("event", getEvents);

  const [hide,setHide]=useState(true);


  const navigate = useNavigate();

 

  const closeStyle = {
    display: "inline",
  };

  const searchResult = {
    display: "none",
  };

  if (searchState === true) {
    searchResult.display = "block";
    closeStyle.display = "inline";
  }

  if (searchTerm === "") {
    searchResult.display = "none";
    closeStyle.display = "none";
  }

  const theSearch = (e) => {
    SetSearchTerm(e.target.value);

    setSearchState(true);
  };

  const clearSearch = (e) => {
    setSearchState(false)
    SetSearchTerm("");
  };

  return (
    <div className="searchbar">
      <div className="search">
        <i class="fas fa-search"></i>

        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={theSearch}
          onFocus={()=>setHide(true)}
        />

        <i style={closeStyle} onClick={clearSearch} class="fas fa-times"></i>
      </div>
      {searchState?
  <SearchContent 
  explore={explore}
  setExplore={setExplore} 
  SetSearchTerm={SetSearchTerm}
   searchTerm={searchTerm} 
   searchResult={searchResult}
   hide={hide}
  setHide={setHide}
  clearSearch={clearSearch}
   />: null
      }

    </div>
  );
};
