import React, { useRef, useEffect, useState } from 'react';
import "./chat.css";
import EmojiPicker from 'emoji-picker-react';
import ShowJoin from './showjoining/ShowJoin';

const Chat = ({ showJoin }) => {
const [open,setOpen]=useState(false);  
const [text,setText]=useState("");

// for refresh 
const endRef=useRef(null);
useEffect(()=>{
  endRef.current?.scrollIntoView({behaviour:"smooth"})
},[]);

const handleEmoji= e=>{
  setText((prev)=>prev + e.emoji);
  setOpen(false)
};
console.log(text);
  return (
    <div className='chat'>
      <div className="top">
        <div className="user">
          <img src="/src/assets/avatar.png" alt="" />
          <div className="texts">
            <span>Community group </span>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <div className="icons">
          <img src="/src/assets/phone.png" alt="" />
          <img src="/src/assets/video.png" alt="" />
          <img src="/src/assets/info.png" alt="" />
        </div>
      </div>
      {/* center */}
      <div className="center">
        <div className="message">
          <img src="/src/assets/avatar.png" alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione reprehenderit veritatis doloribus deleniti minus ipsam excepturi est?</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="messageUser2">
          <img src="/src/assets/avatar.png" alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione reprehenderit veritatis doloribus deleniti minus ipsam excepturi est?</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <img src="/src/assets/chatImage.jpg" alt="" />
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione reprehenderit veritatis doloribus deleniti minus ipsam excepturi est?</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="/src/assets/avatar.png" alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione reprehenderit veritatis doloribus deleniti minus ipsam excepturi est?</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="messageUser2">
          <img src="/src/assets/avatar.png" alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione reprehenderit veritatis doloribus deleniti minus ipsam excepturi est?</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione reprehenderit veritatis doloribus deleniti minus ipsam excepturi est?</p>
            <span>1 min ago</span>
          </div>
        </div>
        
        <div className="message">
          <img src="/src/assets/avatar.png" alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione reprehenderit veritatis doloribus deleniti minus ipsam excepturi est?</p>
            <span>1 min ago</span>
          </div>
        </div>
        {showJoin && <ShowJoin />}
        {/*  */}
        <div ref={endRef}></div>
      </div>
      {/* bottom */}
      <div className="bottom">
        <div className="icons">
        <img src="/src/assets/img.png" alt="" />
        <img src="/src/assets/camera.png" alt="" />
        <img src="/src/assets/mic.png" alt="" />
        </div>
        <input type="text" placeholder='Type a message....'
        value={text}
        onChange={e=>setText(e.target.value)} />
        <div className="emoji">
          <img src="/src/assets/emoji.png" alt="" onClick={()=>setOpen((prev)=>!prev)}/>
          <div className="picker">
          <EmojiPicker open={open} onEmojiClick={handleEmoji}/>

          </div>
          <button className='sendButton'>Send</button>
        </div>
      </div>
      
    </div>
  )
}

export default Chat