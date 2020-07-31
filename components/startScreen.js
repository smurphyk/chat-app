import React from 'react';
import { View, Text, Button } from 'react-native';

export default class StartScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>Start Screen</Text>
        <Button title="Start Chatting" onPress={() => this.props.navigation.navigate('ChatScreen')} />
      </View>
    )
  }
}