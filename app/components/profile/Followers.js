import React, { useEffect } from 'react';
import Axios from 'axios';
import { useImmer } from 'use-immer';
import { useParams, Link } from 'react-router-dom';
import Page from '../layouts/Page';

function Followers() {
  const [state, setState] = useImmer({
    username: useParams().username,
    followers: [],
  });
  useEffect(() => {
    const request = Axios.CancelToken.source();

    try {
      (async function fetchFollowers() {
        const response = await Axios.post(`/profile/${state.username}/followers`, {
          CancelToken: request.token,
        });

        if (response.data.status) {
          setState(draft => {
            draft.followers = response.data.followers;
          });
        } else {
          // FAIL SILENTLY
          console.log(response.data);
        }
      })();
    } catch (error) {
      console.log(error);
    }

    return () => request.cancel();
  }, []);

  return (
    <Page title="followers">
      <div className="max-w-xl mx-auto bg-yellow-300">
        {state.followers.map((follower, index) => {
          return (
            <Link
              className="flex items-center"
              key={index}
              to={`/profile/${follower.author.username}`}
            >
              <img className="w-12 h-12 rounded-full mr-3" src={`${follower.author.avatar}`} />

              <p>{follower.author.firstName}</p>
            </Link>
          );
        })}
      </div>
    </Page>
  );
}

export default Followers;
