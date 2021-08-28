import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./vendor/reset.css";
import "./vendor/global.css";
import reportWebVitals from "./reportWebVitals";
import LeaderboardProvider from "./services/Leaderboard";

ReactDOM.render(
  <React.StrictMode>
    <LeaderboardProvider>
      <App />
    </LeaderboardProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
