import { Popover, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { InformationCircleIcon } from '@heroicons/react/outline';

interface IInfoIconProps {
  name: String;
  description: String;
}

export default function InfoIcon(props: IInfoIconProps) {
  return (
    <div className=" px-1">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? '' : 'text-opacity-90'}
                text-white group bg-orange-700 rounded-md inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <InformationCircleIcon className="h-6 w-6 text-blue-400 hover:text-blue-600" />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-sm px-10 mt-1 transform  sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative bg-white p-3 ">
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">
                        {props.name}
                      </p>
                      <p className="text-sm text-gray-500 ">
                        {props.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
