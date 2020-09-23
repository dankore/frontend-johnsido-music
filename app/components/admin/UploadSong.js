import React, { useEffect, useContext } from 'react';
import { useImmerReducer } from 'use-immer';
import Page from '../layouts/Page';
// import { getAudioFileURL } from '../../helpers/JSHelpers';
import { CSSTransitionStyle } from '../../helpers/CSSHelpers';
import { CSSTransition } from 'react-transition-group';
import Axios from 'axios';
import StateContext from '../../contextsProviders/StateContext';

function UploadSong() {
  const appState = useContext(StateContext);
  const CSSTransitionStyleModified = { ...CSSTransitionStyle, marginTop: -0.2 + 'rem' };
  const initialState = {
    username: {
      value: '',
      errors: {
        hasErrors: false,
        message: '',
      },
      checkCount: 0,
      userDetailsFromDB: {
        display: false,
        value: '',
        error: false,
        errorMsg: '',
        isRegistered: false,
      },
    },
    songTitle: {
      value: '',
      errors: {
        hasErrors: false,
        message: '',
      },
    },
    audio: {
      value: '',
      errors: {
        hasErrors: false,
        errorMsg: '',
      },
    },
    submitCount: 0,
  };

  function uploadSongReducer(draft, action) {
    switch (action.type) {
      case 'usernameImmediately':
        draft.username.errors.hasErrors = false;
        draft.username.userDetailsFromDB.error = false;
        draft.username.userDetailsFromDB.display = false;
        draft.username.value = action.value;

        if (draft.username.value == '') {
          draft.username.errors.hasErrors = true;
          draft.username.errors.errorMsg = 'Username field is empty.';
        }

        return;
      case 'isRegisteredUser':
        draft.username.userDetailsFromDB.error = false;
        draft.username.userDetailsFromDB.display = false;

        if (action.value) {
          draft.username.userDetailsFromDB.value = action.value;
          draft.username.userDetailsFromDB.display = true;
          draft.username.userDetailsFromDB.isRegistered = true;
        } else {
          draft.username.userDetailsFromDB.error = true;
          draft.username.userDetailsFromDB.isRegistered = false;
          draft.username.userDetailsFromDB.errorMsg = 'Username does not exists.';
        }
        return;
      case 'usernameAfterDelay':
        draft.username.checkCount++;
        return;
      case 'songTitleImmediately':
        draft.songTitle.errors.hasErrors = false;
        draft.songTitle.value = action.value;

        if (draft.songTitle.value == '') {
          draft.songTitle.errors.hasErrors = true;
          draft.songTitle.errors.errorMsg = 'Song title field is empty.';
        }

        if (draft.songTitle.value.length > 150) {
          draft.songTitle.errors.hasErrors = true;
          draft.songTitle.errors.errorMsg = 'Song title cannot exceed 150 characters.';
        }
        return;
      case 'songTitleAfterDelay':
        if (draft.songTitle.value.length < 3) {
          draft.songTitle.errors.hasErrors = true;
          draft.songTitle.errors.errorMsg = 'Song title cannot be lower than 3 characters.';
        }
        return;
      case 'audioImmediately':
        draft.audio.errors.hasErrors = false;
        draft.audio.value = action.value;

        if (draft.audio.value == '') {
          draft.audio.errors.hasErrors = true;
          draft.audio.errors.errorMsg = 'Please upload audio.';
        }
        return;
      case 'submitForm':
        if (
          !draft.username.errors.hasErrors &&
          !draft.audio.errors.hasErrors &&
          !draft.songTitle.errors.hasErrors
        ) {
          draft.submitCount++;
        }
        return;
    }
  }

  const [state, uploadSongDispatch] = useImmerReducer(uploadSongReducer, initialState);

  // USERNAME AFTER DELAY INITIATOR
  useEffect(() => {
    if (state.username.value) {
      const delay = setTimeout(() => uploadSongDispatch({ type: 'usernameAfterDelay' }), 800);

      return () => clearTimeout(delay);
    }
  }, [state.username.value]);

  // USERNAME AFTER DELAY
  useEffect(() => {
    if (state.username.checkCount) {
      const request = Axios.CancelToken.source();
      (async function checkUsername() {
        try {
          const response = await Axios.post(
            '/doesUsernameExists',
            { username: state.username.value },
            { cancelToken: request.token }
          );
          uploadSongDispatch({ type: 'isRegisteredUser', value: response.data });
        } catch (error) {
          console.log(error);
        }
      })();

      return () => request.cancel();
    }
  }, [state.username.checkCount]);

  // SONG TITLE DELAY
  useEffect(() => {
    if (state.songTitle.value) {
      const delay = setTimeout(() => uploadSongDispatch({ type: 'songTitleAfterDelay' }), 800);

      return () => clearTimeout(delay);
    }
  }, [state.songTitle.value]);

  // FORM SUBMISSION PART 1
  function initiateFormSubmission(e) {
    e.preventDefault();
    uploadSongDispatch({ type: 'usernameImmediately', value: state.username.value });
    uploadSongDispatch({ type: 'songTitleImmediately', value: state.songTitle.value });
    uploadSongDispatch({ type: 'songTitleAfterDelay', value: state.songTitle.value });
    uploadSongDispatch({ type: 'audioImmediately', value: state.audio.value });
    uploadSongDispatch({ type: 'submitForm' });
  }

  // SUBMIT: AUTHOR, DATE POSTED,

  // FORM SUBMISSION PART 2
  useEffect(() => {
    if (state.submitCount) {
      const request = Axios.CancelToken.source();
      // let songUrl;
      console.log('inside send func');

      (async function uploadSongSubmit() {
        try {
          // GET AUDIO URL
          // songUrl = await getAudioFileURL(state.audio.value);
          // console.log({ songUrl });
          console.log(appState.user.username);

          const response = await Axios.post(
            `/admin/${appState.user.username}/uploadSong`,
            {
              songOwnerUsername: state.username.value,
              songTitle: state.songTitle.value,
              datePosted: '',
              songUrl: '',
              token: appState.user.token,
            },
            { cancelToken: request.token }
          );

          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      })();

      return () => request.cancel();
    }
  }, [state.submitCount]);

  return (
    <Page title="Upload Song">
      <div className="relative max-w-lg mx-auto py-5">
        <div className="flex justify-center text-blue-600">
          <svg
            className="w-12"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </div>
        <p className="text-xl font-semibold text-center leading-tight mb-8 mt-3">Upload New Song</p>

        {/* POP UP: DISPLAY SOME USER DETAILS */}
        <CSSTransition
          in={state.username.userDetailsFromDB.display}
          timeout={330}
          classNames="liveValidateMessage"
          unmountOnExit
        >
          <div className="w-full flex items-center justify-between absolute text-sm md:text-base -mt-24 text-white bg-gray-600 transition ease-out p-2">
            {/* IMAGE */}
            <div className="flex items-center">
              <img
                className="rounded-full w-16 h:16 md:w-24 md:h-24"
                src={state.username.userDetailsFromDB.value.avatar}
              />
              <div>
                <p className="normal-case ml-4">
                  {state.username.userDetailsFromDB.value.firstName}{' '}
                  {state.username.userDetailsFromDB.value.lastName}
                </p>
                {state.username.userDetailsFromDB.value.about && (
                  <>
                    <span className="normal-case ml-4">
                      {state.username.userDetailsFromDB.value.about.musicCategory}
                    </span>
                    <span className="normal-case ml-4">
                      {state.username.userDetailsFromDB.value.about.city}
                    </span>
                  </>
                )}
              </div>
            </div>
            {/* SVG */}
            <div className="ml-4">
              <div className="flex justify-center items-center w-full">
                <svg
                  className="w-12"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </div>
              <p className="text-center leading-tight mb-8 mt-3">Upload New Song</p>
            </div>
          </div>
        </CSSTransition>

        <form onSubmit={initiateFormSubmission} className="relative c-shadow bg-white p-3">
          {/* ERROR */}
          {state.username.userDetailsFromDB.error && (
            <div className="normal-case absolute text-red-600 top-0">
              {state.username.userDetailsFromDB.errorMsg}
            </div>
          )}
          <div className="">
            <div className="mb-4 relative">
              <label
                htmlFor="username"
                className="w-full text-xs font-bold inline-block mb-1 uppercase tracking-wide text-gray-700"
              >
                Username <span className="text-red-600">*</span>
              </label>
              <input
                value={state.username.value}
                onChange={e =>
                  uploadSongDispatch({ type: 'usernameImmediately', value: e.target.value })
                }
                id="username"
                type="text"
                autoComplete="off"
                className="transition ease-in-out duration-150 shadow-inner py-2 px-4  bg-gray-200 focus:outline-none appearance-none focus:border-gray-500 focus:bg-white border rounded leading-tight w-full"
                placeholder="Song owner's username"
              />
              <CSSTransition
                in={state.username.errors.hasErrors}
                timeout={330}
                classNames="liveValidateMessage"
                unmountOnExit
              >
                <div style={CSSTransitionStyleModified} className="liveValidateMessage">
                  {state.username.errors.errorMsg}
                </div>
              </CSSTransition>
            </div>

            <fieldset className="border rounded p-2 mb-4">
              <legend className=""></legend>
              <div className="relative mb-5">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
                  htmlFor="nickname"
                >
                  Upload Song <span className="text-red-600">*</span>
                </label>
                <input
                  onChange={e =>
                    uploadSongDispatch({ type: 'audioImmediately', value: e.target.files[0] })
                  }
                  name="file"
                  placeholder="Upload an image"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="photo"
                  type="file"
                  accept="audio/*"
                />
                <CSSTransition
                  in={state.audio.errors.hasErrors}
                  timeout={330}
                  classNames="liveValidateMessage"
                  unmountOnExit
                >
                  <div style={CSSTransitionStyleModified} className="liveValidateMessage">
                    {state.audio.errors.errorMsg}
                  </div>
                </CSSTransition>
              </div>
              <div className="relative">
                <label
                  htmlFor="song-title"
                  className="w-full text-xs font-bold block mb-1 uppercase tracking-wide text-gray-700 "
                >
                  Song Title <span className="text-red-600">*</span>
                </label>
                <input
                  onChange={e =>
                    uploadSongDispatch({ type: 'songTitleImmediately', value: e.target.value })
                  }
                  id="song-title"
                  type="text"
                  placeholder="Write song title here"
                  autoComplete="off"
                  className="transition ease-in-out duration-150 shadow-inner py-2 px-4  bg-gray-200 focus:outline-none appearance-none focus:border-gray-500 focus:bg-white border rounded leading-tight w-full"
                  value={state.songTitle.value}
                />
                <CSSTransition
                  in={state.songTitle.errors.hasErrors}
                  timeout={330}
                  classNames="liveValidateMessage"
                  unmountOnExit
                >
                  <div style={CSSTransitionStyleModified} className="liveValidateMessage">
                    {state.songTitle.errors.errorMsg}
                  </div>
                </CSSTransition>
              </div>
            </fieldset>
            {/* SUBMIT BUTTON */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="relative inline-flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-800 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
              >
                <svg
                  className="h-5 w-5 text-blue-300 mr-1 transition ease-in-out duration-150"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Save Updates
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="mt-32 max-w-6xl mx-auto text-center bg-white"></div>
    </Page>
  );
}

export default UploadSong;
