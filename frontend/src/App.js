import React, { useState, useEffect, useRef } from "react";

import Deploy from './components/Deploy';

import "./App.css";

function App() {
  const socket = useRef(null);
  const timer = useRef(null);
  let timeout = 2000;  

  const [deploys, setDeploys] = useState([
    // {
    //   deploy: {
    //     data:{},
    //     log:[],
    //     status: ""
    //   }
    // }
  ]);
  
  const buildSocketUrl = () => {
    const socketProtocol =
      window.location.protocol === "https:" ? "wss:" : "ws:";
    const hostname = window.location.hostname;
    const port = window.location.port;
    const socketUrl = `${socketProtocol}//${hostname}${port ? ':' + port : ''}/socket`

    console.log(socketUrl);
    return socketUrl;
  }

  const checkIsAlive = (ws, initWS) => {
    if (!ws || ws.readyState === WebSocket.CLOSED) initWS();
  };

  const keepAlive = (ws) => { 
    if (ws && ws.readyState === WebSocket.OPEN) {  
      ws.send('');  
    } 
    timer.current = setTimeout(keepAlive, timeout);  
  }  
  const cancelKeepAlive = () => {  
    if (timer.current) {  
      clearTimeout(timer.current);  
    }  
  }

  const onDeployMsg = (msg) => {
    msg = JSON.parse(msg)
    if (msg.event === 'deploy'){
      setDeploys(deploys => 
        deploys.concat({
          deploy: {
            data: msg.githubInfos,
            log:[],
            status: "pending"
          }
        })
      );
    } 
  };
  const onLogMsg = (msg) => {
    msg = JSON.parse(msg)
    if ( msg.event === "log" ) {
      setDeploys(deploys => 
        deploys.map((deploy) => 
          deploy.webhookDeliveryId === msg.webhookDeliveryId 
            ? { ...deploy, log: deploy.log.concat(msg.data) }
            : deploy
        )
      );
    }
  };

  useEffect(() => {
    const initWS = () => {
      if (socket.current) {
        return;
      }

      let ws = new WebSocket(buildSocketUrl());
      let connectInterval;

      socket.current = ws;

      ws.onopen = () => {
        ws.send(`NEW client conexion`)
        timeout = 2000;
        clearTimeout(connectInterval);
        keepAlive(ws);
      };

      ws.onclose = (e) => {
        console.log(
          `Socket is closed. Reconnect will be attempted in ${Math.min(
              10000 / 1000,
              (timeout + timeout) / 1000
          )} second.`,
          e.reason
        );
        timeout = timeout + timeout;
        connectInterval = setTimeout(checkIsAlive(ws, initWS), Math.min(10000, timeout));
        cancelKeepAlive();
        socket.current = null;
      };

      ws.onerror = (err) => {
        console.error(
            "Socket encountered error: ",
            err.message,
            "Closing socket"
        );
        ws.close();
      };

      ws.onmessage = (e) => {
        let msg = e.data;
        console.log(e.data);
        onDeployMsg(msg);
        onLogMsg(msg);
      };
    };
    initWS();

  }, []);

  return (
    <div className="App">
      <div id="Deploys">
        {deploys.map((deploy, index) => {
          return <Deploy key={index} deploy={deploy}/>
        })}
      </div>
    </div>
  );
}

export default App;
