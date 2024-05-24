
import React, { useEffect } from 'react';
import Chat from "./components/chat/Chat";
import Details from "./components/details/Details";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
import { useUserStore } from './lib/userStore';

const App=()=> {
  const { currentUser, fetchUserInfo, isLoading } = useUserStore();
  
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      // if (user) {
      //   console.log("User signed in:", user); // Log user information
        fetchUserInfo(user?.uid);
      // } else {
      //   console.log("User signed out");
      //   fetchUserInfo(null);
      // }
      // console.log(user);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  // console.log("Current User:", currentUser);

  if (isLoading) return <div className='Loading'>Loading...</div>;

  return (
    <div className='container'>
      {currentUser ? (
        <>
          <List />
          <Chat />
          <Details />
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
}

export default App;

