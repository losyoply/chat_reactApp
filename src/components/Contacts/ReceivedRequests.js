import React,{useState,useEffect} from "react";
import "./Requests.css"
import {auth,firestore} from "../../firebase"

const ReceivedRequests=()=>{
    const [requests,setRequests] = useState([]);
    useEffect(()=>{
        let unsubscribe;
        if(auth.currentUser)
        {
            const userRef=firestore.collection("users").doc(auth.currentUser.uid).collection("receivedRequests");
            unsubscribe=userRef.onSnapshot(snapshot=>{
                let requests=[];
                snapshot.forEach(doc=>{
                    requests.push(doc.data());
                });
                setRequests(requests);
            });
            
            console.log(userRef);
        }
        return unsubscribe;
    },[])

    const acceptRequest=async (senderId,senderName,senderPhoto,event)=>{
        event.preventDefault();
        try
        {
            const currentUserRef=firestore.collection("users").doc(auth.currentUser.uid);
            await currentUserRef.collection("chats").doc(senderId).set({
                name:senderName,
                photoURL:senderPhoto,
                uid: senderId,
            });
            const senderRef=firestore.collection("users").doc(senderId);
            
            await senderRef.collection("chats").doc(auth.currentUser.uid).set({
                name:auth.currentUser.displayName,
                photoURL: auth.currentUser.photoURL,
                uid:auth.currentUser.uid,
            })
            await senderRef.collection("sentRequests").doc(auth.currentUser.uid).delete();
            await currentUserRef.collection("receivedRequests").doc(senderId).delete();
           
        }
        catch(e)
        {
            console.error(e.message);
        }
    };

    const declineRequest= async (uid,event)=>{
        event.preventDefault();
        try{
            await firestore.collection("users").doc(uid).collection("sentRequests").doc(auth.currentUser.uid).delete();
            await firestore.collection("users").doc(auth.currentUser.uid).collection("receivedRequests").doc(uid).delete();
            
        }
        catch(e)
        {
            console.error(e.message)
        }
    }

    return(
        <div className="MainContainer">
            {requests.length===0?<h2>沒有收到任何邀請</h2>:requests.map(request=>(
                <div className="ReceivedContainer fadeInUp animated" key={request.uid}>
                    <div className="InfoContainer">
                        <img alt="Profile" src={request.photoURL?request.photoURL:require('./unnamed.jpg')} className="CProfilePic"/>
                        <h2 className="RequestName">{request.name}</h2>
                    </div>
                    <div className="BtnsContainer">
                        <button onClick={(e)=>acceptRequest(request.uid,request.name,request.photoURL,e)} className="AcceptBtn">
                            接受
                        </button>
                        <button onClick={(e)=>declineRequest(request.uid,e)} className="DeclineBtn">
                            拒絕
                        </button>
                    </div>
                </div>

            ))}

        </div>
    )
}



export default ReceivedRequests