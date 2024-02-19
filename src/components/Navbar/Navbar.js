
import React from "react";
import {Link} from 'react-router-dom';
import "./Style.css"
import {auth} from "../../firebase";
import {BiLogOut} from 'react-icons/bi'


const Navbar=()=>{

    const LogOut=(e)=>{
        e.preventDefault();
        auth.signOut().then(() => {
        // Sign-out successful.
        alert('logout success');
      }).catch((error) => {
        alert('logout failed');
      });
      }

    // function DesktopNotice(){
    //     chrome.notifications.create(
    //         "id",{
    //             type:'basic',
    //             title:' ',
    //             message:'message',
    //             iconUrl:''
    //         }
    //     );
    // }
    // setTimeout((e) => {
    //     chrome.notifications.clear("id");
    // }, 2000);
    // DesktopNotice();
    return(
        <ul className="NavbarContainer">
            <li>
                <Link className="Link" to="/">首頁</Link>
                <Link className="Link" to="/add">建立聊天室</Link> 
                {/* ?? */}
                <Link className="Link" to="/profile">個人檔案</Link>
                <Link className="Link" to="/square">廣場</Link>
                {auth.currentUser? <Link className="Link" to="/" onClick={(e)=>{LogOut(e)}}>
                                       
                                            登出<BiLogOut className="Bi" size={27}/>
                                    
                                    </Link>:<></>}
            </li>
        </ul>
    )


}

export default Navbar