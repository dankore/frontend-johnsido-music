import React, { useEffect, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Axios from 'axios';
import { useImmerReducer } from 'use-immer';

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
import SettingsPage from './pages/settings/SettingsPage';
import LandingPage from './pages/LandingPage';
import FlashMsgError from './components/shared/FlashMsgError';
import FlashMsgSuccess from './components/shared/FlashMsgSuccess';

function Main() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem('johnsido-token')),
    user: {
      _id: localStorage.getItem('johnsido-id'),
      token: localStorage.getItem('johnsido-token'),
      username: localStorage.getItem('johnsido-username'),
      firstName: localStorage.getItem('johnsido-firstname'),
      lastName: localStorage.getItem('johnsido-lastname'),
      avatar: localStorage.getItem('johnsido-avatar'),
      verified: localStorage.getItem('johnsido-verified'),
      about: JSON.parse(localStorage.getItem('johnsido-about')),
      userCreationDate: localStorage.getItem('johnsido-userCreationDate'),
    },
    logo: {
      url:
        'https://res.cloudinary.com/my-nigerian-projects/image/upload/f_auto,q_auto/v1596961997/Others/john/logo.png',
      alt: 'John Sido Photo',
    },
    flashMsgErrors: {
      value: [],
      isDisplay: false,
    },
    flashMsgSuccess: {
      value: [],
      isDisplay: false,
    },
    isOpenProfileDropdown: false,
    toggleLandingPageMenu: false,
  };

  function appReducer(draft, action) {
    switch (action.type) {
      case 'login':
        draft.loggedIn = true;
        draft.user = action.value;
        return;
      case 'logout':
        draft.loggedIn = false;
        return;
      case 'updateUrl':
        draft.url = action.value;
        return;
      case 'isOpenProfileDropdown':
        draft.isOpenProfileDropdown = !draft.isOpenProfileDropdown;
        return;
      case 'toggleLandingPageMenu':
        draft.toggleLandingPageMenu = !draft.toggleLandingPageMenu;
        return;
      case 'flashMsgError':
        draft.flashMsgErrors.value = action.value;
        draft.flashMsgErrors.isDisplay = true;
        return;
      case 'flashMsgSuccess':
        draft.flashMsgSuccess.value = action.value;
        draft.flashMsgSuccess.isDisplay = true;
        return;
      case 'turnOff':
        draft.flashMsgErrors.isDisplay = false;
        draft.flashMsgSuccess.isDisplay = false;
        draft.isOpenProfileDropdown = false;
        draft.toggleLandingPageMenu = false;
        return;
      case 'updateLocalStorage':
        // UPDATE LOCAL STORAGE
        localStorage.setItem('johnsido-token', action.value.token);
        localStorage.setItem('johnsido-username', action.value.username);
        localStorage.setItem('johnsido-firstname', action.value.firstName);
        localStorage.setItem('johnsido-lastname', action.value.lastName);
        localStorage.setItem('johnsido-about', JSON.stringify(action.value.about));

        // UPDATE STATE
        draft.user.username = action.value.token;
        draft.user.username = action.value.username;
        draft.user.firstName = action.value.firstName;
        draft.user.lastName = action.value.lastName;
        draft.user.about = {
          bio: action.value.about.bio,
          city: action.value.about.city,
          musicCategory: action.value.about.musicCategory,
        };
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
      localStorage.setItem('johnsido-about', JSON.stringify(state.user.about));
      localStorage.setItem('johnsido-userCreationDate', state.user.userCreationDate);
    } else {
      localStorage.removeItem('johnsido-id');
      localStorage.removeItem('johnsido-token');
      localStorage.removeItem('johnsido-username');
      localStorage.removeItem('johnsido-firstname');
      localStorage.removeItem('johnsido-lastname');
      localStorage.removeItem('johnsido-avatar');
      localStorage.removeItem('johnsido-verified');
      localStorage.removeItem('johnsido-about');
      localStorage.removeItem('johnsido-userCreationDate');
    }
  }, [state.loggedIn]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <Switch>
            {/* ROUTES WITHOUT HEADER COMPONENT */}
            <Route exact path="/">
              <LandingPage />
            </Route>
            {/* ROUTES WITH HEADER COMPONENT */}
            <Fragment>
              <Header />
              {state.flashMsgErrors.isDisplay && (
                <FlashMsgError errors={state.flashMsgErrors.value} />
              )}
              {state.flashMsgSuccess.isDisplay && <FlashMsgSuccess />}
              <Route path="/home">
                <Homepage />
              </Route>

              <Route path="/profile/:username">
                <ProfilePage />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/settings">
                <SettingsPage />
              </Route>
              <Route to="/404">
                <div>Not found</div>
              </Route>
              <Route>
                <div>Not found</div>
              </Route>
            </Fragment>
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
