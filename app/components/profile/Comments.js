import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Page from '../layouts/Page';
import { useImmerReducer } from 'use-immer';
import Axios from 'axios';
import LoadingDotsAnimation from '../shared/LoadingDotsAnimation';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionStyle } from '../../helpers/CSSHelpers';

function Comments() {
  const CSSTransitionStyleModified = { ...CSSTransitionStyle, marginTop: -1.57 + 'rem' };
  const initialState = {
    username: useParams().username,
    comments: [],
    comment: {
      value: '',
      hasError: '',
      message: '',
    },
    isFetching: false,
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
        if (response.data) {
          commentsDispatch({ type: 'fetchComments', value: response.data });
        }
      })();
    } catch (error) {
      // FAIL SILENTLY
      console.log(error);
    }
    return () => request.cancel();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    commentsDispatch({ type: 'checkCommentFieldForErrors', value: state.comment.value });
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

export default Comments;
