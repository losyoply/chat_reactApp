import React from 'react'
import "./Style.css"
import {auth,firestore,googleProvider} from '../../firebase'
const Enter=()=>{
    const googleAuthentication= async ()=>{
        try{
            await auth.signInWithPopup(googleProvider)
            await firestore.collection("users").doc(auth.currentUser.uid).set(
                {
                    name: auth.currentUser.displayName,
                    photoURL: auth.currentUser.photoURL,
                    uid: auth.currentUser.uid
                }
            )//didnt save email in database
        }catch(e){
            console.error(e.message);
            alert("An error occured")
        }
    }
    const Login=(e)=>{
        e.preventDefault();
        var txtEmail = document.getElementById('inputEmail');
        var txtPassword = document.getElementById('inputPassword');
        auth.signInWithEmailAndPassword(txtEmail.value, txtPassword.value)
        .then((userCredential) => {
            // Signed in
            txtEmail.value = "";
            txtPassword.value = "";
            // ...
        })
        .catch((error) => {
            alert(error.message);
            txtEmail.value = "";
            txtPassword.value = "";
            // ...
        });
    }

    const Signup= async (e)=>{
        e.preventDefault();
        var txtEmail = document.getElementById('inputEmail');
        var txtPassword = document.getElementById('inputPassword');
        auth.createUserWithEmailAndPassword(txtEmail.value, txtPassword.value).then((userCredential) => {
            try{
                firestore.collection("users").doc(auth.currentUser.uid).set(
                    {
                        name:txtEmail.value.split('@')[0],
                        photoURL: "",
                        uid: auth.currentUser.uid
                    }
                )//didnt save email in database
            }catch(e){
                console.error(e.message);
                alert("An error occured")
            }
            alert("註冊成功");
            txtEmail.value = "";
            txtPassword.value = "";
        })
        .catch((error) => {
            alert(error.message);
            txtEmail.value = "";
            txtPassword.value = "";
        });

        

    }
    return(
        <div className='EnterContainer'>
            
            <button className='AuthButton' onClick={googleAuthentication}>使用估狗註冊或登入</button>
          
            <div className='form-signin'>
                
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus/>
                <p></p>
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
                <p></p>
                <button className="btn btn-lg btn-primary " id="btnLogin" onClick={e=>{Login(e)}}>登入</button>
                <button className="btn btn-lg btn-primary " id="btnSignup" onClick={e=>{Signup(e)}}>註冊</button>
            </div>
            
    
        </div>
        
    )
}

export default Enter