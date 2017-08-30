import React from 'react';
import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {BarMetric} from 'react-simple-charts';

export const Habit = (props) => {
  let selectedDate = '';
  const clickHandler = () => {
    props.onClick(props.habit, selectedDate);
  }
  const removeHandler = () => {
    props.onRemove(props.habit);
  }
  const habitPercentage = (props.habit.count / props.habit.goal)*100;
  return (
    <Card>
      <CardHeader
      title={props.habit.name}
      subtitle={props.habit.description}>
        <FloatingActionButton onClick={removeHandler} />
      </CardHeader>
    <CardText>
      <BarMetric percent={habitPercentage} metricName="Consecutive Days"/>
      {props.habit.count}
      {props.habit.status}
      {props.habit.createdAt}
    </CardText>
    <CardActions>
      <FloatingActionButton  onClick={clickHandler}>
        <ContentAdd />
      </FloatingActionButton>
    </CardActions>
    </Card>
  );
}