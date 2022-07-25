import {useEffect, useRef, useState} from 'react';
import {pokemonApi} from '../api/PokemonaApi';
import {
  PokemonPaginatedResponse,
  Result,
  SimplePokemon,
} from '../interfaces/pokemonInterfaces';

export const usePokemonPaginated = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>(
    [],
  );
  const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40');
  const loadPokemons = async () => {
    setIsLoading(true);
    const resp = await pokemonApi.get<PokemonPaginatedResponse>(
      nextPageUrl.current,
    );

    nextPageUrl.current = resp.data.next;
    // Se tranforma la data para poder utilizarla de una forma más simple
    mapPokemonList(resp.data.results);
    setIsLoading(false);
  };

  const mapPokemonList = (pokemonList: Result[]) => {
    const newPokeonList: SimplePokemon[] = pokemonList.map(({name, url}) => {
      const urlParts = url.split('/');
      const id = urlParts[urlParts.length - 2];
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
      return {id, name, picture};
    });
    //para acumular los anteriores y los nuevos
    setSimplePokemonList(simplePokemonList.concat(newPokeonList));
  };

  useEffect(() => {
    loadPokemons();
  }, []);
};
