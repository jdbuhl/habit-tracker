import React from 'react';
import { Habit } from './IndividualHabit';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export const Habits = (props) => {
  return (
    <div>
    {props.habits.map(habit =>
      <MuiThemeProvider>
        <Habit onRemove={props.onRemove} onClick={props.onClick} habit={habit} />
      </MuiThemeProvider>
    )}
    </div>
  );
}