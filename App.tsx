import 'react-native-gesture-handler';
import React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {NavigatorStack} from './src/navigator/NavigatorStack';

const App = () => {
  return (
    <NavigationContainer>
      <NavigatorStack />
    </NavigationContainer>
  );
};

export default App;
