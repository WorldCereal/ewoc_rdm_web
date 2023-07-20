import Link from 'next/link';
import React from 'react';
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';

const Index = () => {
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
        <div className="bg-gray-100 w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-auto">
          <img
            className="inset-0 w-full h-full object-cover"
            src="https://esa-worldcereal.org/sites/worldcereal/files/styles/banner_image/public/worldcereal-banner-06.jpg?h=d0cc8fa5&amp;itok=t1-JDjW7"
            alt=""
          />
        </div>
        <div className="max-w-full w-full pt-16 pb-20 text-center lg:py-28 lg:text-left">
          <div className="px-4 lg:w-1/2 sm:px-8 xl:pr-16 ">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-700 sm:text-5xl md:text-6xl lg:text-2xl xl:text-5xl">
              <span className="block text-yellow-400 xl:inline">
                <a
                  className="block text-yellow-400 xl:inline"
                  href="https://esa-worldcereal.org/en"
                >
                  World Cereal
                </a>
              </span>
            </h1>
            <span className=" text-xl tracking-tight font-extrabold block text-yellow-400 xl:inline">
              <a
                className="block text-yellow-400 xl:inline"
                href="https://esa-worldcereal.org/en/about/objectives"
              >
                Project Objectives
              </a>
            </span>
            <ol className="list-disc text-gray-600 text-lg sm:px-8 px-4 sm:py-4 py-2 font-medium">
              <li>
                Demonstrate feasibility of global open-source and transparant
                crop mapping at field scale based on open EO datasets
              </li>
              <li>
                Use existing cloud data providers, cloud computing capabilities
                and ICT infrastructure
              </li>
              <li>
                Interact and collaborate with the global agricultural user
                community
              </li>
              <li>
                Collaborate with local and global experts in the field to
                demonstrate WorldCereal{' '}
              </li>
            </ol>
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-700 sm:text-5xl md:text-6xl lg:text-2xl xl:text-5xl">
              <span className="block xl:inline">Reference Data Module</span>
              <br />
            </h1>
            <p className="mt-3 max-w-md mx-auto text-lg text-gray-600 sm:text-xl md:mt-5 md:max-w-4xl">
              To generate accurate cropland and crop type maps, high quality
              reference data is indispensable for both training classification
              algorithms and validation of the final products. Therefore,
              WorldCereal would like to engage with global agricultural
              community to stimulate and facilitate opening and sharing of
              reference data.
            </p>
            <p className="mt-3 max-w-md mx-auto text-lg text-gray-600 sm:text-xl md:mt-5 md:max-w-4xl">
              Here is a short introduction of the module{' '}
              <a href="https://www.youtube.com/watch?v=sf8MK04MRN0">
                WorldCereal UI quick tutorial
              </a>
            </p>
            <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <Link href="/map">
                  <a className="w-full flex items-center justify-center px-8 py-3 border-2 border-yellow-300 text-base font-medium rounded-md text-white bg-yellow-500 hover:border-yellow-500 md:py-4 md:text-lg md:px-10">
                    Explore
                  </a>
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link href="/create">
                  <a className="w-full flex items-center justify-center px-8 py-3 border-2 border-transparent text-base font-medium rounded-md text-yellow-600 bg-white hover:border-yellow-600 hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                    Contribute
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Index;
