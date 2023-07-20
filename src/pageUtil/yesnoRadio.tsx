/* This example requires Tailwind CSS v2.0+ */
import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { classNames } from '../utils/Helper';

const yes = 'Yes';
const options = [
  {
    name: yes,
  },
  {
    name: 'No',
  },
];

export default function YesNoRadio(props: {
  index: number;
  handleSelection: (yes: boolean, index: number) => void;
}) {
  const [selected, setSelected] = useState('');

  function getCss(plan: { name: string }) {
    return plan.name === yes ? 'bg-green-200' : 'bg-red-200';
  }

  return (
    <RadioGroup
      value={selected}
      onChange={(data) => {
        setSelected(data);
        props.handleSelection(
          (data as unknown as { name: '' }) === options[0],
          props.index
        );
      }}
    >
      <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
      <div className="space-x-4 grid grid-cols-2 pt-2 ">
        {options.map((plan) => (
          <RadioGroup.Option
            key={plan.name}
            value={plan}
            className={({ active }) =>
              classNames(
                active ? 'text-gray-800' : '',
                'relative block rounded-lg border border-gray-300 min-w-full bg-white shadow-sm px-6 py-4 cursor-pointer hover:border-gray-400 sm:flex sm:justify-between focus:outline-none'
              )
            }
          >
            {({ checked }) => (
              <>
                <div className="flex items-center">
                  <div className="text-sm">
                    <RadioGroup.Label
                      as="p"
                      className={classNames(
                        checked ? getCss(plan) : 'border-transparent',
                        'absolute -inset-px rounded-lg px-3 py-1 text-center pointer-events-none'
                      )}
                    >
                      {plan.name}
                    </RadioGroup.Label>
                  </div>
                </div>
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}
