import {useEffect, useRef, useState} from 'react';
import {pokemonApi} from '../api/PokemonaApi';
import {
  PokemonPaginatedResponse,
  Result,
  SimplePokemon,
} from '../interfaces/pokemonInterfaces';

export const usePokemonSearch = () => {
  const [isFeching, setIsFeching] = useState(true);
  const simplePokemonList = useRef<SimplePokemon[]>([]);
  const loadPokemons = async () => {
    const resp = await pokemonApi.get<PokemonPaginatedResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=1200',
    );

    // Se tranforma la data para poder utilizarla de una forma más simple
    mapPokemonList(resp.data.results);
    setIsFeching(false);
  };

  const mapPokemonList = (pokemonList: Result[]) => {
    const newPokeonList: SimplePokemon[] = pokemonList.map(({name, url}) => {
      const urlParts = url.split('/');
      const id = urlParts[urlParts.length - 2];
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
      return {id, name, picture};
    });
    //para acumular los anteriores y los nuevos
    simplePokemonList.current = newPokeonList;
  };

  useEffect(() => {
    loadPokemons();
  }, []);
  return {
    simplePokemonList,
    isFeching,
  };
};
