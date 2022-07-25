import React, {useEffect, useRef, useState} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';

import ImageColors from 'react-native-image-colors';

import {SimplePokemon} from '../interfaces/pokemonInterfaces';
import {FadeInImage} from './FadeInImage';

interface Props {
  pokemon: SimplePokemon;
}

const windowWidth = Dimensions.get('window').width;
export const PokemonCard = ({pokemon}: Props) => {
  const [bgColor, setBgColor] = useState('grey');
  const isMounted = useRef(true);

  useEffect(() => {
    //IOS backgroungcolor
    //Android Dominant color
    ImageColors.getColors(pokemon.picture, {
      fallback: 'gray',
      cache: true,
      key: pokemon.id,
    }).then(colors => {
      if (!isMounted) {
        return;
      }
      switch (colors.platform) {
        case 'android':
          // android result properties
          setBgColor(colors.dominant || 'gray');
          break;
        case 'ios':
          // iOS result properties
          setBgColor(colors.background);
          break;
      }
    });

    //Cuando se desmonta
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <TouchableOpacity activeOpacity={0.9}>
      <View
        style={{
          ...styles.cardContainer,
          backgroundColor: bgColor,
          width: windowWidth * 0.4,
        }}>
        {/* Nombre y ID del Pokemon */}
        <View>
          <Text style={styles.name}>
            {pokemon.name}
            {'\n#' + pokemon.id}
          </Text>
        </View>
        {/* Pokebola Image */}
        <View style={styles.pokebolaContainer}>
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={styles.pokebola}
          />
        </View>

        {/* Image  Pokemon */}
        <FadeInImage uri={pokemon.picture} style={styles.pokemonImage} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    height: 120,
    width: 160,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: 20,
    left: 10,
  },
  pokebolaContainer: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    overflow: 'hidden',
    opacity: 0.5,
  },
  pokebola: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: -25,
    right: -25,
  },
  pokemonImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -8,
    bottom: -5,
  },
});
