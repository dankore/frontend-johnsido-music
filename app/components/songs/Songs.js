import React from 'react';
import PropTypes from 'prop-types';

function Songs({ songs }) {
  return (
    <ul className="max-w-2xl mx-auto mt-12">
      {songs.map((song, index) => {
        return (
          <li className="flex w-full justify-center mb-5 border border-gray-400" key={index}>
            <figure className="w-full flex items-end h-24">
              <img className="h-24 w-24" src={song.songCoverImage} />
              <div className="pl-3 w-full">
                <div className="flex justify-between py-2">
                  <figcaption>Listen to {song.songTitle}</figcaption>
                  <div>{song.songPostedDate}</div>
                </div>
                <audio className="block w-full" src={song.songUrl} controls>
                  <p>
                    Your browser doesn&apos;t support HTML5 audio. Here is a{' '}
                    <a href={song.songUrl}>link to the audio</a> instead.
                  </p>
                </audio>
                <div className="flex flex-wrap">
                  <p>From the album {song.songAlbumTitle}</p>
                </div>
              </div>
            </figure>
          </li>
        );
      })}
    </ul>
  );
}

Songs.propTypes = {
  songs: PropTypes.array,
};

export default Songs;
