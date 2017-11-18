import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

class NewHabitDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: '',
      description: '',
      goal: '',
      nameError: '',
      descriptionError: '',
      goalError: ''
    };
    this.submit = props.onSubmit;
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({
      open: false,
      name: '',
      description: '',
      goal: ''
    });
  };

  handleSubmit(event) {
    event.preventDefault();
    if(this.state.name === '') {
      this.setState({
        nameError: "This field is required!"
      });
    } else if(this.state.description === '') {
      this.setState({
        descriptionError: "This field is required!"
      });
    } else if(this.state.goal === '') {
      this.setState({
        goalError: "This field is required!"
      });
    } else if(isNaN(this.state.goal)) {
      this.setState({
        goalError: "Your goal must be a number."
      });
    } else if(this.state.goal <= 0) {
      this.setState({
        goalError: "Your goal must be greater than 0."
      });
    } else {
      let newHabit = {
        name: this.state.name,
        description: this.state.description,
        goal: this.state.goal,
        count: 0,
        status: 'In progress',
        createdAt: new Date()
      };
      this.submit(newHabit);
      this.handleClose();
    }

  }

  handleChange(event) {
    let errorText = event.target.name+'Error';
    let errorState = {};
    let newState = {};
    if (event.target.value) {
      errorState[errorText] = '';
      this.setState(errorState);
    } else {
      errorState[errorText] = 'This field is required!'
      this.setState(errorState)
    }
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

  render(){
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.handleSubmit}
      />,
    ];

    return (
      <div>
        <IconButton tooltip="Add a new habit" onClick={this.handleOpen}><ContentAdd /></IconButton>

        <Dialog
          title="Add a New Habit"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <form>
            <TextField
            floatingLabelText="Name"
            hintText="Give your habit a name"
            name="name"
            onChange={this.handleChange}
            value={this.state.name}
            fullWidth={true}
            errorText={this.state.nameError}
            /><br />
            <br />
            <TextField
            floatingLabelText="Desription"
            hintText="Write a brief description of the habit you want to instill"
            name="description"
            onChange={this.handleChange}
            value={this.state.description}
            fullWidth={true}
            errorText={this.state.descriptionError}
            /><br />
            <br />
            <TextField
            floatingLabelText="Goal"
            hintText="Set a goal for yourself!"
            name="goal"
            onChange={this.handleChange}
            value={this.state.goal}
            fullWidth={true}
            errorText={this.state.goalError}
            />
            {/* <label>
              Name:
              <input type="text" name="name" onChange={this.handleChange} value={this.state.name} />
            </label> */}
            {/* <label>
              Description:
              <input type="text" name="description" onChange={this.handleChange} value={this.state.description} />
            </label> */}
            {/* <label>
              Goal:
              <input type="number" name="goal" onChange={this.handleChange} value={this.state.goal} />
            </label> */}
          </form>
        </Dialog>
      </div>
    )
  }
}

export default NewHabitDialog;