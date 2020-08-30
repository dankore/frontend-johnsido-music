import React from 'react';
import Page from '../components/layouts/Page';

function AboutPage() {
  return (
    <Page title="About Me">
      <div className="max-w-5xl mx-auto justify-center flex flex-wrap-reverse mt-5">
        <div className="max-w-md flex items-center">
          <div>
            <h1>Hi, I&apos;m John.</h1>
            <p className="mb-4 -mt-3 text-gray-700 font-semibold">
              Gospel Singer based in Abuja, FCT, Nigeria
            </p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex, beatae eveniet. Quos
              error sit sequi, porro minus obcaecati corporis dignissimos fugiat ratione et! Facere
              quas quos commodi ab porro est?
            </p>
          </div>
        </div>
        <div>
          <img
            src="https://res.cloudinary.com/my-nigerian-projects/image/upload/w_400/v1598529315/Others/john/john_yheyyp.png"
            alt="John's photo"
          />
        </div>
      </div>
    </Page>
  );
}

export default AboutPage;
