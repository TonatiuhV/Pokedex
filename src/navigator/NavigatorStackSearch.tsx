import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {PokemonScreen} from '../screens/PokemonScreen';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';
import {SearchScreen} from '../screens/SearchScreen';

export type RootStackParams = {
  SearchScreen: undefined;
  PokemonScreen: {simplePokemon: SimplePokemon; color: string};
};

const Stack = createStackNavigator<RootStackParams>();

export const NavigatorStackSearch = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="PokemonScreen" component={PokemonScreen} />
    </Stack.Navigator>
  );
};
