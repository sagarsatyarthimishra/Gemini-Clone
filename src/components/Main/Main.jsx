import React, { useState } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { useAppContext } from "../../context/context";
const Main = () => {
  const {
    recentPrompt,
    setRecentPrompt,
    prevPrompt,
    setPrevPrompt,
    showResult,
    setShowResult,
    loading,
    setLoading,
    resultData,
    setResultData,
  } = useAppContext();

  const [inputEnter, setInputEnter] = useState("");
  let GeminiArr = []; // Initialize GeminiArr
  const URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDl3d0sHnhiXrhWzdRSHENqkWX-9fah56Y";

  let handleEvent = (e) => {
    setInputEnter(e.target.value);
  };

  let getData = () => {
    if (!inputEnter.trim()) return; // Prevent empty input submission

    const sendingData = {
      contents: [
        {
          parts: [{ text: inputEnter }],
        },
      ],
    };
    setShowResult(true);
    setRecentPrompt(inputEnter);
    setPrevPrompt((prev) => [...prevPrompt, prev]); // Add the full sentence to prevPrompt
    setInputEnter("");
    setResultData(""); // Reset resultData before fetching new data
    setLoading(true);

    axios
      .post(`${URL}`, sendingData)
      .then((response) => {
        let Answer = response.data.candidates[0].content.parts[0].text;
        let ansArr = Answer.split("**"); // Initialize ansArr
        let newResponse = ""; // Initialize newResponse
        for (let i = 0; i < ansArr.length; i++) {
          if (i === 0 || i % 2 !== 1) {
            newResponse += ansArr[i];
          } else {
            // newResponse += "<b>" + ansArr[i] + "</b>"; second method
            // Using template literals for better readability
            newResponse += `<b>${ansArr[i]}</b>`;
          }
        }
        let newResponse2 = newResponse.split("*").join("<br/>"); // Replace * with <br/>
        let newResponseArray = newResponse2.split(" "); // Split by <br/>
        for (let i = 0; i < newResponseArray.length; i++) {
          const nextWord = newResponseArray[i];
          delay(i, nextWord + " "); // Call delay function with index and nextWord
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("ERR", error);
      });
  };

  const delay = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Sagar.</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beutiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              placeholder="Enter a prompt here"
              onChange={handleEvent}
              value={inputEnter}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setPrevPrompt(inputEnter);
                  setRecentPrompt(inputEnter);
                  setLoading(true);
                  getData();
                }
              }}
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {inputEnter ? (
                <img src={assets.send_icon} alt="" onClick={getData} />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            Gemini is a prototype AI chatbot that can answer questions, provide
            information, and assist with various tasks. It is designed to be
            user-friendly and accessible to everyone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
