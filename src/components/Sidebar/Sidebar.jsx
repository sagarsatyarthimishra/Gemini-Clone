import { useState } from "react";
import React from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);

  const { prevPrompt, setRecentPrompt, setShowResult } = useAppContext();

  const loadPrompt = async (item) => {
    setRecentPrompt(item); // Set the selected prompt
    setShowResult(true); // Show the result section
    setResultData(""); // Reset resultData before fetching new data
  };
  

  function handleClick() {
    setExtended(!extended);
  }
  let newChat = () => {
    setShowResult(false); // Hide the result
  };

  return (
    <div className="sidebar">
      <div className="top">
        <img
          className="menu"
          src={assets.menu_icon}
          alt="Menu Icon"
          onClick={handleClick}
        />
        <div className="new-chat" onClick={newChat}>
          <img src={assets.plus_icon} alt="Add New Chat" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompt && prevPrompt.length > 0 ? (
              prevPrompt.map((item, index) => (
                <div
                  className="recent-entry"
                  key={index}
                  onClick={() => loadPrompt(item)} // Set the selected prompt
                >
                  <img src={assets.message_icon} alt="Message Icon" />
                  <p>{item.slice(0, 18)}...</p>{" "}
                  {/* Display the full sentence */}
                </div>
              ))
            ) : (
              <p className="no-recent">No recent prompts</p>
            )}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="Help Icon" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="Activity Icon" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="Settings Icon" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
