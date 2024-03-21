import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Home from '../screens/Home';
import Rewards from '../screens/Rewards';
import Guidance from '../screens/Guidance';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

const NavBar = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Guidance') {
            iconName = 'book-outline';
          }  else if (route.name === 'Rewards') {
            iconName = 'medal-outline';
          } else if (route.name === 'Profile') {
            iconName = 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#FF2156', // Color when tab is active
        inactiveTintColor: '#000000', // Color when tab is inactive
        style: {
          backgroundColor: '#F9DFE3', // Background color of the tab bar
        },
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Guidance" component={Guidance} />
      <Tab.Screen name="Rewards" component={Rewards} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default NavBar;

