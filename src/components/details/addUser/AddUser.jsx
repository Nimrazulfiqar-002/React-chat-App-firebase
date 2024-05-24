

import React, { useState } from 'react';
import './addUser.css';
import { db } from '../../../lib/firebase';
import { collection, getDocs, query, where, doc, setDoc } from "firebase/firestore";
import { useUserStore } from '../../../lib/userStore';


const AddUser = ({ onAddUserClick }) => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const {curreentUser} =useUserStore();

  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");

    try {
      const userRef = collection(db, "users");
      // Create a query against the collection.
      const q = query(userRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        setUser(userDoc.data());
        setUserId(userDoc.id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddUser = async () => {
   
    try {
      if (user && userId) {
        const membersRef = doc(db, "members", userId);
        await setDoc(membersRef, user);
        onAddUserClick({ ...user, id: userId  ,receiverdId:curreentUser.id });
        setUser(null); // Reset the user state after adding
        setUserId(null); // Reset the userId state after adding
        console.log(userId);
      }
      
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='addUser'>
      <form onSubmit={handleSearch}>
        <input type="text" name="username" placeholder='UserName' />
        <button>Search</button>
      </form>
      {user && (
        <div className="user">
          <div className="detail">
            <img src={user.avatar || "/src/assets/avatar.png"} alt="" />
            <span>{user.username}</span>
          </div>
          <button onClick={handleAddUser}>Add User</button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
