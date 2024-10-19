/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import {
  getPokemonList,
  getPokemonDetails,
  searchPokemon,
} from "../services/api";
import PokemonCard from "./PokemonCard";
import PokemonInfoSidebar from "./PokemonInfoSidebar";
import LoadingSpinner from "./LoadingSpinner";
import { AnimatePresence } from "framer-motion";
import Filters from "./Filters";

const PokemonList = ({ onPokemonSelect, selectedPokemon }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [offset, setOffset] = useState(0);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [filters, setFilters] = useState({});
  const limit = 20;

  const applyFilters = useCallback(
    (pokemon) => {
      if (Object.keys(filters).length === 0) return true;

      const { type, generation, size, ability } = filters;

      if (type && !pokemon.types.some((t) => t.type.name === type))
        return false;

      if (generation) {
        const genRanges = {
          1: [1, 151],
          2: [152, 251],
          3: [252, 386],
          4: [387, 493],
          5: [494, 649],
          6: [650, 721],
          7: [722, 809],
          8: [810, 898],
        };
        const [min, max] = genRanges[generation];
        if (pokemon.id < min || pokemon.id > max) return false;
      }

      if (size) {
        const sizeRanges = {
          tiny: [0, 1],
          small: [1, 1.5],
          medium: [1.5, 2],
          large: [2, 3],
          "extra large": [3, Infinity],
        };
        const [min, max] = sizeRanges[size];
        if (pokemon.height / 10 < min || pokemon.height / 10 >= max)
          return false;
      }

      if (
        ability &&
        !pokemon.abilities.some((a) =>
          a.ability.name.toLowerCase().includes(ability.toLowerCase())
        )
      )
        return false;

      return true;
    },
    [filters]
  );

  const fetchPokemonList = useCallback(async () => {
    if (isSearching) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await getPokemonList(limit, offset);
      const newPokemon = await Promise.all(
        data.results.map((pokemon) => getPokemonDetails(pokemon.name))
      );
      setPokemonList((prevList) => {
        const newList = [...prevList, ...newPokemon];
        return newList.filter(
          (pokemon, index, self) =>
            index === self.findIndex((t) => t.name === pokemon.name)
        );
      });
    } catch (err) {
      setError("Failed to fetch Pokémon list. Please try again.");
    }
    setIsLoading(false);
  }, [offset, isSearching]);

  useEffect(() => {
    if (!isSearching) {
      fetchPokemonList();
    }
  }, [fetchPokemonList, isSearching]);

  useEffect(() => {
    setFilteredPokemonList(pokemonList.filter(applyFilters));
  }, [pokemonList, applyFilters]);

  const handleSearch = useCallback(async (term) => {
    setSearchTerm(term);
    if (term.trim() === "") {
      setIsSearching(false);
      setPokemonList([]);
      setOffset(0);
      return;
    }

    setIsSearching(true);
    setIsLoading(true);
    setError(null);

    try {
      const results = await searchPokemon(term);
      setPokemonList(results);
    } catch (err) {
      setError("Error searching for Pokémon. Please try again.");
      setPokemonList([]);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch(searchTerm);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, handleSearch]);

  const loadMore = () => {
    if (!isSearching) {
      setOffset((prevOffset) => prevOffset + limit);
    }
  };

  const handleInfoClick = (pokemon) => {
    setSelectedInfo(pokemon);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div
      className={`transition-all duration-300 ${selectedInfo ? "ml-80" : ""}`}
    >
      <div className="mb-6 flex items-start space-x-4">
        <div className="flex-grow">
          <input
            type="text"
            placeholder="Search Pokémon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <Filters onFilterChange={handleFilterChange} />
      </div>
      {error && <p className="text-center text-red-500 mb-4">{error}</p>}
      <div className="flex flex-row flex-wrap mx-auto gap-4">
        {filteredPokemonList.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            pokemon={pokemon}
            onSelect={onPokemonSelect}
            isSelected={selectedPokemon.some((p) => p.name === pokemon.name)}
            onInfoClick={handleInfoClick}
          />
        ))}
      </div>
      {isLoading && <LoadingSpinner />}
      {!isLoading && !isSearching && filteredPokemonList.length > 0 && (
        <button
          className="mt-8 px-6 py-3 bg-indigo-500 text-white rounded-lg mx-auto block font-semibold shadow-md hover:bg-indigo-600 transition-colors"
          onClick={loadMore}
        >
          Load More Pokémon
        </button>
      )}
      <AnimatePresence>
        {selectedInfo && (
          <PokemonInfoSidebar
            pokemon={selectedInfo}
            onClose={() => setSelectedInfo(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PokemonList;
