import logo from "./logo.svg";
import "./App.css";
import SideBar from "./SideBar";
import Chat from "./Chat";
import { useEffect } from "react";
import Pusher from "pusher-js";

function App() {
  useEffect(() => {}, []);
  useEffect(() => {
    var pusher = new Pusher("63511d52b71ee1d0b466", {
      cluster: "eu",
    });

    var channel = pusher.subscribe("messages");
    channel.bind("inserted", (data) => {
      alert(JSON.stringify(data));
    });
  }, []);
  return (
    <div className="app">
      <div className="app__body">
        <SideBar />
        <Chat />
      </div>
    </div>
  );
}

export default App;
