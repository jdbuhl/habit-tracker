import React from 'react';
import './App.css';
import axios from 'axios';

import { HabitContainer } from './Habits';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      habits: []
    };
    this.increaseHabitCount = this.increaseHabitCount.bind(this);
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

  increaseHabitCount(habit) {
    console.log(habit);
    habit.count++;
    if(habit.status === 'In progress') {
      if(habit.count >= 21) {
        habit.status = 'Completed';
      }
    }
    axios.put('http://localhost:3001/updateHabit',habit);
  }

  render() {
    return (
      <div>
        <h1>Hello world!!!</h1>
        <HabitContainer onClick={this.increaseHabitCount} habits={this.state.habits} />
      </div>
    )
  }
}

export default App;