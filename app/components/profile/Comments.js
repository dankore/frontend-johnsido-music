import React, { useEffect } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import Page from '../layouts/Page';
import { useImmerReducer } from 'use-immer';
import Axios from 'axios';
import PropTypes from 'prop-types';

function Comments({ history }) {
  const initialState = {
    username: useParams().username,
    comments: [],
  };

  function commentsReducer(draft, action) {
    switch (action.type) {
      case 'fetchComments':
        draft.comments = action.value;
        return;
    }
  }

  const [state, commentsDispatch] = useImmerReducer(commentsReducer, initialState);
  console.log({ history });

  // FETCH COMMENTS
  useEffect(() => {
    const request = Axios.CancelToken.source();
    try {
      (async function fetchComments() {
        // GET _ID OF USER TO FETCH COMMENTS
        const response = await Axios.post(
          `/profile/${state.username}/comments`,
          { userId: history.location?.data?.userId },
          {
            CancelToken: request.token,
          }
        );

        commentsDispatch({ type: 'fetchComments', value: response.data });
      })();
    } catch (error) {
      // FAIL SILENTLY
      console.log(error);
    }
    return () => request.cancel();
  }, []);

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
        <div>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto autem quidem hic illum
          numquam accusamus natus rem soluta, porro amet? Vel quibusdam non, tempore repudiandae
          sunt veniam totam rem aliquam.
        </div>
      </div>
    </Page>
  );
}

Comments.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Comments);
