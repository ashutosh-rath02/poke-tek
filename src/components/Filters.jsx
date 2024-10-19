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

const generations = [
  { id: 1, range: "1-151" },
  { id: 2, range: "152-251" },
  { id: 3, range: "252-386" },
  { id: 4, range: "387-493" },
  { id: 5, range: "494-649" },
  { id: 6, range: "650-721" },
  { id: 7, range: "722-809" },
  { id: 8, range: "810-898" },
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
    <div className="relative z-10">
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
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
            <label className="block mb-2 text-sm font-medium">Generation</label>
            <select
              onChange={(e) => handleFilterChange("generation", e.target.value)}
              value={filters.generation || ""}
              className="w-full p-2 border rounded text-sm"
            >
              <option value="">All Generations</option>
              {generations.map((gen) => (
                <option key={gen.id} value={gen.id}>
                  Gen {gen.id} ({gen.range})
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
