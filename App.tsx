import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {NavigatorStack} from './src/navigator/NavigatorStack';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent
      />
      <NavigatorStack />
    </NavigationContainer>
  );
};

export default App;
