
import React, { useState, useEffect } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import "./details.css";
import AddUser from './addUser/AddUser';
import { auth, db } from '../../lib/firebase';
import { arrayUnion, collection, getDocs} from "firebase/firestore";


const Details = () => {
  const [isPeopleOpen, setIsPeopleOpen] = useState(true);
  const [isPhotosOpen, setIsPhotosOpen] = useState(true);
  const [showAddUser, setShowAddUser] = useState(false);
  const [members, setMembers] = useState([]);
 

  const togglePeople = () => setIsPeopleOpen(!isPeopleOpen);
  const togglePhotos = () => setIsPhotosOpen(!isPhotosOpen);
  const toggleAddUser = () => setShowAddUser(!showAddUser);

  const handleAddUserClick = (newUser) => {
    setMembers([...members, newUser]);
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const membersRef = collection(db, "members");
        const querySnapshot = await getDocs(membersRef);
        const membersList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMembers(membersList);

      
      } catch (err) {
        console.error("Error fetching members: ", err);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div className='details'>
      {/* Top */}
      <div className="title">Community</div>
      {/* Center */}
      <div className="center">
        <div className="people">
          <div className="section">
            <div className="section-header" onClick={togglePeople}>
              <h2>Members</h2>
              {isPeopleOpen ? <FaAngleUp /> : <FaAngleDown />}
            </div>
            {isPeopleOpen && (
              <div className="section-content">
                {members.map((member) => (
                  <div className="person" key={member.id}>
                    <img src={member.avatar || "/src/assets/avatar.png"} alt={member.username} />
                    <span>{member.username}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="section">
            <div className="section-header" onClick={toggleAddUser}>
              <h2>Add Member</h2>
            </div>
            {showAddUser && <AddUser onAddUserClick={handleAddUserClick} />}
          </div>
        </div>
      </div>
      {/* Bottom */}
      <div className="logOut">
        <button className='logOutbtn' onClick={() => auth.signOut()}>Log Out</button>
      </div>
    </div>
  );
};

export default Details;

