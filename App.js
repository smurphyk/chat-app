import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';

import Start from './components/Start';
import Chat from './components/Chat';

const firebase = require('firebase');
require('firebase/firestore');

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