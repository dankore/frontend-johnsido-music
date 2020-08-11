import React, { useEffect } from 'react';
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
    loggedIn: Boolean(localStorage.getItem('johnsido-token')),
    user: {
      _id: localStorage.removeItem('johnsido-id'),
      token: localStorage.removeItem('johnsido-token'),
      username: localStorage.removeItem('johnsido-username'),
      firstName: localStorage.removeItem('johnsido-firstname'),
      lastName: localStorage.removeItem('johnsido-lastname'),
      avatar: localStorage.removeItem('johnsido-avatar'),
      verified: localStorage.removeItem('johnsido-verified'),
      userCreationDate: localStorage.removeItem('johnsido-userCreationDate'),
    },
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
      case 'login':
        draft.loggedIn = true;
        draft.user = action.value;
        return;
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

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem('johnsido-id', state.user._id);
      localStorage.setItem('johnsido-token', state.user.token);
      localStorage.setItem('johnsido-username', state.user.username);
      localStorage.setItem('johnsido-firstname', state.user.firstName);
      localStorage.setItem('johnsido-lastname', state.user.lastName);
      localStorage.setItem('johnsido-avatar', state.user.avatar);
      localStorage.setItem('johnsido-verified', state.user.verified);
      localStorage.setItem('johnsido-userCreationDate', state.user.userCreationDate);
    } else {
      localStorage.removeItem('johnsido-id');
      localStorage.removeItem('johnsido-token');
      localStorage.removeItem('johnsido-username');
      localStorage.removeItem('johnsido-firstname');
      localStorage.removeItem('johnsido-lastname');
      localStorage.removeItem('johnsido-avatar');
      localStorage.removeItem('johnsido-verified');
      localStorage.removeItem('johnsido-userCreationDate');
    }
  }, [state.loggedIn]);

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
