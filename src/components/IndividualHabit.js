import React from 'react';
import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

export const Habit = (props) => {
  const clickHandler = () => {
    props.onClick(props.habit);
  }
  return (
    <Card>
      <CardHeader
      title={props.habit.name}
      subtitle={props.habit.description}
    />
    <CardText>
      {props.habit.count}
    </CardText>
    <CardActions>
      <FloatingActionButton  onClick={clickHandler}>
        <ContentAdd />
      </FloatingActionButton>
    </CardActions>
    </Card>
  );
}