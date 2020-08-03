import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// STATE MANAGEMENT
import StateContext from './contextsProviders/StateContext';
import DispatchContext from './contextsProviders/DispatchContext';
//COMPONENTS
import Homepage from './pages/Homepage';
import ProfilePage from './pages/profile/ProfilePage';

function Main() {
  return (
    <StateContext.Provider>
      <DispatchContext.Provider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route path="/profile">
              <ProfilePage />
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
