import React from "react";

const VenueList = ({ venues }) => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <h4 className="text-3xl  text-secondary mb-6">Search Results:</h4>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {venues.map((venue) => (
          <li
            key={venue.fsq_id}
            className="bg-white rounded-lg overflow-hidden shadow-md"
          >
            <div className="p-6">
              <h4 className="text-xl text-teal-700 font-semibold mb-3">
                {venue.name}
              </h4>
              <div>
                {venue.location && venue.location.formatted_address ? (
                  <p className="text-gray-700">
                    <span className="font-semibold text-primary block">
                      Address:
                    </span>
                    {venue.location.formatted_address}
                  </p>
                ) : (
                  <p className="text-red-500">Address not available</p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VenueList;
