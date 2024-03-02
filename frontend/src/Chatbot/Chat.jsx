import "./chat.css";
import Navbar from "../Navbar/NavBar";
import { useState } from "react";
import axios from "axios";
const waitingMessages = [
  "Hang tight! I'm fetching the perfect response for you.",
  "Just a moment while I gather some insights for you.",
  "Sit tight! I'm working on finding the best answer for you.",
  "Thanks for your patience! I'm on it.",
  "I'm here, just processing your request. Won't be long!",
  "Getting your answer ready. Thanks for waiting!",
  "Almost there! I appreciate your patience.",
  "Just a moment while I consult my virtual brain.",
  "Hold on tight! I'm diving into the data for you.",
  "I'm on the case! Thanks for giving me a moment.",
];

const ChatBot = () => {
  let [value, setValue] = useState("");
  let [data, setData] = useState({});
  let [count, setCount] = useState(0);
  let [loading, setLoading] = useState(false);
  let handlePrompt = async () => {
    try {
      setCount((p) => p + 1);
      setLoading((p) => !p);
      setData({ user: value, response: "..." });
      let data = await axios.post("http://localhost:3001/api/chat/bot1", {
        prompt: value,
      });
      setValue("");
      setData({ ...data.data });
      setLoading((p) => !p);
    } catch (err) {
      console.log(err);
      let newObj = {
        user: value,
        response: "Network Error 😢",
      };
      setData({ ...newObj });
      setLoading((p) => !p);
    }
  };
  return (
    <>
      {" "}
      <Navbar />
      <div className="app">
        <div className="content">
          <div className="conservation">
            {count === 0 ? (
              <h1
                style={{
                  textAlign: "center",
                  margin: 0,
                  padding: "10px",
                  color: "rgb(135, 138, 137)",
                }}
              >
                How can I help you today?
              </h1>
            ) : (
              ""
            )}

            {count > 0 ? (
              <div>
                <p
                  style={{
                    color: "rgb(69, 69, 22)",
                    marginTop: "10px",

                    marginBottom: "10px",

                    paddingLeft: "20px",
                  }}
                >
                  {"👤 " + data.user}
                </p>
                {loading ? (
                  <div className="loading">
                    <p>{"🧑‍⚕️"}</p>
                    <div className="loader"></div>
                  </div>
                ) : (
                  <p
                    style={{
                      color: "rgb(69, 69, 22)",
                      margin: 0,
                      paddingLeft: "20px",
                    }}
                  >
                    {"🧑‍⚕️ " + data.response}
                  </p>
                )}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="prompt">
            {loading === true ? (
              <input
                type="text"
                value={
                  waitingMessages[
                    Math.floor(Math.random() * waitingMessages.length)
                  ]
                }
                readonly
              ></input>
            ) : (
              <input
                type="text"
                placeholder="Message Health-GPT"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
            )}
            {loading === false ? (
              <button onClick={handlePrompt}>⬇️</button>
            ) : (
              <button onClick={handlePrompt} disabled>
                🚫
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;