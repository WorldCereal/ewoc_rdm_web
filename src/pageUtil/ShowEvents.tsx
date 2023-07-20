import { DatasetEvent } from '../models/UserDatasetModels';
import { wordToSentence } from '../utils/Helper';
import React from 'react';

export function ShowEvents(events: DatasetEvent[]) {
  return (
    <div className="pt-5 mt-5 border-t-2 border-gray-200">
      {events !== undefined && events.length > 0 ? (
        <h3 className="text-lg leading-6 font-medium text-blue-700">
          Dataset Events
        </h3>
      ) : null}
      {events !== undefined &&
        events.map((value) => (
          <div key={value.creationTime} className="pt-3 px-3">
            <h4 className="leading-6 font-medium text-blue-700">
              {wordToSentence(value.type.toString())} - {value.creationTime}
            </h4>
            {value.comments.map((c) => (
              <p
                key={value.creationTime + c}
                className="mt-1 text-sm text-gray-500"
              >
                {c}
              </p>
            ))}
          </div>
        ))}
    </div>
  );
}
