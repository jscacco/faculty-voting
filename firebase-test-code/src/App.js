import React from 'react';
import './App.css';

import firebase from './firebase'

import TimesList from './components/times-list'
import AddTimeEntryForm from './components/add-time-entry-form'

function App() {
  return (
    <div className="App">
      <h1> Test Sending/Recieving </h1>
      <TimesList></TimesList>
      <AddTimeEntryForm></AddTimeEntryForm>
    </div>
  );
}

export default App;
