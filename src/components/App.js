import React, { Component } from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { MainPage, LoginPage, MyPage } from '../pages';
import history from '../history';

class App extends Component {
  render() {
    return (
      <Router history={history} >
        <Switch>
          <Route exact path='/' component={MainPage} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/page/:id' component={MyPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;