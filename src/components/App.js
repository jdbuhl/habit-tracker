import React from 'react';
import './App.css';
import axios from 'axios';

import { HabitContainer } from './Habits';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      habits: [],
    };
  }

  componentDidMount() {
    this.getHabits();
  }

  getHabits() {
    axios.get('http://localhost:3001/habits')
    .then(res => {
      this.setState({habits: res.data});
    });
  }

  render() {
    return (
      <div>
        <h1>Hello world!!!</h1>
        <HabitContainer habits={this.state.habits} />
      </div>
    )
  }
}

export default App;