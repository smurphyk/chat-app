import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class Chat extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hold your horses, I'm working on it!</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
