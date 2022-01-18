import React from 'react';
import logo from './logo.svg';
import { Account } from './features/account/Account';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Account />
      </header>
    </div>
  );
}

export default App;
