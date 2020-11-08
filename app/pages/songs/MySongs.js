import React, { useEffect } from 'react';
import Page from '../../components/layouts/Page';
import { useImmerReducer } from 'use-immer';
import Axios from 'axios';
import { NavLink, Switch, Route } from 'react-router-dom';
import { activeNavCSS, linkCSS, navLinkCSS } from '../../helpers/CSSHelpers';
import Songs from '../../components/songs/Songs';

function MySongs() {
  const initialState = {
    mySongs: [],
  };

  function mySongsReducer(draft, action) {
    switch (action.type) {
      case 'fetchedMySongs':
        draft.mySongs = action.value;
        return;
    }
  }

  const [state, mySongsDispatch] = useImmerReducer(mySongsReducer, initialState);

  // FETCH SONGS
  useEffect(() => {
    const request = Axios.CancelToken.source();
    (async function getMySongs() {
      try {
        const response = await Axios.get('/my-songs', { CancelToken: request.token });

        if (response.data.status == 'Success') {
          mySongsDispatch({ type: 'fetchedMySongs', value: response.data.songs });
        } else {
          // VALIDATION CHECKS FAILURE ETC
          console.log(response.data);
        }
      } catch (error) {
        // FAIL SILENTLY
        console.log(error);
      }
    })();

    return () => request.cancel();
  }, []);

  //https://soundcloud.com/octobersveryown

  return (
    <Page title="My Songs">
      <div className="max-w-3xl mx-auto">
        <div className="h-32 bg-yellow-700"></div>
        <div>
          <div className="flex items-center justify-between">
            <NavLink
              className={linkCSS + navLinkCSS + ' js-brown-bg-hover'}
              activeStyle={activeNavCSS}
              to="/songs/johnsido/all"
            >
              All
            </NavLink>
            <NavLink
              className={linkCSS + navLinkCSS + ' js-brown-bg-hover'}
              activeStyle={activeNavCSS}
              to="/songs/johnsido/songs"
            >
              Songs
            </NavLink>
            <NavLink
              className={linkCSS + navLinkCSS + ' js-brown-bg-hover'}
              activeStyle={activeNavCSS}
              to="/songs/johnsido/albums"
            >
              Albums
            </NavLink>
          </div>
          <div>
            <Switch>
              <Route path="/songs/johnsido/all">All</Route>
              <Route path="/songs/johnsido/songs">
                <Songs songs={state.mySongs} />
              </Route>
              <Route path="/songs/johnsido/albums">Albums</Route>
            </Switch>
          </div>
        </div>
      </div>
    </Page>
  );
}

export default MySongs;
