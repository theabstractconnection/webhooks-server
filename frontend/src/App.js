import React, { useState, useEffect, useRef } from "react";

import WebHook from '@component/WebHook';

import "./App.css";

function App() {
  const socket = useRef(null);
  const timer = useReff(null);

  const [deploys, setDeploys] = useState([{
    deploy: {
      data:{},
      log:[],
      status: ""
    }
  }]);
  
  const buildSocketUrl = () => {
    const socketProtocol =
      window.location.protocol === "https:" ? "wss:" : "ws:";
    const hostname = window.location.hostname;
    const socketUrl = `${socketProtocol}//${hostname}/socket`
    console.log(socketUrl);
    return socketUrl;
  }

  const keepAlive = (ws) => { 
      const timeout = 20000;  
      if (ws.readyState == ws.OPEN) {  
          ws.send('');  
      }
      timer = setTimeout(keepAlive, timeout);  
  }  
  const cancelKeepAlive = () => {  
      if (timer) {  
          clearTimeout(timer);  
      }  
  }

  const onDeployMsg = (msg) => {
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
    if ( msg.event === "log" ) {
      setDeploys(deploys => 
        deploys.map((deploy) => {
          deploy.webhookDeliveryId === msg.webhookDeliveryId 
            ? { ...deploy, log: deploy.log.concat(msg.data) }
            : deploy
        })
      );
    }
  };

  useEffect(() => {
    const initWS = () => {
      if (socket.current) {
        return;
      }

      let ws = new WebSocket(buildSocketUrl());
      socket.current = ws;

      ws.onopen = () => {
        keepAlive(ws);
      };

      ws.onclose = () => {
        cancelKeepAlive();
      };

      ws.onmessage = (e) => {
        let msg = e.data;
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
