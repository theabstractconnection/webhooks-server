import React, { useEffect, useState } from "react";
// import axios from "axios";

import "./App.css";

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const initWS = /*async*/ () => {
      const socketProtocol =
        window.location.protocol === "https:" ? "wss:" : "ws:";
      const hostname = window.location.hostname
      const socketUrl = `${socketProtocol}//${hostname}/socket`;
      console.log(socketUrl)
      const socket = new WebSocket(socketUrl);
      // const { data } = await axios.get(
      //   "https://www.cloudflare.com/cdn-cgi/trace"
      // );
      // const ip = data.split("ip=")[1].split("ts=")[0];
      // console.log(ip);
      socket.onopen = () => {
        console.log("open");
        socket.send(`NEW client conexion`);
      };

      socket.onmessage = e => {
        console.log("Message from server:", e.data);
        setEvents([...events, e.data]);
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
