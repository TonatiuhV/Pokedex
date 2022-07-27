import React from 'react';
import {Text, View, FlatList, Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Loading} from '../components/Loading';
import {PokemonCard} from '../components/PokemonCard';
import {SearchInput} from '../components/SearchInput';
import {usePokemonSearch} from '../hooks/usePokemonSearch';
import {appStyle} from '../theme/appTheme';

export const SearchScreen = () => {
  const {top} = useSafeAreaInsets();

  const {isFeching, simplePokemonList} = usePokemonSearch();

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
        style={{
          position: 'absolute',
          zIndex: 999,
          width: '100%',
          top: Platform.OS === 'android' ? top + 15 : top,
        }}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={simplePokemonList}
        numColumns={2}
        ListHeaderComponent={
          <Text
            style={[
              appStyle.title,
              appStyle.globalMargin,
              {paddingBottom: 10, marginTop: top + 60},
            ]}>
            Pokedex
          </Text>
        }
        keyExtractor={pokemon => pokemon.id}
        renderItem={({item}) => <PokemonCard pokemon={item} />}
      />
    </View>
  );
};
