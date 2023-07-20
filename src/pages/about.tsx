import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';

const About = () => (
  <Main
    meta={
      <Meta
        title="WorldCereal Reference Data Module"
        description="WorldCereal Reference Data Module"
      />
    }
  >
    <div className="relative pt-16 bg-white">
      <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-auto lg:w-full">
        <div
          className="relative text-lg max-w-prose mx-auto"
          aria-hidden="true"
        >
          <svg
            className="absolute top-12 left-full transform translate-x-32"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={384}
              fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)"
            />
          </svg>
          <svg
            className="absolute top-1/2 right-full transform -translate-y-1/2 -translate-x-32"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={384}
              fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
            />
          </svg>
          <svg
            className="absolute bottom-12 left-full transform translate-x-32"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="d3eb07ae-5182-43e6-857d-35c643af9034"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={384}
              fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)"
            />
          </svg>
        </div>
      </div>
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="text-lg max-w-prose mx-auto">
          <h1>
            <span className="block text-base text-center text-blue-600 font-semibold tracking-wide uppercase">
              About
            </span>
            <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Reference Data Module
            </span>
          </h1>
          <p className="mt-8 text-xl text-gray-500 leading-8">
            The WorldCereal Reference Data Module (RDM) is a outcome of
            collaborative approach to build a reference data store on label data
            which can be used for crop and irrigation related model training and
            validation. The products generated support worldwide crop
            monitoring. In the RDM we have two types of data storage:
          </p>
          <ol className="list-disc text-xl text-gray-500 leading-8 px-6 py-4">
            <li>Consortium data store</li>
            <li>Community data store</li>
          </ol>
          <p className="text-xl text-gray-500 leading-8">
            Data sets in both data stores can be set to be publicly available or
            private. Data sets that are inside the consortium data storage have
            been collected, harmonized, and maintained by expert moderators
            (project partners) and have been made available to the public
            according their governing data licenses. Private datasets in
            consortium datastore will be available only for products generation.
          </p>
          <figure className="py-4">
            <img
              className="w-full rounded-lg"
              src="https://esa-worldcereal.org/sites/worldcereal/files/styles/colorbox_teaser_600_/public/WorldCereal_ConceptFIG_V2_2_website.jpg_0.png?itok=UWywTcKK"
              alt=""
              width={1310}
              height={873}
            />
            <figcaption className=" ml-24 text-xl text-center text-gray-500 leading-8">
              Overview of Worldcereal System.
            </figcaption>
          </figure>
          <p className="text-xl text-gray-500 leading-8 pt-4">
            The Data sets that are in the Community data storage are harmonized
            and uploaded by Community users. The uploaded data sets can be made
            public with appropriate licenses and will be reviewed by moderators
            before being published. Private user data sets will be available
            only for the owner of such data sets and will not be shared for use
            by other users or consortium for product generation until the owner
            decides to make the data public. The owner decides who will be
            allowed to use data and under what restrictions. User can choose
            from below license types.
          </p>
          <div className="py-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    License types*
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Remarks
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr key="about1">
                  <td className="px-6 py-2 whitespace-nowrap text-medium font-medium text-gray-700">
                    <a href="https://creativecommons.org/publicdomain/zero/1.0/">
                      CC0
                    </a>
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap text-medium text-gray-500">
                    No Rights Reserved
                  </td>
                </tr>
                <tr key="about2">
                  <td className="px-6 py-2 whitespace-nowrap text-medium font-medium text-gray-700">
                    <a href="https://creativecommons.org/licenses/by/4.0/">
                      CC BY
                    </a>
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap text-medium text-gray-500">
                    Attribution
                  </td>
                </tr>
                <tr key="about3">
                  <td className="px-6 py-2 whitespace-nowrap text-medium font-medium text-gray-700">
                    <a href="https://creativecommons.org/licenses/by-sa/4.0/">
                      CC BY-SA
                    </a>
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap text-medium text-gray-500">
                    Attribution-ShareAlike
                  </td>
                </tr>
                <tr key="about4">
                  <td className="px-6 py-2 whitespace-nowrap text-medium font-medium text-gray-700">
                    <a href="https://creativecommons.org/licenses/by-nc/4.0/">
                      CC BY-NC
                    </a>
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap text-medium text-gray-500">
                    Attribution-NonCommercial
                  </td>
                </tr>
                <tr key="about5">
                  <td className="px-6 py-2 whitespace-nowrap text-medium font-medium text-gray-700">
                    <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
                      CC BY-NC-SA
                    </a>
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap text-medium text-gray-500">
                    Attribution-NonCommercial-ShareAlike
                  </td>
                </tr>
                <tr key="about6">
                  <td className="px-6 py-2 whitespace-nowrap text-medium font-medium text-gray-700">
                    Private
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap text-medium text-gray-500">
                    Only accessible for the owner
                  </td>
                </tr>
                <tr key="about7">
                  <td className="px-6 py-2 whitespace-nowrap text-medium font-medium text-gray-700">
                    Other
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap text-medium text-gray-500">
                    To be defined by the owner
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="text-sm text-gray-500 ">
              * See{' '}
              <a href="https://creativecommons.org/about/cclicenses/">
                Creative Commons licenses
              </a>
            </p>
          </div>
          <p className="text-xl text-gray-500 leading-8 pt-4">
            The data sets stored can be used during model training. By default,
            all the public data sets are available to generate WorldCereal
            products. In addition, private data sets are also available for the
            owner&apos;s products. More information on WorldCereal products and
            model training can be found{' '}
            <a href="https://esa-worldcereal.org/en/about-worldcereal">here</a>.
          </p>
          <p className="text-xl text-gray-500 leading-8 pt-4">
            The Reference data module is built and maintained by The{' '}
            <a href="https://iiasa.ac.at/">
              International Institute for Applied Systems Analysis (IIASA)
            </a>{' '}
            and{' '}
            <a href="https://www.wur.nl/en/wageningen-university.htm">
              Wageningen Environmental Sciences Group (WENR)
            </a>
            . For further queries and questions please send an email to{' '}
            <a href="mailto:moderator@worldcereal.com">
              moderator-worldcereal@iiasa.ac.at
            </a>
            .
          </p>
          <p className="text-xl text-gray-500 leading-8 pt-4">More details</p>
          <ol className="list-disc text-xl text-gray-500 leading-8 px-6 pb-4">
            <li>
              <a href="https://esa-worldcereal.org/en/about-worldcereal">
                Project
              </a>
            </li>
            <li>
              <a href="https://esa-worldcereal.org/en/situ-data-global-crop-mapping">
                In-situ Data For Global Crop Mapping
              </a>
            </li>
            <li>
              <a href="https://esa-worldcereal.org/en/about/data-collection">
                Data Collection
              </a>
            </li>
            <li>
              <a href="https://esa-worldcereal.org/en/about/objectives">
                Objective
              </a>
            </li>
            <li>
              <a href="https://esa-worldcereal.org/en/about/team">Team</a>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </Main>
);

export default About;
