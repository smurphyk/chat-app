import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import startScreen from './components/startScreen';
import chatScreen from './components/chatScreen';

const Stack = createStackNavigator();

export default class ChatApp extends Component() {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="startScreen">
          <Stack.Screen name="startScreen" component={startScreen} />
          <Stack.Screen name="chatScreen" component={chatScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
