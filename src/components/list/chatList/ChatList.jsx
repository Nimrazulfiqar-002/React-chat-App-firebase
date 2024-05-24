import React, { useEffect, useState } from 'react';
import './chatList.css';
import AddGroup from './addGroup/AddGroup';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { useUserStore} from '../../../lib/userStore';

const ChatList = () => {
  const [addMode,setaddMode]=useState(false);
  const[Chats, setChats]=useState([]);
  const {currentUser}=useUserStore();


 useEffect(()=>{
  const unSub = onSnapshot(doc(db, "userschat", currentUser.id), (doc) => {
    setChats(doc.data());
   });
   return()=>{
    unSub
   }
 },[currentUser.id]);
console.log(Chats);
  return (
    <div className='chatList'>
      {/* search chats */}
        <div className="search">
            <div className="searchBar">
                <img src="/src/assets/search.png" alt="" />
                <input type="text" placeholder='Search' />
            </div>
            <img src={addMode ? "/src/assets/minus.png" : "/src/assets/plus.png"} alt="" className='add'
            onClick={()=>setaddMode((prev)=>!prev)}/>
        </div>
        {/* item chat list */}
        <div className="chatItem">
        <div className="item">
          <img src="/src/assets/avatar.png" alt="" />
          <div className="texts">
            <span>Community group</span>
            <p>hello</p>
          </div>
        </div>
        <div className="item">
          <img src="/src/assets/avatar.png" alt="" />
          <div className="texts">
            <span>Business group</span>
            <p>hello</p>
          </div>
        </div>
        <div className="item">
          <img src="/src/assets/avatar.png" alt="" />
          <div className="texts">
            <span>Class group</span>
            <p>hello</p>
          </div>
        </div>
        <div className="item">
          <img src="/src/assets/avatar.png" alt="" />
          <div className="texts">
            <span>Meeting room</span>
            <p>hello</p>
          </div>
        </div>
        {/*  */}
        {/* <div className="item">
          <img src="/src/assets/avatar.png" alt="" />
          <div className="texts">
            <span>Meeting room</span>
            <p>hello</p>
          </div>
        </div>
        <div className="item">
          <img src="/src/assets/avatar.png" alt="" />
          <div className="texts">
            <span>Meeting room</span>
            <p>hello</p>
          </div>
        </div> */}
       { addMode && <AddGroup/>}

        </div>
     
    </div>
  )
}

export default ChatList