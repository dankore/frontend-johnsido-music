import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// AXIOS COMMENT URL
console.log(process.env.BACKENDURL);
Axios.defaults.baseURL = process.env.BACKENDURL;
// STATE MANAGEMENT
import StateContext from './contextsProviders/StateContext';
import DispatchContext from './contextsProviders/DispatchContext';
//COMPONENTS
import Homepage from './pages/Homepage';
import ProfilePage from './pages/profile/ProfilePage';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Header from './components/shared/Header';
import { useImmerReducer } from 'use-immer';
import LandingPage from './pages/LandingPage';
import Axios from 'axios';

function Main() {
  const initialState = {
    url: '',
    logo: {
      url:
        'https://res.cloudinary.com/my-nigerian-projects/image/upload/f_auto,q_auto/v1596961997/Others/john/logo.png',
      alt: 'John Sido Photo',
    },
    flashMsgErrors: {
      value: [],
      isDisplay: false,
    },
  };
  function appReducer(draft, action) {
    switch (action.type) {
      case 'updateUrl':
        draft.url = action.value;
        return;
      case 'flashMsgError':
        draft.flashMsgErrors.value = action.value;
        draft.flashMsgErrors.isDisplay = true;
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(appReducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          {/* SHOW HEADER TO CERTAIN PAGES https://codelikethis.com/lessons/react/routing-in-react-going-further*/}
          <Route path="(/profile)">
            <Header />
          </Route>
          <Switch>
            <Route path="/home">
              <Homepage />
            </Route>
            <Route exact path="/">
              <LandingPage />
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
            <Route>
              <div>Not found</div>
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
