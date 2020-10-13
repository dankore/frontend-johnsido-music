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
import ReuseableModal from '../admin/ReuseableModal';
import BackToProfileBtn from '../shared/BackToProfileBtn';
import PleaseLoginRegister from '../shared/PleaseLoginRegister';

function Comments({ history }) {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const CSSTransitionStyleModified = { ...CSSTransitionStyle, marginTop: -1 + 'rem' };
  const initialState = {
    username: useParams().username,
    comments: [],
    comment: {
      value: '',
      hasError: false,
      message: '',
      isSaving: false,
    },
    editComment: {
      value: '',
      commentId: '',
      hasError: false,
      message: '',
      isSaving: false,
      commentBeforeEdit: '',
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
    deleteComment: {
      commentId: '',
      toggleDeleteModal: false,
      isDeleting: false,
    },
    commentHistory: [],
    pleaseLogingRegister: false,
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
          if (draft.comment.value.trim() == '' && appState.loggedIn) {
            draft.comment.hasError = true;
            draft.comment.message = 'Comment field is empty.';
            draft.comment.value = '';
          }
        }

        if (action.process == 'edit') {
          if (draft.editComment.value.trim() == '') {
            draft.editComment.hasError = true;
            draft.editComment.message = 'Edit comment field is empty.';
            draft.editComment.value = '';
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
        if (action.process == 'add') {
          action.value.comment[0].text = action.value.comment[0].text.trim(); // TRIM TEXT
          draft.comments.unshift(action.value);

          // CLEAR INPUT FIELD
          draft.comment.value = '';
        }
        action.process == 'starts' && (draft.comment.isSaving = true);
        action.process == 'ends' && (draft.comment.isSaving = false);
        return;
      case 'editComment':
        draft.editComment.hasError = false;
        if (action.process == 'addToState' || action.process == 'typingToState') {
          draft.editComment.value = action.value;
          action.process == 'addToState' && (draft.editComment.commentId = action.commentId);
          action.process == 'addToState' && (draft.editComment.commentBeforeEdit = action.value);
        }

        if (action.process == 'updateEditedComment') {
          const index = draft.comments.map(item => item._id).indexOf(action.value.commentId);
          draft.comments[index].comment.push(action.value.comment);
        }
        action.process == 'starts' && (draft.editComment.isSaving = true);
        action.process == 'ends' && (draft.editComment.isSaving = false);
        return;
      case 'deleteComment': {
        if (action.process == 'delete') {
          const index = draft.comments.map(item => item._id).indexOf(action.value);
          draft.comments.splice(index, 1);
        }
        if (action.process == 'starts') {
          draft.deleteComment.isDeleting = true;
        }
        if (action.process == 'ends') {
          draft.deleteComment.isDeleting = false;
        }
        if (action.process == 'toggle') {
          draft.deleteComment.commentId = action.value;
          draft.deleteComment.toggleDeleteModal = !draft.deleteComment.toggleDeleteModal;
        }
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
      case 'pleaseLogingRegister':
        draft.pleaseLogingRegister = !draft.pleaseLogingRegister;
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

  // SAVE COMMENT TO DB
  useEffect(() => {
    if (state.sendCountAdd) {
      if (appState.loggedIn) {
        commentsDispatch({ type: 'addNewComment', process: 'starts' });
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

            commentsDispatch({ type: 'addNewComment', process: 'ends' });

            if (response.data._id) {
              commentsDispatch({ type: 'addNewComment', value: response.data, process: 'add' });
            } else {
              // ERROR E.G COMMENT FIELD IS EMPTY/NOT LOGGED IN CAUGTH BY THE SERVER;
              commentsDispatch({
                type: 'checkCommentFieldForErrors',
                value: response.data,
                process: 'server',
              });
            }
          } catch (error) {
            // FAIL SILENTLY
            console.log(error);
          }
        })();

        return () => request.cancel();
      } else {
        commentsDispatch({ type: 'pleaseLogingRegister' });
      }
    }
  }, [state.sendCountAdd]);

  // SAVE EDITED COMMENT TO DB
  useEffect(() => {
    if (state.sendCountEdit) {
      if (state.editComment.value.trim() != state.editComment.commentBeforeEdit.trim()) {
        commentsDispatch({ type: 'editComment', process: 'starts' });
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

            commentsDispatch({ type: 'editComment', process: 'ends' });

            if (response.data.status) {
              const newComment = response.data.comments[response.data.comments.length - 1];
              commentsDispatch({
                type: 'editComment',
                process: 'updateEditedComment',
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
              // ERROR E.G COMMENT FIELD IS EMPTY/NOT LOGGED IN CAUGTH BY THE SERVER;
              commentsDispatch({
                type: 'checkCommentFieldForErrors',
                value: response.data,
                process: 'server',
              });
              appDispatch({ type: 'editComment' }); // CLOSE MODAL
            }
          } catch (error) {
            // FAIL SILENTLY
            console.log(error);
          }
        })();

        return () => request.cancel();
      } else {
        appDispatch({ type: 'editComment' }); // CLOSE MODAL
      }
    }
  }, [state.sendCountEdit]);

  async function handleDelete(e) {
    try {
      commentsDispatch({ type: 'deleteComment', process: 'starts' });
      const request = Axios.CancelToken.source();
      const commentId = e.target.getAttribute('data-commentid');
      const response = await Axios.post(
        '/delete-comment',
        { commentId, apiUser: appState.user.username, token: appState.user.token },
        { cancelToken: request.token }
      );

      commentsDispatch({ type: 'deleteComment', process: 'ends' });

      if (response.data == 'Success') {
        commentsDispatch({ type: 'deleteComment', value: commentId, process: 'delete' });
        commentsDispatch({ type: 'deleteComment', process: 'toggle' });
      } else {
        // ERROR E.G COMMENT FIELD IS EMPTY/NOT LOGGED IN CAUGTH BY THE SERVER;
        commentsDispatch({
          type: 'checkCommentFieldForErrors',
          value: response.data,
          process: 'server',
        });
        commentsDispatch({ type: 'deleteComment', process: 'toggle' });
      }
    } catch (error) {
      // NETWORK ERROR
      console.log(error);
    }
  }

  function handleEditClick(e) {
    const currentText = e.target.getAttribute('data-comment');
    const commentId = e.target.getAttribute('data-id');

    commentsDispatch({
      type: 'editComment',
      value: currentText,
      commentId,
      process: 'addToState',
    });

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

  function handleDeleteModalToggle(e) {
    const commentId = e.target.getAttribute('data-commentid');

    commentsDispatch({ type: 'deleteComment', value: commentId, process: 'toggle' });
  }

  function handleCommentInput(e, process) {
    process == 'add' && commentsDispatch({ type: 'updateComment', value: e.target.value });
    process == 'edit' &&
      commentsDispatch({ type: 'editComment', value: e.target.value, process: 'typingToState' });

    e.target.style.height = '0.5px';
    e.target.style.height = 25 + e.target.scrollHeight + 'px';
  }

  if (state.isFetching) {
    return <LoadingDotsAnimation />;
  }

  return (
    <Page
      title={`Comments on ${state.user.profileFirstName} ${state.user.profileLastName}'s profile`}
    >
      {/* BACK TO PROFILE BTN */}
      <div className="w-full pl-3 mx-auto my-5 sm:max-w-xl lg:max-w-6xl xl:pl-0">
        <div className="inline-block h-8">
          <BackToProfileBtn
            username={state.user.profileUsername}
            firstName={state.user.profileFirstName}
            linkDomId={true}
            linkChild={true}
          />
        </div>
      </div>

      <div className="grid w-full gap-2 mx-auto sm:max-w-xl lg:max-w-6xl lg:grid-cols-2">
        <div className="w-full">
          <div className="py-3  c-shadow">
            <img
              className="max-w-sm mx-auto"
              style={{
                height: 300 + 'px',
                borderRadius: 50 + '%',
              }}
              src={state.user.profileAvatar}
            />
            <div className="max-w-sm mx-auto">
              <p className="text-2xl text-center text-blue-600">
                {state.user.profileFirstName} {state.user.profileLastName}
              </p>
              <div className="flex justify-center mt-3">
                {state.user.profileAbout.musicCategory && (
                  <div className="mr-5 text-gray-700">
                    <i className="mr-2 text-lg fas fa-music"></i>
                    {state.user.profileAbout.musicCategory}
                  </div>
                )}
                {state.user.profileAbout.city && (
                  <div className="text-gray-700">
                    <i className="mr-2 text-lg fas fa-map-marker-alt"></i>
                    {state.user.profileAbout.city}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-5  c-shadow">
            <form onSubmit={e => handleSubmit(e, 'add')}>
              <h2 className="p-3 text-xl text-gray-700 bg-gray-200 border-b">Add a Comment</h2>
              <div className="relative flex p-2">
                <div className="mr-1">
                  <Link
                    className="focus:outline-none"
                    to={`/profile/${state.user.profileUsername}`}
                  >
                    <img
                      src={state.user.profileAvatar}
                      className="w-8 h-8 transition duration-500 ease-in-out transform rounded-full hover:scale-105"
                      alt="profile pic"
                    />
                  </Link>
                </div>
                <div className="w-full">
                  <textarea
                    value={state.comment.value}
                    onChange={e => handleCommentInput(e, 'add')}
                    id="input-comment"
                    className="w-full px-4 py-2 leading-tight transition duration-150 ease-in-out bg-white appearance-none focus:outline-none focus:border-gray-500 focus:bg-white"
                    placeholder="What's on your mind?"
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
                  <button className="inline-flex items-center justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue sm:text-sm sm:leading-5">
                    {state.comment.isSaving ? (
                      <span>
                        <i className="text-sm fa fa-spinner fa-spin"></i>
                      </span>
                    ) : (
                      <>Submit</>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* IF THERE'S COMMENT */}
        {state.comments.length > 0 && (
          <div
            className="bg-transparent border-t"
            style={{
              maxHeight: 500 + 'px',
              flexDirection: 'column-reverse',
              display: 'flex',
            }}
          >
            <ul
              className="relative"
              style={{ flexShrink: '10', height: 100 + '%', overflow: 'auto' }}
            >
              {state.comments.map((comment, index) => {
                const lastComment = comment.comment[comment.comment.length - 1]; // LAST COMMENT IS THE CURRENT COMMENT BECAUSE IT IS CONTAINED IN AN ARRAY WHICH INCLUDES PREVIOUS EDITED VERSIONS

                return (
                  <li
                    key={index}
                    className="relative p-2 mb-1 bg-white border-l border-r c-shadow"
                    data-comments={JSON.stringify(comment.comment)}
                  >
                    <div className="flex">
                      <div className="mr-1">
                        <Link
                          className="focus:outline-none"
                          to={`/profile/${comment.author.username}`}
                        >
                          <img
                            src={comment.author.avatar}
                            className="w-8 h-8 transition duration-500 ease-in-out transform rounded-full hover:scale-105"
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
                        <Link
                          to={`/profile/${comment.author.username}`}
                          className="font-medium focus:outline-none hover:underline"
                        >
                          {comment.author.firstName} {comment.author.lastName}
                        </Link>
                        <div>
                          <p style={{ wordBreak: 'break-word' }}>{lastComment.text}</p>
                        </div>
                      </div>
                    </div>
                    {/* TIMESTAMP, EDIT, DELETE */}
                    <div className="flex items-center justify-between mt-2 text-xs">
                      {time(lastComment)}
                      {appState.loggedIn && appState.user.username == comment.author.username && (
                        <div className="flex">
                          <input
                            type="button"
                            value="Edit"
                            data-id={comment._id}
                            data-comment={lastComment.text}
                            onClick={handleEditClick}
                            className="flex items-center bg-white cursor-pointer hover:underline focus:outline-none"
                          />

                          <input
                            onClick={handleDeleteModalToggle}
                            type="button"
                            value="Delete"
                            data-commentid={comment._id}
                            className="flex items-center ml-3 text-red-600 bg-white cursor-pointer hover:underline focus:outline-none"
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
                    height: 300 + 'px',
                  }}
                  className="w-full modal"
                >
                  <div
                    className="bg-gray-200 c-shadow2"
                    style={{ flexShrink: 10, height: 100 + '%', overflow: 'auto' }}
                  >
                    <div className="flex justify-between w-full p-3 text-xl text-gray-700 bg-gray-200 c-shadow2">
                      <h2 className="font-semibold">Comment Edit History</h2>
                      <button
                        className="hover:underline focus:outline-none"
                        onClick={() => appDispatch({ type: 'commentHistory' })}
                      >
                        Close
                      </button>
                    </div>
                    {state.commentHistory.map((item, index) => {
                      return (
                        <div className="p-3 mb-2 bg-white border-b c-shadow" key={index}>
                          <p className="text-gray-700">{timeAgo(item.createdDate)}</p>
                          <p style={{ wordBreak: 'break-word' }}>{item.text}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {/* EDIT COMMENT */}
              {appState.editComment && (
                <form onSubmit={e => handleSubmit(e, 'edit')}>
                  <div className="w-full modal">
                    <div className="bg-white c-shadow">
                      <div className="flex justify-between w-full p-2 text-xl text-white bg-gray-600 c-shadow2">
                        <h2 className="">Edit Comment</h2>
                        <button
                          className="hover:underline focus:outline-none"
                          onClick={() => appDispatch({ type: 'editComment' })}
                        >
                          Close
                        </button>
                      </div>
                      <textarea
                        value={state.editComment.value}
                        onChange={e => handleCommentInput(e, 'edit')}
                        className="w-full px-4 py-2 leading-tight transition duration-150 ease-in-out appearance-none focus:outline-none focus:border-gray-500 focus:bg-white"
                        placeholder="What's on your mind?"
                      />

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
                      <div className="p-2 bg-gray-200 sm:flex sm:flex-row-reverse">
                        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                          <button className="inline-flex items-center justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue sm:text-sm sm:leading-5">
                            {state.editComment.isSaving ? (
                              <span>
                                <i className="text-sm fa fa-spinner fa-spin"></i>
                              </span>
                            ) : (
                              <>Update Comment</>
                            )}
                          </button>
                        </span>
                        <span className="flex w-full mt-3 rounded-md shadow-sm sm:mt-0 sm:w-auto">
                          <button
                            onClick={() => appDispatch({ type: 'editComment' })}
                            type="button"
                            className="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue sm:text-sm sm:leading-5"
                          >
                            Cancel
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </form>
              )}
              {/* DELETE COMMENT */}
              {state.deleteComment.toggleDeleteModal && (
                <ReuseableModal
                  user={appState.user}
                  type="delete-comment"
                  btnText="Yes, Delete Comment"
                  commentId={state.deleteComment.commentId}
                  handleToggle={() =>
                    commentsDispatch({ type: 'deleteComment', process: 'toggle' })
                  }
                  handleSubmit={handleDelete}
                  loading={state.deleteComment.isDeleting}
                />
              )}
            </ul>
            {state.comments.length > 4 && (
              <div className="px-2 py-4 bg-gray-200 c-shadow">Scroll to view comments</div>
            )}
          </div>
        )}
        {/* NO COMMENT */}
        {state.comments.length < 1 && (
          <div className="flex items-center justify-center w-full h-full text-xl text-gray-700">
            No comment yet. Be the first to comment!
          </div>
        )}
      </div>
      {state.pleaseLogingRegister && (
        <PleaseLoginRegister
          fromUrl={history.location.pathname}
          toggle={() => commentsDispatch({ type: 'pleaseLogingRegister' })}
        />
      )}
    </Page>
  );
}

Comments.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Comments);
