import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, ImageBackground, TouchableOpacity } from 'react-native';


export default class Start extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nameText: '',
      colorChoice: '',
      colors: [
        '#090C08',
        '#474056',
        '#8A95A5',
        '#B9C6AE'
      ]
    };
  }

  render() {
    const { name, colors, colorChoice } = this.state;
    return (
      <ImageBackground source={require('../assets/Background.png')} style={styles.image}>
        <Text style={styles.title}>ChatterBox</Text>
        <View style={styles.startContainer}>
          <View style={styles.searchBox}>
            <TextInput
              style={styles.input}
              onChangeText={(nameText) => this.setState({ nameText })}
              value={this.state.nameText}
              accessible={true}
              accessibilityLabel='Input name here'
              placeholder='Your Name'
            />
          </View>
          <Text style={styles.choose}>
            Choose Background Color:
          </Text>
          <View style={styles.colors}>
            {colors.map(color => (
              <View style={[styles.colorBorder,
              colorChoice === color ? { borderColor: '#757083' } : null]}
                key={color}>
                <TouchableOpacity
                  onPress={() => this.setState({ colorChoice: color })}
                  style={[styles.colorButton, { backgroundColor: color }]}
                />
              </View>
            ))}
          </View>
          <TouchableOpacity onPress={() => this.props.navigate('Chat', { nameText, color: colorChoice })}
            style={[styles.button]}>
            <Text style={styles.buttonText}>
              Start Chatting
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  startContainer: {
    width: '90%',
    height: '45%',
    backgroundColor: '#fff',
    marginBottom: 20,
    alignItems: 'flex-start'
  },
  input: {
    fontSize: 16,
    color: '#757083',
    width: 300,
    padding: 18,
    opacity: 0.8
  },
  button: {
    backgroundColor: '#757083',
    width: '90%',
    marginLeft: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 50
  },
  buttonText: {
    fontSize: 16,
    color: '#fff'
  },
  image: {
    width: '100%',
    height: '100%',
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 45,
    alignItems: 'center',
    flex: 1,
    marginTop: 130,
    alignItems: 'center'
  },
  searchBox: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#757083',
    margin: '15 30 20 13',
    paddingLeft: 13,
  },
  choose: {
    fontSize: 18,
    color: '#757083',
    opacity: 0.8,
    marginLeft: 20
  },
  colors: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '70%',
    margin: 20
  },
  colorButton: {
    height: 45,
    width: 45,
    borderRadius: 20
  },
  colorBorder: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: '#fff',
    borderRadius: 100,
    padding: 3
  }
});