import React from 'react';
import './userInfo.css';
import { useUserStore } from '../../../lib/userStore';

const Userinfo = () => {
  const { currentUser } = useUserStore();
  return (
    <div className='userInfo'>
        <div className="user">
            <img src={currentUser.avatar || "/src/assets/avatar.png"} alt="" />
            <h3>{ currentUser.username }</h3>
        </div>
        <div className="icons">
            <img src="/src/assets/more.png" alt="" />
            {/* <img src="/src/assets/video.png" alt="" /> */}
            <img src="/src/assets/edit.png" alt="" />
        </div>
    </div>
  )
}

export default Userinfo