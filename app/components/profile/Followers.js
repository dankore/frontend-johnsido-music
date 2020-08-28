import React, { useEffect } from 'react';
import Axios from 'axios';
import { useImmer } from 'use-immer';
import { useParams } from 'react-router-dom';

function Followers() {
  const [state] = useImmer({
    username: useParams().username,
  });
  useEffect(() => {
    const request = Axios.CancelToken.source();

    try {
      (async function fetchFollowers() {
        const response = await Axios.post(`/profile/${state.username}/followers`, {
          CancelToken: request.token,
        });

        console.log({ response: response.data });
      })();
    } catch (error) {
      console.log(error);
    }

    return () => request.cancel();
  }, []);
  return <>followers</>;
}

export default Followers;
