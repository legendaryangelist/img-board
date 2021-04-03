import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
// import { useSelector } from "react-redux";
// import { SidebarData } from "../Utils/UserBarData";
import "./MidBar.css";


const Midbar = () => {
  const [sidebar, setSidebar] = useState(false);  
  const showSidebar = () => setSidebar(!sidebar);
  // const boardData = useSelector((state) => state.appstate.boardData);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {/* {boardData.map((item, index) => {
              return (
                <li key={index}>
                  <Link to={`/boards/${item.id}`}>
                    <AiIcons.AiFillHome />
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })} */}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};
export default Midbar;
