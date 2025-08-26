import React from 'react';
import { GrFormSubtract } from "react-icons/gr";


const ChatLogin = ({setUsername,setRoom,joinRoom,setChatOpen}) => {
  return (
    <div className="flex_c usermainchat_login_register_container_div">
      <GrFormSubtract className="usermainchat_navlogin_icon_container_div ChatLogin_sublogo"
      style={{color:'#ddd'}}
                onClick={() => setChatOpen(false)}
               />
    <div className="flex_c usermainchat_email_container_div">
      <div style={{color:'#ccc'}}>|</div>
      <input
        type="email"
        required
        placeholder="Email id"
        id="usermainchat_emailinput_container"
        name='email'
        onChange={(e)=>setUsername(e.target.value)}
      />
    </div>
    <div className="flex_c usermainchat_password_container_div">
    <div style={{color:'#ccc'}}>|</div>

      <input
        type="text"
        placeholder="Password"
        id="usermainchat_passwordinput_container"
        onChange={(e)=>setRoom(e.target.value)}
      />
    </div>
    <div>
      <button
        id="usermainchat_button__container"
        type="submit"
        onClick={joinRoom}
      >
        Login
      </button>
    </div>
    <div>
      <a className="usermainchat_newuser_container_div">
        New user? Register Now
      </a>
    </div>
  </div>
  )
}

export default ChatLogin