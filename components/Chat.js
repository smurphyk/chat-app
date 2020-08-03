import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);

    // Set default state for adding text field functionality
    this.state = {
      text: '',
    }
  }

  render() {
    // Define props passed from start
    const { name, color } = this.props.route.params;

    // Fallback in case no name is entered on start screen
    if (!name || name === '') name = 'Nobody'

    // Populates user's name, if entered
    this.props.navigation.setOptions({ title: name });

    return (
      // Sets colorChoice as chat screen background color
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: color }}>
        <TextInput
          style={styles.input}
          placeholder="Hold your horses, I'm working on it!"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: '#757083',
    padding: 7,
  }
})