import React, { lazy, Suspense, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Axios from 'axios';
import { useImmerReducer } from 'use-immer';

// AXIOS BASE URL
console.log(process.env.BACKENDURL);
Axios.defaults.baseURL = process.env.BACKENDURL;
// STATE MANAGEMENT
import StateContext from './contextsProviders/StateContext';
import DispatchContext from './contextsProviders/DispatchContext';
//COMPONENTS //recommended size limit (244 KiB)
const ProfilePage = lazy(() => import('./pages/profile/ProfilePage'));
const Register = lazy(() => import('./pages/auth/Register'));
const Login = lazy(() => import('./pages/auth/Login'));
import Header from './components/shared/Header';
const SettingsPage = lazy(() => import('./pages/settings/SettingsPage'));
import LandingPage from './pages/LandingPage';
import FlashMsgError from './components/shared/FlashMsgError';
import FlashMsgSuccess from './components/shared/FlashMsgSuccess';
import AboutPage from './pages/AboutPage';
const Comments = lazy(() => import('./components/profile/Comments'));
import Footer from './components/shared/Footer';
const Followers = lazy(() => import('./components/profile/Followers'));
const Following = lazy(() => import('./components/profile/Following'));
const AdminLandingPage = lazy(() => import('./pages/admin/AdminLandingPage'));
import LoadingDotsAnimation from './components/shared/LoadingDotsAnimation';
import CookiesPage from './pages/policies/CookiesPage';
const TermsPage = lazy(() => import('./pages/policies/TermsPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/policies/PrivacyPolicyPage'));

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
    toggles: {
      mobileHamburgerHeaderLoggedIn: false,
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
      case 'toggles':
        if (action.for == 'mobileHamburgerHeaderLoggedIn') {
          draft.toggles.mobileHamburgerHeaderLoggedIn = !draft.toggles
            .mobileHamburgerHeaderLoggedIn;
        }
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
        draft.toggles.mobileHamburgerHeaderLoggedIn = false;
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

        if (action.process == 'removeAdminProperties') {
          const scope = JSON.parse(localStorage.getItem('johnsido-scope'));
          const indexOfAdminLocalStorage = scope.indexOf('admin');

          const indexOfAdminState = draft.user.scope.indexOf('admin');
          draft.user.scope.splice(indexOfAdminState, 1);

          if (indexOfAdminLocalStorage > -1) {
            scope.splice(indexOfAdminLocalStorage, 1);
            localStorage.setItem('johnsido-scope', JSON.stringify(scope));
          }
        }

        if (action.process == 'logout') {
          // REMOVE STATE VALUES
          draft.user.username = '';
          draft.user.username = '';
          draft.user.firstName = '';
          draft.user.lastName = '';
          draft.user.token = '';
          draft.user.userCreationDate = '';
          draft.user.verified = false;
          draft.user._id = '';
          draft.user.scope = [];
          draft.user.about = {};
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
      localStorage.removeItem('johnsido-scope');
      localStorage.removeItem('johnsido-userCreationDate');

      dispatch({ type: 'updateLocalStorage', process: 'logout' });
    }
  }, [state.loggedIn]);

  // CHECK TOKEN EXPIRY
  useEffect(() => {
    if (state.loggedIn) {
      const request = Axios.CancelToken.source();
      (async function checkTokenExpiry() {
        try {
          const response = await Axios.post(
            '/checkTokenExpiry',
            {
              token: state.user.token,
            },
            { cancelToken: request.token }
          );

          if (!response.data) {
            dispatch({ type: 'logout' });
            dispatch({
              type: 'flashMsgError',
              value: ['Your session has expired. Please log in again.'],
            });
          }
        } catch (error) {
          console.log('Problem verifying token expiry.');
        }
      })();

      return () => request.cancel();
    }
  }, []);

  const routePath = ['/profile/:username', '/about', '/terms', '/privacy', '/cookies'];

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <Route path={routePath}>
            <Header />
            {state.flashMsgErrors.isDisplay && (
              <FlashMsgError errors={state.flashMsgErrors.value} />
            )}
            {state.flashMsgSuccess.isDisplay && <FlashMsgSuccess />}
          </Route>
          <Suspense fallback={<LoadingDotsAnimation />}>
            <Switch>
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
                  //TODO - COMPONENT
                  <div>Please login or register to view this page.</div>
                )}
              </Route>
              <Route path="/register">
                {!state.loggedIn ? <Register /> : <div>Please logout to view this page.</div>}
              </Route>
              <Route path="/login">
                {!state.loggedIn ? <Login /> : <div>Please logout to view this page.</div>}
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
              <Route path="/terms">
                <TermsPage />
              </Route>
              <Route path="/privacy">
                <PrivacyPolicyPage />
              </Route>
              <Route path="/cookies">
                <CookiesPage />
              </Route>
              <Route to="/404">
                <div>404!</div>
              </Route>
              <Route>
                <div>Not found</div>
              </Route>
            </Switch>
          </Suspense>
          <Route path={routePath}>
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
