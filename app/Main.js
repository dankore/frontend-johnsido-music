import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Axios from 'axios';
import { useImmerReducer } from 'use-immer';

// AXIOS BASE URL
console.log(process.env.BACKENDURL);
Axios.defaults.baseURL = process.env.BACKENDURL || 'https://backend-johnsido-music.herokuapp.com';
// STATE MANAGEMENT
import StateContext from './contextsProviders/StateContext';
import DispatchContext from './contextsProviders/DispatchContext';
//COMPONENTS
import UploadMusic from './pages/uploadMusic';
import ProfilePage from './pages/profile/ProfilePage';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Header from './components/shared/Header';
import SettingsPage from './pages/settings/SettingsPage';
import LandingPage from './pages/LandingPage';
import FlashMsgError from './components/shared/FlashMsgError';
import FlashMsgSuccess from './components/shared/FlashMsgSuccess';
import AboutPage from './pages/AboutPage';
import Comments from './components/profile/Comments';
import Footer from './components/shared/Footer';
import Followers from './components/profile/Followers';
import Following from './components/profile/Following';
import AdminLandingPage from './pages/admin/AdminLandingPage';

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
      scope: JSON.parse(localStorage.getItem('johnsido-scope')),
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
    toggleAdminLandingPageMenu: false,
    editComment: false,
    commentHistory: false,
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
      case 'toggleAdminLandingPageMenu':
        draft.toggleAdminLandingPageMenu = !draft.toggleAdminLandingPageMenu;
        return;
      case 'flashMsgError':
        draft.flashMsgErrors.value = action.value;
        draft.flashMsgErrors.isDisplay = true;
        return;
      case 'flashMsgSuccess':
        draft.flashMsgSuccess.value = action.value;
        draft.flashMsgSuccess.isDisplay = true;
        return;
      case 'editComment':
        draft.editComment = !draft.editComment;
        return;
      case 'commentHistory':
        draft.commentHistory = !draft.commentHistory;
        return;
      case 'turnOff':
        draft.flashMsgErrors.isDisplay = false;
        draft.flashMsgSuccess.isDisplay = false;
        draft.isOpenProfileDropdown = false;
        draft.toggleLandingPageMenu = false;
        draft.toggleAdminLandingPageMenu = false;
        return;
      case 'updateLocalStorage':
        if (action.process == 'profileUpdate') {
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
        }

        if (action.process == 'adminToUser_userToAdmin') {
          console.log(action.kind);
          if (action.kind == 'upgrade') {
            const scope = JSON.parse(localStorage.getItem('johnsido-scope'));
            scope.push('admin');
            localStorage.setItem('johnsido-scope', JSON.stringify(scope));

            state.user.scope.push('admin');
          }

          if (action.kind == 'downgrade') {
            const scope = JSON.parse(localStorage.getItem('johnsido-scope'));
            const indexOfAdminLocalStorage = scope.indexOf('admin');
            scope.splice(indexOfAdminLocalStorage, 1);
            console.log(JSON.stringify(scope), indexOfAdminLocalStorage);
            localStorage.setItem('johnsido-scope', JSON.stringify(scope));

            const indexOfAdminState = draft.user.scope.indexOf('admin');
            draft.user.scope.splice(indexOfAdminState, 1);
          }
        }

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
      localStorage.setItem('johnsido-scope', JSON.stringify(state.user.scope));
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
          <Route path={['/profile/:username', '/settings', '/upload-song', '/about']}>
            <Header />
            {state.flashMsgErrors.isDisplay && (
              <FlashMsgError errors={state.flashMsgErrors.value} />
            )}
            {state.flashMsgSuccess.isDisplay && <FlashMsgSuccess />}
          </Route>

          <Switch>
            <Route path="/upload-song">
              <UploadMusic />
            </Route>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route exact path="/profile/:username">
              <ProfilePage />
            </Route>
            <Route exact path="/profile/:username/comments">
              <Comments />
            </Route>
            <Route exact path="/profile/:username/followers">
              <Followers />
            </Route>
            <Route exact path="/profile/:username/following">
              <Following />
            </Route>
            <Route path="/admin/:username">
              {state.loggedIn ? (
                <AdminLandingPage />
              ) : (
                <div>Please login or register to view this page.</div>
              )}
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/about">
              <AboutPage />
            </Route>
            <Route path="/settings">
              {state.loggedIn ? (
                <SettingsPage />
              ) : (
                <div>Please login or register to view this page.</div>
              )}
            </Route>
            <Route to="/404">
              <div>404!</div>
            </Route>
            <Route>
              <div>Not found</div>
            </Route>
          </Switch>
          <Route path={['/profile/:username', '/settings', '/upload-song', '/about']}>
            <Footer />
          </Route>
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

ReactDOM.render(<Main />, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}
