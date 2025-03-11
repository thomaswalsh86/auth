import React, { useState } from 'react';

import './App.css';

function App() {
  const [username, setUsername]= useState<string>('');
  const inputChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
    setUsername(event.target.value);
  };

  const handleLogin = ()=>{
    if(username.trim())
    {
      alert(`Welcome, ${username}!`);
    }
    else{
      alert('Enter a username')
    }
    
  }
  return (
    <div className="App">
      <header className="App-header">
        <p>Login</p>
        <div>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={inputChange}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      </header>
    </div>
  );
}

export default App;
