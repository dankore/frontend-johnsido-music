import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// STATE MANAGEMENT
import StateContext from './contextsProviders/StateContext';
import DispatchContext from './contextsProviders/DispatchContext';
//COMPONENTS
import Homepage from './pages/Homepage';
import ProfilePage from './pages/profile/ProfilePage';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Header from './components/shared/Header';

function Main() {
  return (
    <StateContext.Provider>
      <DispatchContext.Provider>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route path="/profile">
              <ProfilePage />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

ReactDOM.render(<Main />, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}
