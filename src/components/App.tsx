import React from 'react';
import logo from './logo.svg';
import './App.css';
import Tokify from './Tokify';

function App() {
  return (
    <div className="flex flex-column">
      <div className="flex flex-column overflow-auto">
        <Tokify></Tokify>
      </div>
    </div>
  );
}

export default App;
