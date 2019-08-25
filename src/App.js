import React, { useState } from 'react';
// import useState from 'react';
import './App.css';
import LoginForm from './LoginForm';
// import Card from './Card';

function App() {
  const [users, setUsers] = useState([]);
  
  // const addUser = noob => {
  //   setUsers(noob)
  // }
  return (
    <div className="App">
      <LoginForm users = {users} setUsers = {setUsers} />
      
    </div>
  );
}

export default App;
