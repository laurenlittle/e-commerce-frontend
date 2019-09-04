import React from 'react';
// ability to grab route params, routes in Switch Component, browser router makes props available
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from '../src/user/Signup';
import Signin from '../src/user/Signin';
import Home from '../src/core/Home';

const Routes = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;