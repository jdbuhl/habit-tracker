import React from 'react';
import './App.css';

import { NewHabit } from './NewHabit';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello world!!!</h1>
        <NewHabit />
      </div>
    )
  }
}

export default App;