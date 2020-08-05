import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

const firebase = require('firebase');
require('firebase/firestore');

export default class Chat extends React.Component {
  constructor(props) {
    super(props);

    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyD63SIwF7IVYFD9K_ap_BF2Kt-6lN7Yzrw",
        authDomain: "chatterbox-chat-app.firebaseapp.com",
        databaseURL: "https://chatterbox-chat-app.firebaseio.com",
        projectId: "chatterbox-chat-app",
        storageBucket: "chatterbox-chat-app.appspot.com",
        messagingSenderId: "875496634079",
        appId: "1:875496634079:web:aa5630de3c672a27cd5b6a",
        measurementId: "G-HN6JQEVN8Y"
      })
    }

    this.state = {
      messages: [],
      user: {},
      uid: 0
    };
  }

  componentDidMount() {
    // Call the firebase auth service
    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async user => {
      if (!user) {
        user = await firebase.auth().signInAnonymously();
      }
      // Update user state according to auth data
      this.setState({
        uid: user.uid,
        loggedInText: "Welcome to the ChatterBox! The first rule of ChatterBox is: You MUST talk about ChatterBox...or anything else."
      });

      // Retrieve user's messages
      this.referenceMessages = firebase.firestore().collection('messages')
      // Update collection with new messages
      this.unsubscribe = this.referenceMessages.onSnapshot(this.onCollectionUpdate);
    });
    this.setState({
      messages: [
        {
          _id: 1,
          text: this.props.route.params.name + ' is here to chat!',
          createdAt: new Date(),
          system: true,
        }
      ]
    })
  }

  // Query for stored messages
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // Map through all documents and retrieve data
    querySnapshot.forEach(doc => {
      var data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
      });
    });
    this.setState({
      messages
    });
  };

  // Add new messages to database for later retrieval
  addMessage() {
    this.referenceMessages.add({
      _id: this.state.messages[0]._id,
      text: this.state.messages[0].text,
      createdAt: this.state.messages[0].createdAt,
      user: this.state.messages[0].user,
      uid: this.state.uid,
    });
  }

  // Store messages when they are sent
  onSend(messages = []) {
    this.setState(
      previousState => ({
        messages: GiftedChat.append(previousState.messages, messages)
      }),
      () => {
        this.addMessage();
      }
    );
  }

  // Close connection when app is closed
  componentWillUnmount() {
    this.authUnsubscribe();
  }

  // Customizes the color of the text bubbles
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#267a2e',
          },
          left: {
            backgroundColor: '#e8091c'
          }
        }}
      />
    )
  }

  render() {
    // Define props passed from start
    const { name, color, } = this.props.route.params;
    const { messages, uid } = this.state;

    // Populates user's name, if entered
    this.props.navigation.setOptions({ title: name });

    return (
      // Creates Gifted Chat interface
      <View style={{ flex: 1, backgroundColor: color }}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: uid,
            name: name,
          }}
        />
      </View>
    )
  }
}