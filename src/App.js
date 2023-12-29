import logo from "./logo.svg";
import "./App.css";
import SideBar from "./SideBar";
import Chat from "./Chat";
import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import axios from "./axios";

function App() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    axios.get("/messages/syncs").then((response) => {
      setMessages(response.data);
    });
  }, []);
  useEffect(() => {
    var pusher = new Pusher("63511d52b71ee1d0b466", {
      cluster: "eu",
    });

    var channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);
  return (
    <div className="app">
      <div className="app__body">
        <SideBar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
