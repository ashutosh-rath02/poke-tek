/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

const PokemonCard = ({ pokemon, onSelect, isSelected, onInfoClick }) => {
  return (
    <div
      className={`bg-white w-60 p-4 rounded-lg shadow-md cursor-pointer relative overflow-visible
        ${
          isSelected
            ? "ring-4 ring-indigo-500"
            : "hover:ring-2 hover:ring-indigo-300"
        }`}
      onClick={() => onSelect(pokemon)}
    >
      <div className="relative">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-32 h-32 mx-auto"
        />
        <h3 className="text-center font-semibold mt-2 capitalize">
          {pokemon.name}
        </h3>
        <div className="flex justify-center mt-2 flex-wrap">
          {pokemon.types.map((type) => (
            <span
              key={type.type.name}
              className="px-2 py-1 bg-gray-200 rounded-full text-xs mr-1 mb-1 capitalize"
            >
              {type.type.name}
            </span>
          ))}
        </div>
      </div>
      <motion.button
        className="absolute -top-3 -right-3 bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg"
        whileHover={{ scale: 1.1, backgroundColor: "#4338ca" }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => {
          e.stopPropagation();
          onInfoClick(pokemon);
        }}
      >
        i
      </motion.button>
    </div>
  );
};

export default PokemonCard;
