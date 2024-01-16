import React from "react";

const SearchForm = ({ query, handleInputChange, handleSearchClick }) => {
  return (
    <div className="mb-8 p-4 bg-teal-600 text-white rounded shadow-md py-8">
      <h3 className="my-2 mb-3 text-2xl ">What are you looking around you?</h3>
      <input
        type="text"
        placeholder="Look for hotels, restaurants, bars..."
        value={query}
        onChange={handleInputChange}
        className="w-full px-3 py-2 mb-2 leading-tight text-white bg-teal-700 rounded shadow appearance-none focus:outline-none focus:bg-teal-800"
      />
      <button
        className="w-full px-4 py-2 text-white bg-teal-500 rounded hover:bg-teal-400 focus:outline-none focus:bg-teal-400"
        onClick={handleSearchClick}
      >
        Search
      </button>
    </div>
  );
};

export default SearchForm;
