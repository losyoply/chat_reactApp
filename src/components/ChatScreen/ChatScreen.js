import React,{useState, useEffect, useRef} from "react";
import {auth, firestore, ServerTimestamp, Storage} from "../../firebase"
import "./ChatScreen.css"
import {useLocation} from "react-router-dom";
import {IoIosSend} from 'react-icons/io';

const ChatScreen=()=>{
    const location=useLocation();
    const userId=location.pathname.split('/')[1];
    const [messages, setMessages]=useState([]);
    const messageRef= useRef(null);

    useEffect(()=>{
        let unsubscribe;
        if(auth.currentUser)
        {
            const userRef=firestore.collection("users").doc(auth.currentUser.uid).collection("chats").doc(userId).collection("messages").orderBy("createdAt","asc");;
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
    const [friendpic, setFriendpic]=useState("");
    const location=useLocation();
    const userId=location.pathname.split('/')[1];
    const friendref=firestore.collection("users").doc(userId);
    friendref.get().then((data)=>{
        setFriendpic(data.data().photoURL);
    })
    const {id, message, received, createdAt,photoURL}=messageItem;
    const time = typeof createdAt==="number"? new Date(createdAt):createdAt.toDate();

    return(
        <>
    <div className={received===false?"MIContainer S":"MIContainer R"}>
        {received===false?<></>:<img alt="Pic" src={friendpic?friendpic:require('./unnamed.jpg')} className="FriendPic"/>}
        <div key={id} className={received===false?"MessageSent":"MessageReceived"}>    
                <div className="Message">{message?message:<img className="imageSented" alt="iamge sented" src={photoURL} ></img>}</div>
                <div className="MessageTime">{time.toLocaleTimeString()}</div>
               
        </div>
    </div>
        </>
    )
}
const MessageInput=()=>{
    const [message,setMessage] =useState('');
    const location = useLocation();
    const userId = location.pathname.split("/")[1];
    const sendMessage =async(e)=>{
        e.preventDefault();
        try{
            const sender=firestore.collection("users").doc(auth.currentUser.uid).collection("chats").doc(userId).collection("messages");
            const receiver= firestore.collection("users").doc(userId).collection("chats").doc(auth.currentUser.uid).collection("messages");

            await sender.add({
                message,
                received:false, 
                createdAt:ServerTimestamp(),
            });

            await receiver.add({
                message,
                received:true, 
                createdAt:ServerTimestamp(),
            });
            setMessage("");
        }
        catch(e){
            console.log(e.message);
        }
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
                const imgsender=firestore.collection("users").doc(auth.currentUser.uid).collection("chats").doc(userId).collection("messages");
                const imgreceiver= firestore.collection("users").doc(userId).collection("chats").doc(auth.currentUser.uid).collection("messages");
                await imgsender.add({
                    message:"",
                    photoURL:url,
                    received:false, 
                    createdAt:ServerTimestamp(),
                });
    
                await imgreceiver.add({
                    message:"",
                    photoURL:url,
                    received:true, 
                    createdAt:ServerTimestamp(),
                });

            });
        });
   
}; 

    return(
        <div className="InputContainer">
            <input type='text' value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="聊天輸入框" className="MessageInput"/>
            <button disabled={message.length<1} className="SendButton" onClick={sendMessage}><IoIosSend size={30}/></button>
            <button className="imgBTN"><input type="file" id="img_btn" onChange={sendImg}/></button>
        </div>
    )
}

export default ChatScreen
