import React from 'react';
import {ActivityIndicator, Image, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PokemonCard} from '../components/PokemonCard';
import {usePokemonPaginated} from '../hooks/usePokemonPaginated';
import {appStyle} from '../theme/appTheme';

export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();

  const {simplePokemonList, loadPokemons} = usePokemonPaginated();

  return (
    <>
      <Image
        source={require('../assets/pokebola.png')}
        style={appStyle.pokebolaBG}
      />
      <View style={{alignItems: 'center'}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={simplePokemonList}
          numColumns={2}
          ListHeaderComponent={
            <Text
              style={[
                appStyle.title,
                appStyle.globalMargin,
                {
                  top: top + 20,
                  marginBottom: top + 30,
                },
              ]}>
              Pokedex
            </Text>
          }
          keyExtractor={pokemon => pokemon.id}
          renderItem={({item}) => <PokemonCard pokemon={item} />}
          //Infinite Scroll
          onEndReached={loadPokemons}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            <ActivityIndicator style={{height: 100}} size={20} color="grey" />
          }
        />
      </View>
    </>
  );
};
