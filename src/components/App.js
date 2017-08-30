import React from 'react';
import './App.css';
import axios from 'axios';

import { HabitContainer } from './Habits';
import NewHabitDialog from './NewHabit';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import moment from 'moment';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      habits: [],
      selectedHabit: ''
    };
    this.increaseHabitCount = this.increaseHabitCount.bind(this);
    this.addNewHabit = this.addNewHabit.bind(this);
    this.removeHabit = this.removeHabit.bind(this);
    this.getHabits = this.getHabits.bind(this);
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
    let now = moment(new Date());
    let last = moment(habit.lastCompletedOn);
    if(last) {
      let diff = now.diff(last, 'days');
      if(diff > 1){
        habit.count = 1;
      } else {
        habit.count++;
      }
    } else {
      habit.count = 1;
    }
    
    habit.lastCompletedOn = new Date();
    if(habit.status === 'In progress') {
      if(habit.count >= 21) {
        habit.status = 'Completed';
      }
    }
    axios.put('http://localhost:3001/updateHabit',habit).then( () => {
      this.getHabits();
    });
  }

  addNewHabit(habit) {
    var ctx = this;
    axios.post('/habit', habit)
    .then(function (response) {
      console.log(response);
      ctx.getHabits();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  removeHabit(habit) {
    var ctx = this;
    axios.post('/remove', habit)
    .then(function (response) {
      ctx.getHabits();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <NewHabitDialog onSubmit={this.addNewHabit} />
        </MuiThemeProvider>
        <HabitContainer onRemove={this.removeHabit} onClick={this.increaseHabitCount} habits={this.state.habits} />
      </div>
    )
  }
}

export default App;