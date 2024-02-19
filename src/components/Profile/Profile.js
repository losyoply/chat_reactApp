import React,{useState} from "react";
import "./Profile.css"
import {auth, firestore} from "../../firebase"
import {IoIosCopy} from 'react-icons/io'

const Profile=()=>{
    const copyCode=()=>{
        navigator.clipboard.writeText(auth.currentUser.uid);
        alert("Code copied");
    }
    const [naame,setNaame] = useState('');
    firestore.collection("users").doc(auth.currentUser.uid).get().then(doc=>{setNaame(doc.data().name);});
    return(
        <div className="ProfileContainer">
            <h2 style={{margin:0,fontWeight:"bold"}}>Profile</h2>
            <img src={auth.currentUser.photoURL?auth.currentUser.photoURL:require('./unnamed.jpg')} alt="ProfilePic" className="ProfilePic zoomInDown animated"/>
            <h3 className="Name">{auth.currentUser.displayName?auth.currentUser.displayName:naame}</h3>
            <button className="BlueBtn slideInLeft animated" onClick={copyCode}>Copy Code<IoIosCopy size={30}/></button>
        </div>
    )
}

export default Profile
