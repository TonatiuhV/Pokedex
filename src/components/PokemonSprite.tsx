import React from 'react';
import {Image, TouchableOpacity} from 'react-native';

interface Props {
  uriSprite: string;
  onPress: (uri: string) => void;
}

export const PokemonSprite = ({uriSprite, onPress}: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => onPress(uriSprite)}>
      <Image
        source={{uri: uriSprite}}
        style={{
          height: 100,
          width: 100,
        }}
      />
    </TouchableOpacity>
  );
};
