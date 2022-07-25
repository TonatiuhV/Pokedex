import React from 'react';
import {Image, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {usePokemonPaginated} from '../hooks/usePokemonPaginated';
import {appStyle} from '../theme/appTheme';

export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();

  usePokemonPaginated();

  return (
    <>
      <Image
        source={require('../assets/pokebola.png')}
        style={appStyle.pokebolaBG}
      />
      <Text style={[appStyle.title, appStyle.globalMargin, {top: top + 20}]}>
        Pokedex
      </Text>
    </>
  );
};
