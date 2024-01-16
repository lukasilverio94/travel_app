import { AiOutlineSearch } from "react-icons/ai";

const SearchInput = ({ onChange, value }) => {
  return (
    <div className="w-full max-w-96 relative mt-3 ">
      <div>
        <input
          type="text"
          placeholder="Search post by title or place..."
          className="w-full p-4 rounded-full border-2 border-gray-500 bg-gray-100 dark:bg-transparent dark:border-2 text-gray-800  focus:border-slate-200 dark:text-slate-200"
          onChange={onChange}
          value={value}
        />
        <button className="absolute right-1 top-1/2 -translate-y-1/2 p-4 bg-teal-600 dark:bg-slate-200 rounded-full">
          <AiOutlineSearch className="text-white dark:text-gray-900" />
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
