/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

const PokemonInfoSidebar = ({ pokemon, onClose }) => {
  if (!pokemon) return null;

  const sidebarVariants = {
    hidden: { x: "-100%" },
    visible: {
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  return (
    <motion.div
      className="fixed left-0 top-0 h-full w-80 bg-white shadow-lg p-6 overflow-y-auto z-1000"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={sidebarVariants}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-800">Pokémon Info</h2>
        <motion.button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </motion.button>
      </div>
      <motion.div
        className="bg-indigo-100 rounded-lg p-4 flex items-center space-x-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-24 h-24 bg-white rounded-full shadow-md"
        />
        <div>
          <p className="text-lg font-semibold capitalize text-indigo-800">
            {pokemon.name}
          </p>
          <div className="flex flex-wrap mt-2">
            {pokemon.types.map((type, typeIndex) => (
              <span
                key={typeIndex}
                className="px-2 py-1 bg-indigo-200 rounded-full text-xs capitalize text-indigo-800 mr-1 mb-1"
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
      <motion.div
        className="mt-6 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg p-6 shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="space-y-2 mb-4">
          <h4 className="font-semibold text-indigo-800">Abilities:</h4>
          <ul className="list-disc list-inside text-indigo-700">
            {pokemon.abilities.map((ability, index) => (
              <li key={index} className="capitalize">
                {ability.ability.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-2 mb-4">
          <h4 className="font-semibold text-indigo-800">Stats:</h4>
          {pokemon.stats.map((stat, index) => (
            <div key={index} className="flex justify-between text-indigo-700">
              <span className="capitalize">{stat.stat.name}:</span>
              <span>{stat.base_stat}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold text-indigo-800">Height:</p>
            <p className="text-indigo-700">{pokemon.height / 10} m</p>
          </div>
          <div>
            <p className="font-semibold text-indigo-800">Weight:</p>
            <p className="text-indigo-700">{pokemon.weight / 10} kg</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PokemonInfoSidebar;
