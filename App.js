import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import StartScreen from './components/StartScreen';
import ChatScreen from './components/ChatScreen';

// Create stack navigator
const Stack = createStackNavigator();

export default class ChatApp extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="StartScreen">
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  NavigationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
