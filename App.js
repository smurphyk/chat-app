import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//Causing an error, but still works
import KeyboardSpacer from 'react-native-keyboard-spacer';

import Start from './components/Start';
import Chat from './components/Chat';

// Create stack navigator
const Stack = createStackNavigator();

export default class ChatApp extends Component {
  render() {
    return (
      // Container that will set the initial state and control navigation
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Start">
          <Stack.Screen name="Start" component={Start} />
          <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}