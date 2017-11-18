import React from 'react';
import './App.css';
import axios from 'axios';

import { Habits } from './Habits';
import NewHabitDialog from './NewHabit';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import moment from 'moment';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      habits: [],
      selectedHabit: {},
      errorText: ''
    };
    this.increaseHabitCount = this.increaseHabitCount.bind(this);
    this.addNewHabit = this.addNewHabit.bind(this);
    this.removeHabit = this.removeHabit.bind(this);
    this.getHabits = this.getHabits.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onChange = this.onChange.bind(this);
    this.updateGoal = this.updateGoal.bind(this);
  }

  componentDidMount() {
    this.getHabits();
  }

  handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({
      open: false
    });
  };

  getHabits() {
    axios.get('api/habits')
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
        alert('Oh no! You need to complete habits consecutively! Your count will start back at 1.')
        habit.count = 1;
      } else {
        habit.count++;
      }
    } else {
      habit.count = 1;
    }
    
    habit.lastCompletedOn = new Date();
  
      if(habit.count >= habit.goal) {
        this.setState({
          open: true,
          selectedHabit:  habit
        });
        habit.status = 'Completed';
      }

    axios.put('api/updateHabit',habit).then( () => {
      this.getHabits();
    });
  }

  addNewHabit(habit) {
    var ctx = this;
    console.log(habit);
    axios.post('api/habit', habit)
    .then(function (response) {
      console.log(response);
      ctx.getHabits();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  removeHabit(habit) {
    let habitToRemove = habit || this.state.selectedHabit;
    let ctx = this;
    axios.post('api/remove', habitToRemove)
    .then(function (response) {
      ctx.getHabits();
      if(ctx.state.open === true){
        ctx.setState({
          open:false
        })
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  updateGoal() {
    if(this.state.selectedHabit.goal <= this.state.selectedHabit.count) {
      let error = 'New goal must be greater than '+this.state.selectedHabit.count;
      let errorState = {}
      errorState.errorText = error;
      this.setState(errorState);
      // alert('New goal must be greater than '+this.state.selectedHabit.count);
    } else {
      axios.put('api/updateHabit',this.state.selectedHabit).then( () => {
        this.handleClose();
        this.getHabits();
      });
    }
  }

  onChange(e) {
    let newHabit = this.state.selectedHabit;
    newHabit.goal = e.target.value;
    this.setState({
      selectedHabit: newHabit
    });
  }

  render() {
    const actions = [
      <FlatButton
      label="Remove Habit"
      primary={true}
      onClick={() => this.removeHabit(this.state.selectedHabit)}
      />,
      <FlatButton
        label="Reset Goal"
        primary={true}
        onClick={this.updateGoal}
      />,
    ];
    return (
      <div>
        <MuiThemeProvider>
          <AppBar
            title="Habit Tracker"
            iconElementRight={<MuiThemeProvider>
          <NewHabitDialog onSubmit={this.addNewHabit} />
        </MuiThemeProvider>}
           />
        </MuiThemeProvider>
        <MuiThemeProvider>
        <Dialog
          title="Congratulations! You've met your goal!"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
        <h3>{this.state.selectedHabit.name}</h3>
        <TextField
            floatingLabelText="New Goal"
            hintText="Set a new goal for yourself!"
            name="goal"
            onChange={this.onChange}
            value={this.state.selectedHabit.goal}
            fullWidth={true}
            errorText={this.state.errorText}
            />
        </Dialog>
        </MuiThemeProvider>
        <Habits onRemove={this.removeHabit} onClick={this.increaseHabitCount} habits={this.state.habits} />
      </div>
    )
  }
}

export default Container;