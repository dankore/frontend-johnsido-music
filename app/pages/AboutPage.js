import React from 'react';
import Page from '../components/layouts/Page';

function AboutPage() {
  return (
    <Page title="About Me">
      <div className="flex flex-wrap-reverse justify-center max-w-5xl mx-auto mt-5">
        <div className="flex items-center lg:flex-wrap max-w-md">
          <div className="lg:mt-32">
            <h1 className="text-center md:text-left mt-5 md:mt-0">Hi, I&apos;m John.</h1>
            <p className="mb-4 -mt-3 font-semibold text-gray-700">
              Gospel Singer based in Abuja, FCT, Nigeria
            </p>
            <p className="mb-3">
              John Solomon Idoko (aka) Johnsido is the third son to the family of Mr. and Mrs. John
              Idoko born in Benue state Nigeria. johnsido started singing as a young boy to the
              family and friends. Singing was among his hobbies, and he enjoyed doing it. Johnsido
              is singer, Song writer and entrepreneur who hails from Ogbadibo local government of
              Benue state, Nigeria.
            </p>
            <p className="mb-3">
              Johnsido is a graduate of Business Administration and management from the Benue State
              Polytechnic, Benue State Nigeria and currently doing his PGDE with the National
              Teacher Institute Kaduna.
            </p>
            <p className="mb-3">
              Johnsido is married to his lovely wife Comfort and they are blessed with two
              daughters. Apart from music sido is a teacher, business developer, resource person and
              a good motivator. he spent most of his life in Abuja Nigeria from where he is reaching
              the world with his undeniable greatness wrapped in rich sounds.
            </p>
            <p className="mb-3">
              The gospel singer showed interest in music at the early age and joined the choir
              Saint’s Dominic Catholic Church released his debut single “Indeed it’s God’’ in
              December 2019 which was followed by other great songs like ‘Bigger than the Biggest’,
              ‘Under your Grace’, and more.
            </p>
          </div>
        </div>
        <div>
          <img
            src="https://res.cloudinary.com/my-nigerian-projects/image/upload/v1598529315/Others/john/john_yheyyp.png"
            alt="John's photo"
          />
        </div>
      </div>
    </Page>
  );
}

export default AboutPage;
