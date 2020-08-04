import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Platform } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    }
  }

  // Creates format for all messages
  componentDidMount() {
    //Creates static messages for the sake of the exercise
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hey, ' + this.props.route.params.name + '! Welcome to the ChatterBox!',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 3,
          text: this.props.route.params.name + ' is here to chat!',
          createdAt: new Date(),
          system: true,
        },
      ],
    })
  }

  // Customizes the color of the text bubbles
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#00e0ca'
          },
          left: {
            backgroundColor: '#e8091c'
          }
        }}
      />
    )
  }

  // Allows messages to be appended to the state's messages object
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    // Define props passed from start
    const { name, color, } = this.props.route.params;
    const { messages } = this.state;

    // Fallback in case no name is entered on start screen
    if (!name || name === '') name = 'Nobody'

    // Populates user's name, if entered
    this.props.navigation.setOptions({ title: name });

    return (
      // Creates Gifted Chat interface with keyboard spacer for android
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: color }}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      </View>
    )
  }
}