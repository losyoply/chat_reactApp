import React,{useState, useEffect, useRef} from "react";
import {auth, firestore, ServerTimestamp} from "../../firebase"
import "./Square.css"
import {IoIosSend} from 'react-icons/io';
import { Storage } from "../../firebase";
const Square=()=>{
    
    const userId="square";
    const [messages, setMessages]=useState([]);
    const messageRef= useRef(null);

    useEffect(()=>{
        let unsubscribe;
        if(auth.currentUser)
        {
            const userRef=firestore.collection("square").orderBy("createdAt","asc");
            unsubscribe=userRef.onSnapshot(snapshot=>{
                let messages=[];
                snapshot.forEach(doc=>{
                    if(doc.data().createdAt)
                    {
                        messages.push({
                            id: doc.id, ...doc.data()
                        });
                    }
                })
                setMessages(messages);
            })
        }
        return ()=>unsubscribe();
    },[userId])
    
    useEffect(()=>{
        if(messageRef.current)
        {
            messageRef.current.scrollIntoView({behavior:"smooth", block:"end", inline:"nearest"});
        }
    },[messages])
    return(
        <div className="ChatScreenContainer">
            <div ref={messageRef} className="MessagesContainer">
                {messages.map(message=>(
                    <MessageItem messageItem={message} key={message.id}/>
                ))}
                <MessageInput/>
            </div>
        </div>
    )
}

const MessageItem=({messageItem})=>{
    // const [friendpic, setFriendpic]=useState("");
    

    const { message, createdAt,from,photoURL}=messageItem;
    const time = typeof createdAt==="number"? new Date(createdAt):createdAt.toDate();
    const [friendpic, setFriendpic]=useState("");

    const squareref=firestore.collection("users").doc(from);
    squareref.get().then((data)=>{
        setFriendpic(data.data().photoURL);
    })
    return(
        <>
    <div className={"SQcontainer"}>
        <img alt="Pic" src={friendpic?friendpic:require('./unnamed.jpg')} className="FriendPic"/>
        <div className={"squareMSG"}>    
                <div className="Message">{message?message:<img className="imageSented" alt="iamge sented" src={photoURL} ></img>}</div>
                <div className="MessageTime">{time.toLocaleTimeString()}</div>
                <div className="uid">{from}</div>
               
        </div>
    </div>
        </>
    )
}
const sendImg=()=>{
    var img_btn = document.getElementById('img_btn');
    
        const fileImage = img_btn.files[0];
        console.log(fileImage);
        var storageRef = Storage.ref();
        var imageRef = storageRef.child(fileImage.name+ServerTimestamp());
        imageRef.put(fileImage).then(() => {
            console.log('Uploaded a blob or file!');
            imageRef.getDownloadURL().then( async (url) => {
                console.log(url);
                
            const sq =firestore.collection("square");
           

            await sq.add({
                
                message:"", 
                createdAt:ServerTimestamp(),
                from: auth.currentUser.uid,
                photoURL:url,
            });


            });
        });
   
}; 
const MessageInput=()=>{
    const [message,setMessage] =useState('');

    const sendMessage =async(e)=>{
        e.preventDefault();
        try{
            const sq =firestore.collection("square");
           

            await sq.add({
                
                message, 
                createdAt:ServerTimestamp(),
                from: auth.currentUser.uid
            });

            setMessage("");
        }
        catch(e){
            console.log(e.message);
        }
    }
    return(
        <div className="InputContainer">
            <input type='text' value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="聊天輸入框" className="MessageInput"/>
            <button disabled={message.length<1} className="SendButton" onClick={sendMessage}><IoIosSend size={30}/></button>
            <button className="imgBTN"><input type="file" id="img_btn" onChange={sendImg}/></button>
        </div>
    )
}

export default Square
