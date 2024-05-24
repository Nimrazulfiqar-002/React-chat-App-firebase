
// import React, { useState } from 'react';
// import './login.css';
// import { toast } from 'react-toastify';
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
// import { doc, setDoc } from 'firebase/firestore';
// import { auth, db } from '../../lib/firebase';
// import upload from '../../lib/upload';
// const Login = () => {
//   const [avatar, setAvatar] = useState({
//     file: null,
//     url: ""
//   });

//   const [loading,setLoading]=useState(false)
//   const [view, setView] = useState('login'); // 'login' or 'signup'

//   const handleAvatar = e => {
//     if (e.target.files[0]) {
//       setAvatar({
//         file: e.target.files[0],
//         url: URL.createObjectURL(e.target.files[0])
//       });
//     }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const formData = new FormData(e.target);
//     const {email,password}=Object.fromEntries(formData);
    
//     try{
//       await signInWithEmailAndPassword(auth,email,password);
//       toast.success(" Login now!")
//     }catch(err){
//       console.log(err);
//       toast(err.message);
//     }finally{
//       setLoading(false);
//     }
//   };
//   const handleRegister =async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const formData = new FormData(e.target);
//     const {username,email,password}=Object.fromEntries(formData);
//     try{
//       const res=await createUserWithEmailAndPassword(auth,email,password);
//       const imgURL=await upload(avatar.file)

//       await setDoc(doc(db, "users", res.user.uid), {
//         username,
//         email,
        
//         avatar:imgURL,
//         id:res.user.uid,
//         blocked :[],
//       });

//       await setDoc(doc(db, "userschats", res.user.uid), {
//         chats :[],
//       });

//       toast.success("Account created! You can Login now!")

//     }catch(err){
//       console.log(err);
//       toast(err.message);
//     }finally{
//       setLoading(false);
//     }
    
//   };

//   return (
//     <div className='login'>
//       {view === 'login' ? (
//         <>
//           <div className="itemL">
//             <h2>Welcome Back, <br /> Join the ChatRoom</h2>
//             <form onSubmit={handleLogin}>
//               <input type="text" placeholder='Email' name='email' />
//               <input type="password" placeholder='Password' name='password' />
//               <button disabled={loading}> {loading ? "loading" :"Sign In"}</button>
//               <div className='aSign'>
//                 <a href="#" onClick={() => setView('signup')}>Don't have an account? Sign Up</a>
//               </div>
//             </form>
//           </div>
//           <div className="loginEmpty">
//             <h1>Join The Perfect Chat Room,</h1>
//             <h2>And enjoy unlimited chatting with loved ones </h2>
//             <h4>Build Connections,Fun,Love and more with people</h4>
//           </div>
//         </>
//       ) : (
//         <>
//           <div className="itemS">
//             <h2>Create an Account</h2>
//             <form onSubmit={handleRegister}>
//               <label htmlFor="file">
//                 <img src={avatar.url || "/src/assets/avatar.png"} alt="" />
//                 Upload an image
//               </label>
//               <input type="file" id='file' style={{ display: 'none' }} onChange={handleAvatar} />
//               <input type="text" placeholder='Username' name='username' />
//               <input type="text" placeholder='Email' name='email' />
//               <input type="password" placeholder='Password' name='password' />
//               <button disabled={loading}>{loading ? "loading" :"Sign Up"}</button>
//               <div className="aLogin">
//                 <a href="#" onClick={() => setView('login')}>Already have an account? Login</a>
//               </div>
//             </form>
//           </div>
//           {/* <div className="signEmpty">hello</div> */}
//         </>
//       )}
//     </div>
//   )
// }

// export default Login;

import React, { useState } from 'react';
import './login.css';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import upload from '../../lib/upload';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';

const Login = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: ""
  });
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState('login'); // 'login' or 'signup'

  const handleAvatar = e => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success(" You  Login now!");
    } catch (err) {
      console.log(err);
      toast(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const imgURL = await upload(avatar.file);

      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        avatar: imgURL,
        id: res.user.uid,
        blocked: [],
      });
     

      await setDoc(doc(db, "userschats", res.user.uid), {
        chats: [],
      });

      toast.success("Account created! You can Login now!");
      setView('login'); // Switch to login view after successful registration
    } catch (err) {
      console.log(err);
      toast(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login'>
      {view === 'login' ? (
        <>
          <div className="itemL">
            <h2>Welcome Back, <br /> Join the ChatRoom</h2>
            <form onSubmit={handleLogin}>
              <input type="text" placeholder='Email' name='email' />
              <input type="password" placeholder='Password' name='password' />
              <button disabled={loading}>{loading ? "loading" : "Sign In"}</button>
              <div className='aSign'>
                <a href="#" onClick={() => setView('signup')}>Don't have an account? Sign Up</a>
              </div>
            </form>
          </div>
          <div className="loginEmpty">
            <h1>Join The Perfect Chat Room,</h1>
            <h2>And enjoy unlimited chatting with loved ones </h2>
            <h4>Build Connections, Fun, Love and more with people</h4>
          </div>
        </>
      ) : (
        <>
          <div className="itemS">
            <h2>Create an Account</h2>
            <form onSubmit={handleRegister}>
              <label htmlFor="file">
                <img src={avatar.url || "/src/assets/avatar.png"} alt="" />
                Upload an image
              </label>
              <input type="file" id='file' style={{ display: 'none' }} onChange={handleAvatar} />
              <input type="text" placeholder='Username' name='username' />
              <input type="text" placeholder='Email' name='email' />
              <input type="password" placeholder='Password' name='password' />
              <button disabled={loading}>{loading ? "loading" : "Sign Up"}</button>
              <div className="aLogin">
                <a href="#" onClick={() => setView('login')}>Already have an account? Login</a>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default Login;

