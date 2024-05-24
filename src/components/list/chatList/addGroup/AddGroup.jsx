import React from 'react';
import './addGroup.css';

const AddGroup = () => {
  return (
    <div className='addGroup'>
        <form action="">
            <input type="text" name="createGroup" placeholder='Create Group' />
            <button>Create</button>
        </form>
    </div>
  )
}

export default AddGroup