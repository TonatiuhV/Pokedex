import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigatorStack} from './NavigatorStack';
import {SearchScreen} from '../screens/SearchScreen';
import {Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigatorStackSearch} from './NavigatorStackSearch';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          marginBottom: Platform.OS === 'android' ? 10 : 0,
        },

        tabBarStyle: {
          position: 'absolute', // ya que los elemtos hijos no toman el tamaño del tabBar
          backgroundColor: 'rgba(255,255,255,0.9)',
          borderWidth: 0,
          elevation: 0,
          height: Platform.OS === 'android' ? 60 : 80,
        },
        tabBarActiveTintColor: '#5856D6',
      }}
      sceneContainerStyle={{
        backgroundColor: 'white',
      }}>
      <Tab.Screen
        name="NavigatorStack"
        options={{
          title: 'Listado',
          tabBarIcon: ({color}) => (
            <Icon name="list-outline" color={color} size={25} />
          ),
        }}
        component={NavigatorStack}
      />
      <Tab.Screen
        name="SearchScreen"
        options={{
          title: 'Listado',
          tabBarIcon: ({color}) => (
            <Icon name="search-outline" color={color} size={25} />
          ),
        }}
        component={NavigatorStackSearch}
      />
    </Tab.Navigator>
  );
};
