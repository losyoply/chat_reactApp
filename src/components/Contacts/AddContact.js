import React, {useState} from "react";
import {auth, firestore} from '../../firebase'
import "./AddContact.css"
const AddContact=()=>{
    const [code,setCode]=useState('');

    const [naame,setNaame] = useState('');
    firestore.collection("users").doc(auth.currentUser.uid).get().then(doc=>{setNaame(doc.data().name);});
    const sendRequest=async (event)=>{
        event.preventDefault();
        const splitCode=code.split(' ')[0];
        console.log(splitCode);
        if (splitCode[0] !== " ") //第一個字母非空格
        {
            if (splitCode !== "")  //非輸入空字串
            {
              if (splitCode !== auth.currentUser.uid) //不是搜尋自己的id
              {
                await firestore.collection("users").doc(auth.currentUser.uid).collection("sentRequests").doc(splitCode).get().then(async (doc) => {
                    if (!doc.exists) //非正在交友邀請
                    {
                      await firestore.collection("users").doc(auth.currentUser.uid).collection("chats").doc(splitCode).get().then(async (doc) => {
                          if (!doc.exists) //還沒建立聊天室(還不是朋友)
                          {
                            try 
                            {
                              const currentUserRef = firestore.collection("users").doc(auth.currentUser.uid).collection("sentRequests");
      
                              const docRef = firestore.collection("users").doc(splitCode);
                              //
                             
                              //
                              await docRef.get().then((doc) => {
                                if (doc.exists) 
                                {
                                  const data = 
                                  {
                                    uid: splitCode,
                                    name: doc.data().name,
                                    photoURL: doc.data().photoURL,
                                  };
                                  currentUserRef.doc(splitCode).set(data);
                                  docRef.collection("receivedRequests").doc(auth.currentUser.uid).set(
                                      {
                                        uid: auth.currentUser.uid,
                                        name: auth.currentUser.displayName?auth.currentUser.displayName:naame,
                                        photoURL: auth.currentUser.photoURL,
                                      });
                                  setCode("");
                                } 
                                else 
                                {
                                  alert("沒有此用戶");
                                }
                              });
                            } catch (e) {
                              console.error(e.message);
                            }
                          } else 
                          {
                            alert("已和此用戶成為好友");
                          }
                        });
                    } 
                    else 
                    {
                      alert("已給此人傳過交友邀請");
                    }
                  });
              } 
              else 
              {
                alert("請勿加入自己為好友");
              }
            } 
            else 
            {
              alert("請輸入正確的朋友id");
            }
        } 
        else 
        {
            alert("請輸入正確的朋友id");
        }
    }
    
    return(
        <div className='MainContainer'>
            <h2>搜尋好友ID</h2>
            <form className='Form'>
                <input type='text' className='CodeInput rotateIn animated' value={code} placeholder="輸入好友ID" onChange={
                (e)=>setCode(e.target.value)}/>  
                {/* try something of value */}
                <button className="AddBtn tada animated infinite" onClick={(e)=>sendRequest(e)}>送出邀請</button>
            </form>
        </div>
    )
}
export default AddContact