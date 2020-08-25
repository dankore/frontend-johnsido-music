import React, { useEffect, useContext } from 'react';
import { useParams, withRouter, Link } from 'react-router-dom';
import Page from '../layouts/Page';
import { useImmerReducer } from 'use-immer';
import Axios from 'axios';
import LoadingDotsAnimation from '../shared/LoadingDotsAnimation';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionStyle } from '../../helpers/CSSHelpers';
import StateContext from '../../contextsProviders/StateContext';
import PropTypes from 'prop-types';
import moment from 'moment';

function Comments({ history }) {
  const appState = useContext(StateContext);
  const CSSTransitionStyleModified = { ...CSSTransitionStyle, marginTop: -1.57 + 'rem' };
  const initialState = {
    username: useParams().username,
    comments: [],
    comment: {
      value: '',
      hasError: false,
      message: '',
    },
    isFetching: false,
    sendCount: 0,
    re_render_on_comment_add: 0,
  };

  function commentsReducer(draft, action) {
    switch (action.type) {
      case 'fetchComments':
        draft.comments = action.value;
        return;
      case 'updateComment':
        draft.comment.hasError = false;
        draft.comment.value = action.value;
        return;
      case 'checkCommentFieldForErrors':
        if (draft.comment.value == '') {
          draft.comment.hasError = true;
          draft.comment.message = 'Comment field is empty.';
        }
        return;
      case 'fetchStart':
        draft.isFetching = true;
        return;
      case 'fetchEnds':
        draft.isFetching = false;
        return;
      case 're_render_on_comment_add':
        draft.re_render_on_comment_add++;
        return;
      case 'addNewComment':
        draft.comments.unshift(action.value);
        // CLEAR INPUT FIELD
        draft.comment.value = '';
        return;
      case 'sendCommentForm':
        if (!draft.comment.hasError) {
          draft.sendCount++;
        }
        return;
    }
  }

  const [state, commentsDispatch] = useImmerReducer(commentsReducer, initialState);

  // FETCH COMMENTS
  useEffect(() => {
    const request = Axios.CancelToken.source();
    commentsDispatch({ type: 'fetchStart' });
    try {
      (async function fetchComments() {
        // GET _ID OF USER TO FETCH COMMENTS
        const response = await Axios.post(`/profile/${state.username}/comments`, {
          CancelToken: request.token,
        });

        commentsDispatch({ type: 'fetchEnds' });

        // RESPONSE.DATA RETURNS A FALSE OR AN ARRAY
        if (Array.isArray(response.data)) {
          commentsDispatch({ type: 'fetchComments', value: response.data });
        } else if (typeof response.data == 'object') {
          // NETWORK PROBLEMS TO DB. RETURNS AND OBJECT
          console.log('BD NOT RETURNING ANYTHING');
        } else {
          // RETURNS FALSE
          history.push('/404');
        }
      })();
    } catch (error) {
      // FAIL SILENTLY
      console.log(error);
    }
    return () => request.cancel();
  }, [state.re_render_on_comment_add]);

  // SUBMIT COMMENT
  useEffect(() => {
    if (state.sendCount) {
      const request = Axios.CancelToken.source();
      (async function sendFrom() {
        try {
          const response = await Axios.post(
            '/addComment',
            {
              author: appState.user._id,
              comment: state.comment.value,
              profileOwner: state.username, // USE THIS TO GET THE ID ON THE SERVER
              createdDate: moment().format('lll'),
              token: appState.user.token,
            },
            { cancelToken: request.token }
          );

          if (response.data._id) {
            commentsDispatch({ type: 'addNewComment', value: response.data });
          } else {
            // ERROR E.G COMMENT FIELD IS EMPTY CATCHED BY THE SERVER;
            console.log(response.data);
          }
        } catch (error) {
          // FAIL SILENTLY
          console.log(error);
        }
      })();

      return () => request.cancel();
    }
  }, [state.sendCount]);

  function handleSubmit(e) {
    e.preventDefault();
    commentsDispatch({ type: 'checkCommentFieldForErrors', value: state.comment.value });
    commentsDispatch({ type: 'sendCommentForm' });
  }

  if (state.isFetching) {
    return <LoadingDotsAnimation />;
  }

  return (
    <Page title="Comments">
      <h1>{state.username}</h1>
      <div className="w-full sm:max-w-md lg:max-w-4xl mx-auto grid lg:grid-cols-2">
        <div className="lg:pl-3">
          <form onSubmit={handleSubmit}>
            <h3>Add a Comment</h3>
            <div className="relative flex p-2 border">
              <div className="mr-1">
                <Link to={`/profile/${appState.user.username}`}>
                  <img
                    src={appState.user.avatar}
                    className="w-8 h-8 rounded-full"
                    alt="profile pic"
                  />
                </Link>
              </div>
              <div style={{ width: 15 + 'rem' }}>
                <textarea
                  value={state.comment.value}
                  onChange={e => commentsDispatch({ type: 'updateComment', value: e.target.value })}
                  id="input-comment"
                  className="focus:bg-gray-100 w-full rounded p-2"
                  placeholder="What's on your mind?"
                  style={{ backgroundColor: '#F2F3F5', whiteSpace: 'pre-wrap', overflow: 'hidden' }}
                ></textarea>
                <CSSTransition
                  in={state.comment.hasError}
                  timeout={330}
                  classNames="liveValidateMessage"
                  unmountOnExit
                >
                  <div style={CSSTransitionStyleModified} className="liveValidateMessage">
                    {state.comment.message}
                  </div>
                </CSSTransition>
                <button
                  id="add-comment-button"
                  className="rounded bg-blue-600 hover:bg-blue-800 text-white w-full"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
        <div
          style={{
            height: 500 + 'px',
            flexDirection: 'column-reverse',
            display: 'flex',
          }}
          className=""
        >
          <div style={{ flexShrink: 10, height: 100 + '%', overflow: 'auto' }}>
            {state.comments.map((comment, index) => {
              return (
                <ul key={index} className="mb-3 border bg-white">
                  <li id="li-comment" className="my-2 p-2 rounded">
                    <div className="flex">
                      <div className="flex mr-1">
                        <Link to={`/profile/${comment.author.username}`}>
                          <img
                            src={comment.author.avatar}
                            className="w-8 h-8 rounded-full"
                            alt="profile pic"
                          />
                        </Link>
                      </div>
                      <div
                        className="rounded px-2"
                        style={{
                          overflowWrap: 'break-word',
                          minWidth: 0 + 'px',
                          width: 15 + 'rem',
                          backgroundColor: '#F2F3F5',
                        }}
                      >
                        <Link to={`/profile/${comment.author.username}`} className="font-medium">
                          {comment.author.firstName} {comment.author.lastName}
                        </Link>
                        <div>
                          <p>{comment.comment}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-2 text-xs">
                      <p>{comment.createdDate}</p>
                      <div className="flex">
                        <input
                          type="button"
                          value="Edit"
                          id="edit-comment-button"
                          className="flex bg-white items-center cursor-pointer"
                        />

                        <input
                          type="button"
                          value="Delete"
                          id="delete-comment-button"
                          data-id="5e7388741d1cea0004d45616"
                          className="flex items-center text-red-600 bg-white cursor-pointer ml-3"
                        />
                      </div>
                    </div>
                  </li>
                </ul>
              );
            })}
          </div>
        </div>
      </div>
    </Page>
  );
}

Comments.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Comments);
