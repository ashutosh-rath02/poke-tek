/* eslint-disable react/prop-types */
import { useState } from "react";
import { motion } from "framer-motion";

const pokemonTypes = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

const sizeCategories = ["Tiny", "Small", "Medium", "Large", "Extra Large"];

const Filters = ({ onFilterChange }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({});

  const handleFilterChange = (filterName, value) => {
    const newFilters = { ...filters, [filterName]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="relative z-9">
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="px-4 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
      >
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 mt-2 p-4 bg-white rounded-lg shadow-lg z-20 w-64"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}
        >
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Type</label>
            <select
              onChange={(e) => handleFilterChange("type", e.target.value)}
              value={filters.type || ""}
              className="w-full p-2 border rounded text-sm"
            >
              <option value="">All Types</option>
              {pokemonTypes.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Size</label>
            <select
              onChange={(e) => handleFilterChange("size", e.target.value)}
              value={filters.size || ""}
              className="w-full p-2 border rounded text-sm"
            >
              <option value="">All Sizes</option>
              {sizeCategories.map((size) => (
                <option key={size} value={size.toLowerCase()}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Ability</label>
            <input
              type="text"
              placeholder="Enter ability name"
              value={filters.ability || ""}
              onChange={(e) => handleFilterChange("ability", e.target.value)}
              className="w-full p-2 border rounded text-sm"
            />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Filters;
