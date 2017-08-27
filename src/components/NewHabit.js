import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class NewHabitDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: '',
      description: ''
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
    this.setState({open: false});
  };

  handleSubmit() {
    let habit = {
      name: "New habit here",
      description: "Description here",
      count: 0,
      status: 'In progress'
    }
    this.submit(habit);
  }

  handleChange(event) {
    let propertyName = event.target.name;
    console.log(propertyName, event.target.value);
    this.setState({
      propertyName: event.target.value});
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
        <RaisedButton label="Add New Habit" onClick={this.handleOpen} />
        <Dialog
          title="Add a New Habit"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <form>
            <label>
              Name:
              <input type="text" name="name" onChange={this.handleChange} value={this.state.name} />
            </label>
            <label>
              Description:
              <input type="text" name="description" onChange={this.handleChange} value={this.state.description} />
            </label>
          </form>
        </Dialog>
      </div>
    )
  }
}

export default NewHabitDialog;