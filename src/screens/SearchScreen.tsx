import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Loading} from '../components/Loading';
import {PokemonCard} from '../components/PokemonCard';
import {SearchInput} from '../components/SearchInput';
import {usePokemonSearch} from '../hooks/usePokemonSearch';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';
import {appStyle} from '../theme/appTheme';

const numberPattern = /[0-9]+$/;
export const SearchScreen = () => {
  const {top} = useSafeAreaInsets();

  const {isFeching, simplePokemonList} = usePokemonSearch();

  const [term, setTerm] = useState('');

  const [pokemonsFitered, setPokemonsFitered] = useState<SimplePokemon[]>([]);

  useEffect(() => {
    if (term.length === 0) {
      return setPokemonsFitered([]);
    }

    if (numberPattern.test(term)) {
      const pokemonById = simplePokemonList.current.find(
        poke => poke.id == term,
      );
      setPokemonsFitered(pokemonById !== undefined ? [pokemonById] : []);
    } else {
      setPokemonsFitered(
        simplePokemonList.current.filter(poke => {
          return poke.name.toLowerCase().includes(term.toLowerCase());
        }),
      );
    }
  }, [term]);

  if (isFeching) {
    return <Loading />;
  }

  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 20,
      }}>
      <SearchInput
        onDebounce={setTerm}
        style={{
          position: 'absolute',
          zIndex: 999,
          width: '100%',
          top: Platform.OS === 'android' ? top + 15 : top,
        }}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={pokemonsFitered}
        numColumns={2}
        ListHeaderComponent={
          <Text
            style={[
              appStyle.title,
              appStyle.globalMargin,
              {paddingBottom: 10, marginTop: top + 60},
            ]}>
            {term}
          </Text>
        }
        keyExtractor={pokemon => pokemon.id}
        renderItem={({item}) => <PokemonCard pokemon={item} />}
      />
    </View>
  );
};
