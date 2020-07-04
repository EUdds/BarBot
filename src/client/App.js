/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import './App.css';
import { Switch, Route, NavLink, BrowserRouter } from 'react-router-dom';
import DebugMenu from './views/DebugMenu';
import HomeScreen from './views/HomeScreen';
import Header from './components/Header';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <div className="body">
            <Switch>
              <Route path="/debugMenu">
                <DebugMenu />
              </Route>
              <Route path="/">
                <HomeScreen />
              </Route>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    )
  };
}

export default App;
