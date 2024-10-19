import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FusionDetailsModal from "./FusionDetailsModal";

const FusionSidebar = ({
  selectedPokemon,
  onFuse,
  onClear,
  fusionResult,
  onClose,
  isLoading,
}) => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const sidebarVariants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  return (
    <>
      <motion.div
        className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg p-6 overflow-y-auto"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={sidebarVariants}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-indigo-800">Fusion Lab</h2>
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
        <div className="space-y-4">
          {selectedPokemon.map((pokemon, index) => (
            <motion.div
              key={index}
              className="bg-indigo-100 rounded-lg p-4 flex items-center space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="w-20 h-20"
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
          ))}
        </div>
        {selectedPokemon.length === 2 && (
          <motion.button
            onClick={onFuse}
            className="w-full mt-6 px-4 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors font-semibold text-lg shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
          >
            {isLoading ? "Fusing..." : "Fuse Pokémon"}
          </motion.button>
        )}
        {selectedPokemon.length > 0 && (
          <motion.button
            onClick={onClear}
            className="w-full mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Clear Selection
          </motion.button>
        )}
        {fusionResult && (
          <motion.div
            className="mt-8 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg p-6 shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-indigo-800">
              Fusion Result
            </h3>
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={fusionResult.sprite}
                alt={fusionResult.name}
                className="w-24 h-24 bg-white rounded-full shadow-md"
              />
              <div>
                <p className="text-lg font-semibold capitalize text-indigo-800">
                  {fusionResult.name}
                </p>
                <div className="flex flex-wrap mt-2">
                  {fusionResult.types.map((type, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-indigo-200 rounded-full text-xs capitalize text-indigo-800 mr-1 mb-1"
                    >
                      {type.type ? type.type.name : type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-indigo-800">Abilities:</h4>
              <ul className="list-disc list-inside text-indigo-700">
                {fusionResult.abilities.map((ability, index) => (
                  <li key={index} className="capitalize">
                    {ability}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-indigo-800">Height:</p>
                <p className="text-indigo-700">{fusionResult.height} m</p>
              </div>
              <div>
                <p className="font-semibold text-indigo-800">Weight:</p>
                <p className="text-indigo-700">{fusionResult.weight} kg</p>
              </div>
            </div>
            <motion.button
              onClick={() => setShowDetailsModal(true)}
              className="w-full mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors font-semibold shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              More Details
            </motion.button>
          </motion.div>
        )}
      </motion.div>
      <AnimatePresence>
        {showDetailsModal && (
          <FusionDetailsModal
            fusionResult={fusionResult}
            onClose={() => setShowDetailsModal(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default FusionSidebar;
