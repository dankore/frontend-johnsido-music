import React, { useEffect, useContext } from 'react';
import { useParams, withRouter, Link } from 'react-router-dom';
import Page from '../layouts/Page';
import { useImmerReducer } from 'use-immer';
import Axios from 'axios';
import LoadingDotsAnimation from '../shared/LoadingDotsAnimation';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionStyle } from '../../helpers/CSSHelpers';
import { timeAgo } from '../../helpers/JSHelpers';
import StateContext from '../../contextsProviders/StateContext';
import PropTypes from 'prop-types';
import DispatchContext from '../../contextsProviders/DispatchContext';

function Comments({ history }) {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const CSSTransitionStyleModified = { ...CSSTransitionStyle, marginTop: -1.57 + 'rem' };
  const initialState = {
    username: useParams().username,
    comments: [],
    comment: {
      value: '',
      hasError: false,
      message: '',
    },
    editComment: {
      value: '',
      commentId: '',
      hasError: false,
      message: '',
    },
    user: {
      profileUsername: '',
      profileFirstName: '',
      profileLastName: '',
      profileAvatar: '',
      profileEmail: '',
      profileAbout: { bio: '', musicCategory: '', city: '' },
      isFollowing: false,
      counts: {
        followerCount: 0,
        followingCount: 0,
        commentsCount: 0,
      },
    },
    isFetching: false,
    commentHistory: [],
    sendCountAdd: 0,
    sendCountEdit: 0,
  };

  function commentsReducer(draft, action) {
    switch (action.type) {
      case 'fetchComments':
        draft.comments = action.value;
        return;
      case 'addProfileUserInfo':
        draft.user = action.value;
        return;
      case 'updateComment':
        draft.comment.hasError = false;
        draft.comment.value = action.value;
        return;
      case 'checkCommentFieldForErrors':
        if (action.process == 'add') {
          if (draft.comment.value == '') {
            draft.comment.hasError = true;
            draft.comment.message = 'Comment field is empty.';
          }
        }

        if (action.process == 'edit') {
          if (draft.editComment.value == '') {
            draft.editComment.hasError = true;
            draft.editComment.message = 'Edit comment field is empty.';
          }
        }

        if (action.process == 'server') {
          draft.comment.hasError = true;
          draft.comment.message = action.value[0];
        }
        return;
      case 'fetchStart':
        draft.isFetching = true;
        return;
      case 'fetchEnds':
        draft.isFetching = false;
        return;
      case 'addNewComment':
        draft.comments.unshift(action.value);
        // CLEAR INPUT FIELD
        draft.comment.value = '';
        return;
      case 'editComment':
        draft.editComment.hasError = false;
        draft.editComment.value = action.value;

        if (action.updateCommentId) {
          draft.editComment.commentId = action.commentId;
        }
        return;
      case 'updateEditedComment': {
        const index = draft.comments.map(item => item._id).indexOf(action.value.commentId);
        draft.comments[index].comment.push(action.value.comment);
        return;
      }
      case 'deleteComment': {
        const index = draft.comments.map(item => item._id).indexOf(action.value);
        draft.comments.splice(index, 1);
        return;
      }
      case 'sendCommentForm':
        if (action.add && !draft.comment.hasError) {
          draft.sendCountAdd++;
        }
        if (action.edit && !draft.editComment.hasError) {
          draft.sendCountEdit++;
        }
        return;
      case 'commentHistory':
        draft.commentHistory = action.value;
        return;
    }
  }

  const [state, commentsDispatch] = useImmerReducer(commentsReducer, initialState);

  // FETCH PROFILE INFO
  useEffect(() => {
    const request = Axios.CancelToken.source();
    commentsDispatch({ type: 'fetchStart' });
    try {
      (async function fetchProfileData() {
        const response = await Axios.post(`/profile/${state.username}`, {
          cancelToken: request.token,
        });

        commentsDispatch({ type: 'fetchEnds' });

        if (response.data) {
          commentsDispatch({ type: 'addProfileUserInfo', value: response.data });
        } else {
          history.push('/404');
        }
      })();
    } catch (error) {
      console.log(error);
    }
    return () => request.cancel();
  }, [state.username]);

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
  }, []);

  // ADD SUBMIT COMMENT
  useEffect(() => {
    if (state.sendCountAdd) {
      const request = Axios.CancelToken.source();
      (async function sendForm() {
        try {
          const response = await Axios.post(
            '/add-comment',
            {
              author: appState.user._id,
              comment: state.comment.value,
              profileOwner: state.username, // USE THIS TO GET THE ID ON THE SERVER
              createdDate: Date.now(),
              token: appState.user.token,
            },
            { cancelToken: request.token }
          );

          if (response.data._id) {
            commentsDispatch({ type: 'addNewComment', value: response.data });
          } else {
            // ERROR E.G COMMENT FIELD IS EMPTY/NOT LOGGED IN CATCHED BY THE SERVER;
            commentsDispatch({
              type: 'checkCommentFieldForErrors',
              value: response.data,
              process: 'server',
            });
            console.log(response.data);
          }
        } catch (error) {
          // FAIL SILENTLY
          console.log(error);
        }
      })();

      return () => request.cancel();
    }
  }, [state.sendCountAdd]);

  // EDIT SUBMIT COMMENT
  useEffect(() => {
    if (state.sendCountEdit) {
      const request = Axios.CancelToken.source();
      (async function sendForm() {
        try {
          const response = await Axios.post(
            '/edit-comment',
            {
              commentId: state.editComment.commentId,
              comment: state.editComment.value,
              profileOwner: state.username, // USE THIS TO GET THE ID ON THE SERVER
              apiUser: appState.user.username,
              createdDate: Date.now(),
              token: appState.user.token,
            },
            { cancelToken: request.token }
          );

          if (response.data.status) {
            const newComment = response.data.comments[response.data.comments.length - 1];

            commentsDispatch({
              type: 'updateEditedComment',
              value: {
                commentId: state.editComment.commentId,
                comment: {
                  text: newComment.text,
                  createdDate: newComment.createdDate,
                  edited: true,
                },
              },
            });

            appDispatch({ type: 'editComment' }); // CLOSE MODAL
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
  }, [state.sendCountEdit]);

  async function handleDelete(e) {
    const confirm = window.confirm('Are you sure?');

    if (confirm) {
      try {
        const request = Axios.CancelToken.source();
        const commentId = e.target.getAttribute('data-id');
        const response = await Axios.post(
          '/delete-comment',
          { commentId, apiUser: appState.user.username, token: appState.user.token },
          { cancelToken: request.token }
        );

        if (response.data == 'Success') {
          commentsDispatch({ type: 'deleteComment', value: commentId });
        } else {
          // DELETE FAILED
          console.log(response.data);
        }
      } catch (error) {
        // NETWORK ERROR
        console.log(error);
      }
    }
  }

  function handleEditClick(e) {
    const currentText =
      e.target.parentElement.parentElement.parentElement.childNodes[0].childNodes[1].childNodes[1]
        .childNodes[0].innerText;
    const commentId = e.target.getAttribute('data-id');

    commentsDispatch({ type: 'editComment', value: currentText, commentId, updateCommentId: true });

    appDispatch({ type: 'editComment' }); // MAKE MODAL TRUE
  }

  function handleSubmit(e, type) {
    e.preventDefault();
    switch (type) {
      case 'add':
        commentsDispatch({
          type: 'checkCommentFieldForErrors',
          value: state.comment.value,
          process: 'add',
        });
        commentsDispatch({ type: 'sendCommentForm', add: true });
        return;
      case 'edit':
        commentsDispatch({
          type: 'checkCommentFieldForErrors',
          value: state.editComment.value,
          process: 'edit',
        });
        commentsDispatch({ type: 'sendCommentForm', edit: true });
        return;
    }
  }

  function time(commentObject) {
    if (commentObject.edited) {
      return (
        <div className="flex">
          <p className="mr-2">{timeAgo(commentObject.createdDate)}</p>
          <button
            onClick={handleCommentHistory}
            data-comments={JSON.stringify(commentObject)}
            className="hover:underline"
          >
            Edited
          </button>
        </div>
      );
    }

    return timeAgo(commentObject.createdDate);
  }

  function handleCommentHistory(e) {
    const comments = e.target.parentElement.parentElement.parentElement.getAttribute(
      'data-comments'
    );

    commentsDispatch({ type: 'commentHistory', value: JSON.parse(comments) });
    appDispatch({ type: 'commentHistory' });
  }

  if (state.isFetching) {
    return <LoadingDotsAnimation />;
  }

  return (
    <Page
      title={`Comments on ${state.user.profileFirstName} ${state.user.profileLastName}'s profile`}
    >
      <div className="p-3 w-full  bg-gradient-to-r from-orange-400 via-red-500 to-pink-500">
        <p
          style={{
            backgroundImage: `url(https://res.cloudinary.com/my-nigerian-projects/image/upload/f_auto,g_auto/v1596725538/Others/layout-pattern.png)`,
          }}
          className="text-5xl sm:max-w-xl lg:max-w-6xl mx-auto"
        >
          Comments
        </p>
      </div>
      <div className="w-full sm:max-w-xl lg:max-w-6xl mx-auto grid lg:grid-cols-2">
        <div className="w-full">
          <div className="mx-auto max-w-sm py-3">
            <img
              className="mx-auto max-w-sm"
              style={{
                height: 300 + 'px',
                borderRadius: 50 + '%',
              }}
              src={state.user.profileAvatar}
            />
            <div className="mx-auto max-w-sm">
              <p className="text-center text-2xl bg-clip-text text-transparent bg-gradient-to-r  from-orange-400 via-red-500 to-pink-500">
                {state.user.profileFirstName} {state.user.profileLastName}
              </p>
              <div className="flex justify-center mt-3">
                <div className="mr-5">
                  <i className="fas fa-music mr-2 text-lg"></i>
                  {state.user.profileAbout.musicCategory}
                </div>
                <div className="">
                  <i className="fas fa-map-marker-alt mr-2 text-lg"></i>
                  {state.user.profileAbout.city}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:pl-3">
            <form onSubmit={e => handleSubmit(e, 'add')}>
              <h2 className="px-3 text-xl mb-3 bg-clip-text text-transparent bg-gradient-to-r  from-orange-400 via-red-500 to-pink-500">
                Add a Comment
              </h2>
              <div className="relative flex p-2 border">
                <div className="mr-1">
                  <Link to={`/profile/${state.user.profileUsername}`}>
                    <img
                      src={state.user.profileAvatar}
                      className="w-8 h-8 rounded-full"
                      alt="profile pic"
                    />
                  </Link>
                </div>
                <div className="w-full">
                  <textarea
                    value={state.comment.value}
                    onChange={e =>
                      commentsDispatch({ type: 'updateComment', value: e.target.value })
                    }
                    id="input-comment"
                    className="focus:bg-gray-100 w-full p-2"
                    placeholder="What's on your mind?"
                    style={{
                      backgroundColor: '#F2F3F5',
                      whiteSpace: 'pre-wrap',
                      overflow: 'hidden',
                    }}
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
                  <button className="h-12 bg-blue-600 hover:bg-blue-800 text-white w-full">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div
          style={{
            height: 500 + 'px',
            flexDirection: 'column-reverse',
            display: 'flex',
          }}
        >
          <ul className="relative" style={{ flexShrink: 10, height: 100 + '%', overflow: 'auto' }}>
            {state.comments.map((comment, index) => {
              const lastComment = comment.comment[comment.comment.length - 1];

              return (
                <li
                  key={index}
                  className="relative border bg-white p-2"
                  data-comments={JSON.stringify(comment.comment)}
                >
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
                      className="w-full px-2"
                      style={{
                        overflowWrap: 'break-word',
                        minWidth: 0 + 'px',
                        backgroundColor: '#F2F3F5',
                      }}
                    >
                      <Link to={`/profile/${comment.author.username}`} className="font-medium">
                        {comment.author.firstName} {comment.author.lastName}
                      </Link>
                      <div>
                        <p>{lastComment.text}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2 text-xs">
                    {time(lastComment)}
                    {appState.loggedIn && appState.user.username == comment.author.username && (
                      <div className="flex">
                        <input
                          type="button"
                          value="Edit"
                          data-id={comment._id}
                          onClick={handleEditClick}
                          className="flex bg-white items-center cursor-pointer"
                        />

                        <input
                          onClick={handleDelete}
                          type="button"
                          value="Delete"
                          data-id={`${comment._id}`}
                          className="flex items-center text-red-600 bg-white cursor-pointer ml-3"
                        />
                      </div>
                    )}
                  </div>
                </li>
              );
            })}

            {/* VIEW COMMENT HISTORY */}
            {appState.commentHistory && (
              <div
                style={{
                  height: 500 + 'px',
                }}
                className="w-full modal border bg-gradient-to-r from-orange-400 via-red-500 to-pink-500"
              >
                <div
                  className="bg-white"
                  style={{ flexShrink: 10, height: 100 + '%', overflow: 'auto' }}
                >
                  <div className="pr-4 flex text-2xl w-full justify-between bg-gradient-to-r from-orange-400 via-red-500 to-pink-500">
                    <h2 className="font-semibold">Comment Edit History</h2>
                    <button onClick={() => appDispatch({ type: 'commentHistory' })}>Close</button>
                  </div>
                  {state.commentHistory.map((item, index) => {
                    return (
                      <div className="border-b p-3 bg-gray-100" key={index}>
                        <p className="text-gray-700">{timeAgo(item.createdDate)}</p>
                        <p className="">{item.text}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {/* VIEW COMMENT HISTORY ENDS */}

            {/* EDIT COMMENT */}
            {appState.editComment && (
              <form onSubmit={e => handleSubmit(e, 'edit')}>
                <div className="w-full modal border bg-gradient-to-r from-orange-400 via-red-500 to-pink-500">
                  <div className="flex text-2xl justify-between">
                    <h2 className="font-semibold">Edit Comment</h2>
                    <button onClick={() => appDispatch({ type: 'editComment' })}>Close</button>
                  </div>
                  <textarea
                    value={state.editComment.value}
                    onChange={e => commentsDispatch({ type: 'editComment', value: e.target.value })}
                    className="focus:bg-gray-100 w-full p-2"
                    placeholder="What's on your mind?"
                    style={{
                      backgroundColor: '#F2F3F5',
                      whiteSpace: 'pre-wrap',
                      overflow: 'hidden',
                    }}
                  >
                    {state.editComment.value}
                  </textarea>
                  <CSSTransition
                    in={state.editComment.hasError}
                    timeout={330}
                    classNames="liveValidateMessage"
                    unmountOnExit
                  >
                    <div style={CSSTransitionStyleModified} className="liveValidateMessage">
                      {state.editComment.message}
                    </div>
                  </CSSTransition>
                  <button className="h-12 bg-blue-600 hover:bg-blue-800 text-white w-full">
                    Update Comment
                  </button>
                </div>
              </form>
            )}
            {/* EDIT COMMENT ENDS */}
          </ul>
        </div>
      </div>
    </Page>
  );
}

Comments.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Comments);
