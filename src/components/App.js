import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Login } from './Login';
import Container from './Container';

export const App = (props) => {
  return (
  <main>
    <Switch>
      <Route path='/login' component={Login}/>
      <Route exact path='/' component={Container}/>
    </Switch>
  </main>
  )
}