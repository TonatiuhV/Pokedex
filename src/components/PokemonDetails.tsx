import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import {PokemonFull, Sprites} from '../interfaces/pokemonInterfaces';
import {FadeInImage} from './FadeInImage';
import {PokemonSprite} from './PokemonSprite';

interface Props {
  pokemon: PokemonFull;
  onChangePicture: (uri: string) => void;
}
export const PokemonDetails = ({pokemon, onChangePicture}: Props) => {
  const [sprites, setSprites] = useState<string[]>([]);

  const tranformSprites = () => {
    //unicamnte obtenemos los atributes que pueden contener una imagen
    let spritesAttributes: string[] = [
      'front_default',
      'back_default',
      'front_shiny',
      'back_shiny',
      'front_female',
      'back_female',
      'back_shiny_female',
      'front_shiny_female',
    ];
    let spritesUri: string[] = [];
    spritesAttributes.forEach(spr => {
      if (
        pokemon.sprites[spr as keyof Sprites] != undefined &&
        pokemon.sprites[spr as keyof Sprites] != null
      ) {
        spritesUri.push(pokemon.sprites[spr as keyof Sprites] as any);
      }
    });
    setSprites(spritesUri);
  };

  useEffect(() => {
    tranformSprites();
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        ...StyleSheet.absoluteFillObject,
      }}>
      {/* Types */}
      <View style={styles.containerGobal}>
        <Text style={styles.title}>Types</Text>

        <View style={{flexDirection: 'row'}}>
          {pokemon.types.map(({type}) => {
            return (
              <Text
                key={type.name}
                style={[styles.regularText, {marginRight: 10}]}>
                {type.name}
              </Text>
            );
          })}
        </View>
        {/* Peso */}
        <Text style={styles.title}>Peso</Text>

        <Text style={styles.regularText}>{pokemon.weight}kg</Text>
      </View>
      {/* Sprites */}
      <View style={{...styles.container}}>
        <Text style={styles.title}>Sprites</Text>
        {/* No es necesario usar un FlatList */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {sprites.map((uriSprite, index) => {
            return (
              <PokemonSprite
                key={uriSprite}
                uriSprite={uriSprite}
                onPress={onChangePicture}
              />
            );
          })}
        </ScrollView>
      </View>
      {/* Habilidades */}
      <View style={{...styles.container}}>
        <Text style={styles.title}>Habilidades Base</Text>
        <View style={{flexDirection: 'row'}}>
          {pokemon.abilities.map(({ability}) => {
            return (
              <Text
                key={ability.name}
                style={[styles.regularText, {marginRight: 10}]}>
                {ability.name}
              </Text>
            );
          })}
        </View>
      </View>
      {/* Movimientos */}
      <View style={{...styles.container}}>
        <Text style={styles.title}>Moves</Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {pokemon.moves.map(({move}) => {
            return (
              <Text
                key={move.name}
                style={[styles.regularText, {marginRight: 10}]}>
                {move.name}
              </Text>
            );
          })}
        </View>
      </View>
      {/* Stats */}
      <View style={{...styles.container}}>
        <Text style={styles.title}>Stats</Text>
        <View>
          {pokemon.stats.map(stat => {
            return (
              <View style={{flexDirection: 'row'}} key={stat.stat.name}>
                <Text style={[styles.regularText, {flex: 1}]}>
                  {stat.stat.name}
                </Text>
                <Text
                  style={[styles.regularText, {fontWeight: 'bold', flex: 1}]}>
                  {stat.base_stat}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
      {/* Sprite Final */}
      <View
        style={{
          marginBottom: 80,
          alignItems: 'center',
        }}>
        <FadeInImage
          uri={pokemon.sprites.front_default}
          style={styles.basicSprite}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerGobal: {
    marginTop: 370,
    marginHorizontal: 20,
  },
  container: {
    marginHorizontal: 20,
  },
  title: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: 'bold',
  },
  regularText: {
    fontSize: 19,
  },
  basicSprite: {
    height: 100,
    width: 100,
  },
});
