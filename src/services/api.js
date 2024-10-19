import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2";

export const getPokemonList = async (limit = 20, offset = 0) => {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon`, {
      params: { limit, offset },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokemon list:", error);
    throw error;
  }
};

export const getPokemonDetails = async (nameOrId) => {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon/${nameOrId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for Pokemon ${nameOrId}:`, error);
    throw error;
  }
};

export const searchPokemon = async (query) => {
  try {
    const directResult = await getPokemonDetails(query.toLowerCase());
    return [directResult];
  } catch (error) {
    console.error("Error fetching Pokemon directly:", error);
    try {
      const allPokemon = await getPokemonList(1000, 0);
      const matchingPokemon = allPokemon.results.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
      const detailedResults = await Promise.all(
        matchingPokemon.map((p) => getPokemonDetails(p.name))
      );
      return detailedResults;
    } catch (searchError) {
      console.error("Error searching for Pokemon:", searchError);
      throw searchError;
    }
  }
};
