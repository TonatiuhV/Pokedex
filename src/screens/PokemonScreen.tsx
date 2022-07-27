import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';

import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigator/NavigatorStack';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FadeInImage} from '../components/FadeInImage';
import {usePokemon} from '../hooks/usePokemon';
import {PokemonDetails} from '../components/PokemonDetails';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

export const PokemonScreen = ({route, navigation}: Props) => {
  const {simplePokemon, color} = route.params;
  const {id, name} = simplePokemon;
  //Cambia la imagen principal por el sprite
  const [picture, setPicture] = useState(simplePokemon.picture);
  const {top} = useSafeAreaInsets();
  const {isLoading, pokemon} = usePokemon(id);

  return (
    <View style={{flex: 1}}>
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
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.imageButton}
          onPress={() => setPicture(simplePokemon.picture)}>
          <FadeInImage uri={picture} style={styles.pokemonImage} />
        </TouchableOpacity>
      </View>

      {/* Details Pokemon */}
      {isLoading ? (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator color={color} size={50} />
        </View>
      ) : (
        <PokemonDetails
          pokemon={pokemon}
          onChangePicture={uri => setPicture(uri)}
        />
      )}
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
  imageButton: {
    position: 'absolute',
    bottom: -15,
  },
  pokemonImage: {
    width: 250,
    height: 250,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
