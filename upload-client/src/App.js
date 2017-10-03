import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Uploader from './Uploader';
import View from './View';

class App extends Component {
  render() {
    return (
      <Switch >
        <Route exact path='/' component={Uploader} />
        <Route path='/view' component={View} />
      </Switch>
    )
  }
}

export default App;
