/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (debouncedSearchTerm) {
      onSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onSearch]);

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-full focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-600"
      />
    </div>
  );
};

export default SearchBar;
