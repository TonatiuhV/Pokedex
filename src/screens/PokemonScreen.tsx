import React, {useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigator/NavigatorStack';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FadeInImage} from '../components/FadeInImage';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

export const PokemonScreen = ({route, navigation}: Props) => {
  const {simplePokemon, color} = route.params;
  const {id, name, picture} = simplePokemon;
  const {top} = useSafeAreaInsets();
  return (
    <View>
      {/* Header Container */}
      <View style={[styles.headerContainer, {backgroundColor: color}]}>
        {/* Back button */}
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={[styles.backButton, {top: top + 5}]}
          activeOpacity={0.6}>
          <Icon name="arrow-back-outline" color="white" size={35} />
        </TouchableOpacity>
        {/* Nombre del Pokemon */}
        <Text style={[styles.pokemonName, {top: top + 40}]}>
          {name + '\n#' + id}
        </Text>
        {/* Pokebola Blanca */}
        <Image
          source={require('../assets/pokebola-blanca.png')}
          style={styles.pokeball}
        />
        <FadeInImage uri={picture} style={styles.pokemonImage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20,
  },
  pokeball: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.7,
  },
  pokemonImage: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -15,
  },
});
