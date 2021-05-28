import React from 'react';
import logo from './logo.svg';
import './App.css';
import Tokify from './Tokify';

function App() {
  return (
    <div className="flex flex-column">
      <h2>Welcome to Tokify</h2>
      <div>
        <Tokify></Tokify>
      </div>

    </div>
  );
}

export default App;
