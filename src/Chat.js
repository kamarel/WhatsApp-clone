import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons';
import React, { useState, useEffect } from 'react'
import "./Chat.css"
import MicIcon from '@material-ui/icons/Mic';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import {useParams} from "react-router-dom";
import db from "./Firebase"
import { useStateValue } from './StateProvider';
import firebase from "firebase";


const Chat = () => {

    const [seed, setSeed] = useState("");
    const [input, setInput] = useState("");
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();




   useEffect(()=>{
       if(roomId) {
           db.collection("rooms")
             .doc(roomId)
             .onSnapshot((snapshot)=> setRoomName
             (snapshot.data().name));

           db.collection("rooms")
             .doc(roomId)
             .collection("messages")
             .orderBy("timestamp", "asc")
             .onSnapshot((snapshot)=>
                setMessages(snapshot.docs.map((doc)=>
                doc.data()))
                );  
       }
   }, [roomId]);





    useEffect(()=>{
        setSeed(Math.floor(Math.random() * 5000));
    },[roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("You typed >>>", input);

        db.collection('rooms').doc(roomId).collection('messages').
        add({
            message:input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.
            serverTimestamp(),
        })

    

        setInput("");
    }

    

    return (
        <div className="chat">
            <div className="chat-header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat-headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen {""}
                        {new Date (
                            messages[messages.length -1 ]?.
                            timestamp?.toDate()
                        ).toUTCString()}
                    </p>
                </div>
                <div className="chat-headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>
            <div className = "chat-body">
                {messages.map((message)=>(

                        <p
                            className={`chat-message ${
                                message.name === user.displayName &&
                                 "chat-receiver" 

                            }`}


                        >

                      


                        <span className="chat-name">
                        {message.name}
                        </span>
                        {message.message}
                       
                        <span className="chat-timestamp">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                ))}
            </div>
            <div className = "chat-footer">
                <InsertEmoticonIcon/>
                <form>
                    <input type="text"
                    value={input} onChange={(e)=> setInput(e.target.value)} 
                    placeholder="Type a message"/>


                    <button onClick={sendMessage}
                    type="submit"
                    >Send a message</button>
                </form>
                <MicIcon/>
            </div>
        </div>
    )
}

export default Chat
