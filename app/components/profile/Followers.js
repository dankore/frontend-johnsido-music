import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useImmer } from 'use-immer';
import Axios from 'axios';
import LoadingDotsAnimation from '../shared/LoadingDotsAnimation';

function Followers() {
  const [state, setState] = useImmer({
    username: useParams().username,
    followers: [],
    isFetchingFollowers: false,
  });

  // FETCH FOLLOWERS
  useEffect(() => {
    const request = Axios.CancelToken.source();

    try {
      setState(draft => {
        draft.isFetchingFollowers = true;
      });

      (async function fetchFollowers() {
        const response = await Axios.post(`/profile/${state.username}/followers`, {
          CancelToken: request.token,
        });

        setState(draft => {
          draft.isFetchingFollowers = false;
        });

        console.log(response.data.followers);

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
  }, [state.username]);

  if (state.isFetchingProfileData) {
    return <LoadingDotsAnimation />;
  }

  return (
    <div className="mx-auto bg-yellow-300">
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
  );
}

export default Followers;
