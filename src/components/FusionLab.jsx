import { useState } from "react";
import PokemonList from "./PokemonList";
import { motion, AnimatePresence } from "framer-motion";
import FusionSidebar from "./FusionSidebar";

const FusionLab = () => {
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const [fusionResult, setFusionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  const handlePokemonSelect = (pokemon) => {
    if (
      selectedPokemon.length < 2 &&
      !selectedPokemon.some((p) => p.name === pokemon.name)
    ) {
      setSelectedPokemon([...selectedPokemon, pokemon]);
      setShowSidebar(true);
    } else if (selectedPokemon.some((p) => p.name === pokemon.name)) {
      setSelectedPokemon(
        selectedPokemon.filter((p) => p.name !== pokemon.name)
      );
    }
    setFusionResult(null);
  };

  const performFusion = () => {
    if (selectedPokemon.length !== 2) return;

    setIsLoading(true);
    setError(null);

    try {
      const [pokemon1, pokemon2] = selectedPokemon;

      // Fusion algorithm
      const fusedPokemon = {
        name: `${pokemon1.name.slice(
          0,
          Math.ceil(pokemon1.name.length / 2)
        )}${pokemon2.name.slice(Math.floor(pokemon2.name.length / 2))}`,
        types: [...new Set([...pokemon1.types, ...pokemon2.types])].slice(0, 2),
        stats: pokemon1.stats.map((stat, index) => ({
          ...stat,
          base_stat: Math.floor(
            (stat.base_stat + pokemon2.stats[index].base_stat) * 1.1
          ),
        })),
        abilities: [
          ...new Set([
            ...pokemon1.abilities.map((a) => a.ability.name),
            ...pokemon2.abilities.map((a) => a.ability.name),
          ]),
        ].slice(0, 3),
        height: Math.round(((pokemon1.height + pokemon2.height) / 2) * 10) / 10,
        weight: Math.round(((pokemon1.weight + pokemon2.weight) / 2) * 10) / 10,
        sprite: pokemon1.sprites.front_default,
      };

      setFusionResult(fusedPokemon);
    } catch (err) {
      setError("Failed to fuse Pokémon. Please try again.", err);
    }

    setIsLoading(false);
  };

  const handleClearSelection = () => {
    setSelectedPokemon([]);
    setFusionResult(null);
  };

  const handleCloseSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="flex-grow p-4 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-indigo-800">
            Select Pokémon to Fuse
          </h2>
          <PokemonList
            onPokemonSelect={handlePokemonSelect}
            selectedPokemon={selectedPokemon}
          />
        </motion.div>
        {error && (
          <motion.p
            className="text-center text-red-500 mt-4 p-2 bg-red-100 rounded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.p>
        )}
      </div>
      <AnimatePresence>
        {showSidebar && (
          <FusionSidebar
            selectedPokemon={selectedPokemon}
            onFuse={performFusion}
            onClear={handleClearSelection}
            fusionResult={fusionResult}
            onClose={handleCloseSidebar}
            isLoading={isLoading}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default FusionLab;
