import React, { useEffect, useContext } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import Page from '../layouts/Page';
import { useImmerReducer } from 'use-immer';
import Axios from 'axios';
import LoadingDotsAnimation from '../shared/LoadingDotsAnimation';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionStyle } from '../../helpers/CSSHelpers';
import StateContext from '../../contextsProviders/StateContext';
import PropTypes from 'prop-types';

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
        draft.comments.push(action.value);
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
              token: appState.user.token,
            },
            { cancelToken: request.token }
          );

          commentsDispatch({ type: 'addNewComment', value: response.data });
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
        <div>
          {state.comments.map((comment, index) => {
            return (
              <div key={index} className="mb-3 border p-3 bg-gray-200">
                <p>{comment.comment}</p>
                <p>
                  {comment.author.firstName} {comment.author.lastName}
                </p>
              </div>
            );
          })}
        </div>
        <div className="lg:pl-3">
          <form onSubmit={handleSubmit}>
            <h3>Add a Comment</h3>
            <div className="relative">
              <input
                onChange={e => commentsDispatch({ type: 'updateComment', value: e.target.value })}
                className="bg-gray-200 border focus:border-transparent pl-2 py-3"
                type="text"
              />
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
            </div>
            <button>Submit</button>
          </form>
        </div>
      </div>
    </Page>
  );
}

Comments.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Comments);
