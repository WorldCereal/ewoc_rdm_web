import React, { useEffect } from 'react';
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import { LogoutUrl } from '../config';

const Logout = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = LogoutUrl;
    }, 1000);
  });

  return (
    <Main
      meta={
        <Meta
          title="WorldCereal Reference Data Module"
          description="WorldCereal Reference Data Module"
        />
      }
    >
      <div className="lg:relative lg:h-full ">
        <div className="max-w-full w-full pt-16 pb-20 text-center lg:py-48 lg:text-left">
          <div className="px-4 lg:w-1/2 sm:px-8 xl:pr-16 ">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-2xl xl:text-6xl">
              <span className="block xl:inline">Reference Data Module</span>
              <br />
              <span className="block text-yellow-400 xl:inline">
                World Cereal
              </span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
              To generate accurate cropland and crop type maps, high quality
              reference data is indispensable for both training classification
              algorithms and validation of the final products. Therefore,
              WorldCereal would like to engage with major domain players to
              stimulate and facilitate opening and sharing of reference data.
            </p>
            <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-2xl xl:text-6xl">
                <span className="block xl:inline">Logging out...</span>
              </h1>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-auto">
          <img
            className="inset-0 w-full h-full object-cover"
            src="https://esa-worldcereal.org/sites/worldcereal/files/styles/banner_image/public/worldcereal-banner-06.jpg?h=d0cc8fa5&amp;itok=t1-JDjW7"
            alt=""
          />
        </div>
      </div>
    </Main>
  );
};

export default Logout;
