import React from 'react';
import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {BarMetric} from 'react-simple-charts';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import TextField from 'material-ui/TextField';

export const Habit = (props) => {
  let selectedDate = '';
  const clickHandler = () => {
    props.onClick(props.habit, selectedDate);
  }
  const removeHandler = () => {
    props.onRemove(props.habit);
  }
  const habitPercentage = (props.habit.count / props.habit.goal)*100;
  const cardStyle = {
    display: 'block',
    width: '70%',
    transitionDuration: '0.3s',
    margin: '40px'
  }
  return (
    <Card style={cardStyle}>
      <CardHeader
      title={props.habit.name}
      subtitle={props.habit.description}>
      <div style={{position: 'absolute', top: 5, right: 5, zIndex: 1000}}>
        <IconButton
        tooltip="Delete this habit"
        onClick={removeHandler}
        ><ActionDelete/></IconButton>
      </div>
      </CardHeader>
    <CardText>
      <BarMetric
      percent={habitPercentage}
      metricName="Consecutive Days"
      label=''
      />
      <TextField
      floatingLabelText="Current count"
      disabled={true}
      id="text-field-disabled"
      value={props.habit.count}
      />
      <TextField
      floatingLabelText="Created at"
      disabled={true}
      id="text-field-disabled"
      defaultValue={props.habit.createdAt}
      />
      <TextField
      floatingLabelText="Habit goal"
      disabled={true}
      id="text-field-disabled"
      value={props.habit.goal}
      />
      <TextField
      floatingLabelText="Last completed"
      disabled={true}
      id="text-field-disabled"
      value={props.habit.lastCompletedOn}
      />
    </CardText>
    <CardActions>
      <FloatingActionButton  onClick={clickHandler}>
        <ContentAdd />
      </FloatingActionButton>
    </CardActions>
    </Card>
  );
}