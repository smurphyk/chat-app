import React from 'react';
import { StyleSheet, View, AsyncStorage, YellowBox } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import NetInfo from '@react-native-community/netinfo';
import MapView from 'react-native-maps';
import CustomActions from './CustomActions';

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

    // Retrieve user's messages from Db
    this.referenceMessages = firebase.firestore().collection('messages')

    this.state = {
      messages: [],
      user: {},
      uid: 0,
      isConnected: false,
      image: null,
      location: null
    };
  }

  async componentDidMount() {
    // Check whether user is on or offline
    NetInfo.fetch().then(state => {
      var isConnected = state.isConnected;
      this.setState({
        isConnected
      });
      this.getMessages();
      if (isConnected) {
        // Call the firebase auth service
        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async user => {
          if (!user) {
            user = await firebase.auth().signInAnonymously();
          }
          // Update user state according to auth data
          this.setState({
            uid: user.uid,
          });
        });
        // Update collection with new messages
        this.unsubscribe = this.referenceMessages.orderBy('createdAt', 'desc').onSnapshot(this.onCollectionUpdate);
      }
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
    });
    // Resolves timer warning on Android; Firebase working on better fix
    YellowBox.ignoreWarnings(['Setting a timer']);
  }

  async getMessages() {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // Query for stored messages
  onCollectionUpdate = querySnapshot => {
    const messages = [];
    // Map through all documents and retrieve data
    querySnapshot.forEach(doc => {
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
        image: data.image,
        location: data.location
      });
    });
    this.setState({
      messages
    });
  };

  // Close connection when app is closed
  componentWillUnmount() {
    this.authUnsubscribe();
    this.unsubscribe();
  }

  // Store messages when they are sent
  onSend(messages = []) {
    this.setState(
      previousState => ({
        messages: GiftedChat.append(previousState.messages, messages)
      }),
      () => {
        this.saveMessages();
      }
    );
    this.addMessage(messages)
  }

  // Add new messages to database for later retrieval
  addMessage(message) {
    const { _id, createdAt, text, user, image, location } = message[0];
    this.referenceMessages.add({
      _id: _id,
      createdAt: createdAt,
      text: text || null,
      user: {
        _id: user._id,
        name: user.name
      },
      image: image || null,
      location: location || null
    })
  }

  // Saves messages locally so users can see messages when offline
  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  }

  // Allows messages in local storage to be deleted
  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
    } catch (error) {
      console.log(error.message);
    }
  }

  // Customizes the color of the text bubbles
  renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#246e50',
          },
          left: {
            backgroundColor: '#e8091c'
          }
        }}
      />
    )
  }

  renderInputToolbar = props => {
    if (this.state.isConnected == false) {
    } else {
      return (
        <InputToolbar
          {...props}
        />
      );
    }
  }

  renderCustomView(props) {
    const { currentMessage } = props;
    if (currentMessage.location) {
      const longitude = parseInt(currentMessage.location.longitude);
      const latitude = parseInt(currentMessage.location.latitude);
      return (
        <MapView
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3
          }}
          region={{
            longitude,
            latitude,
            longitudeDelta: 0.0421,
            latitudeDelta: 0.0922,
          }}
        />
      );
    }
    return null;
  }

  renderActions = (props) => {
    return <CustomActions {...props} />;
  };

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
          renderInputToolbar={this.renderInputToolbar}
          messages={messages}
          renderCustomView={this.renderCustomView}
          renderActions={this.renderActions}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 40
  }
})