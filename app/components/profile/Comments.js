import React from 'react';
import { useParams } from 'react-router-dom';
import Page from '../layouts/Page';

function Comments() {
  const { username } = useParams();
  console.log(username);
  const commentsArray = [1, 2, 3, 4];

  return (
    <Page title="Comments">
      <h1>{username}</h1>
      <div className="w-full sm:max-w-md lg:max-w-4xl mx-auto grid lg:grid-cols-2">
        <div>
          {commentsArray.map((comment, index) => {
            return (
              <div key={index} className="mb-3 border p-3 bg-gray-200">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quas assumenda
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

export default Comments;
