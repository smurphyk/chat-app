import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);

    // Set default state for adding text field functionality
    this.state = {
      text: '',
      messages: []
    }
  }

  // Creates format for all messages
  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 2,
          text: 'This is a system message',
          createdAt: new Date(),
          system: true,
        },
      ],
    })
  }

  // Allows messages to be appended to the state's messages object
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    // Define props passed from start
    const { name, color } = this.props.route.params;
    const { messages } = this.state;

    // Fallback in case no name is entered on start screen
    if (!name || name === '') name = 'Nobody'

    // Populates user's name, if entered
    this.props.navigation.setOptions({ title: name });

    return (
      // Creates Gifted Chat interface with keyboard spacer for android
      <View style={styles.container}>
        <GiftedChat
          messages={messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        {Platform.OS === 'android' ? <KeyboardSpacer /> : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  input: {
    borderWidth: 2,
    borderColor: '#757083',
    padding: 7,
  }
})