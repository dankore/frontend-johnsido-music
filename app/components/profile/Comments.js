import React from 'react';
import { useParams } from 'react-router-dom';
import Page from '../layouts/Page';

function Comments() {
  const { username } = useParams();
  console.log(username);

  return (
    <Page title="Comments">
      <div className="max-w-4xl mx-auto grid grid-cols-2">
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quas assumenda laboriosam?
          Autem labore repudiandae officiis doloribus ducimus, distinctio tempora illo debitis ea
          sed omnis sequi eaque nemo voluptas iste?
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
