import React from 'react';
import { Habit } from './IndividualHabit';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export const HabitContainer = (props) => {
  return (
    <div>
    {props.habits.map(habit =>
      <MuiThemeProvider>
        <Habit onClick={props.onClick} habit={habit} />
      </MuiThemeProvider>
    )}
    </div>
  );
}