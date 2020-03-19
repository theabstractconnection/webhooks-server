import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";

import "./App.css";

function App() {
  const socket = useRef(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const initWS = /*async*/ () => {
      if (socket.current) {
        return;
      }
      const socketProtocol =
        window.location.protocol === "https:" ? "wss:" : "ws:";
      const hostname = window.location.hostname;
      const socketUrl = `${socketProtocol}//${hostname}/socket`;
      console.log(socketUrl);
      let ws = new WebSocket(socketUrl);
      socket.current = ws;
      // const { data } = await axios.get(
      //   "https://www.cloudflare.com/cdn-cgi/trace"
      // );
      // const ip = data.split("ip=")[1].split("ts=")[0];
      // console.log(ip);
      ws.onopen = () => {
        console.log("open");
        ws.send(`NEW client conexion`);
      };

      ws.onmessage = function receiveMsg(msg) {
        console.log("Message from server:", msg);
        setEvents(event => event.concat(msg));
      };
    };
    initWS();
  }, []);

  return (
    <div className="App">
      <div id="eventlist">
        {events.map((value, index) => {
          return <li key={index}>{value}</li>;
        })}
      </div>
    </div>
  );
}

export default App;
