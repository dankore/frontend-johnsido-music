import React from 'react';
import Page from '../components/layouts/Page';

function AboutPage() {
  return (
    <Page title="About Me">
      <div className="flex flex-wrap-reverse justify-center max-w-5xl mx-auto mt-5">
        <div className="flex items-center max-w-md">
          <div>
            <h1>Hi, I&apos;m John.</h1>
            <p className="mb-4 -mt-3 font-semibold text-gray-700">
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
