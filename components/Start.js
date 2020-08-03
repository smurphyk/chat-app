import React from 'react';
import { StyleSheet, View, Text, TextInput, ImageBackground, TouchableOpacity } from 'react-native';



export default class Start extends React.Component {
  constructor(props) {
    super(props);

    // Set initial state for start screen functionality
    this.state = {
      nameText: '',
      colorChoice: '',
      colors: [
        '#090C08',
        '#474056',
        '#8A95A5',
        '#B9C6AE'
      ],
    }
  }

  render() {
    const { navigation } = this.props;
    const { nameText, colors, colorChoice } = this.state;
    return (
      // Set the background as the image provided in assets
      <ImageBackground source={require('../assets/BackgroundImage.png')} style={styles.background} imageStyle={{ resizeMode: 'cover' }}>
        <Text style={styles.title}>ChatterBox</Text>
        <View style={styles.startContainer}>
          <View style={styles.searchBox}>
            <TextInput
              style={styles.input}
              // Any change in the name field is stored as the state, allows adding
              // name to chat screen
              onChangeText={(nameText) => this.setState({ nameText })}
              value={this.state.nameText}
              // React-native feature to include accessibility easily
              accessible={true}
              accessibilityLabel='Input name here'
              placeholder='Your Name'
            />
          </View>
          <Text style={styles.choose}>
            Choose Background Color:
          </Text>
          {/* Create buttons for user to choose background color */}
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
          {/* Give chat button navigation and pass name and color as props */}
          <TouchableOpacity onPress={() => navigation.navigate('Chat', { name: nameText, color: colorChoice })}
            style={styles.button}>
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
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#fff',
    alignItems: 'center',
    flex: 1,
    marginTop: 100,
    alignItems: 'center'
  },
  startContainer: {
    width: '90%',
    height: '45%',
    backgroundColor: '#fff',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  button: {
    backgroundColor: '#757083',
    width: '90%',
    marginLeft: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 60,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff'
  },
  searchBox: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#757083',
    paddingLeft: 13,
    marginLeft: 20,
    marginTop: 15,
    marginBottom: 30,
  },
  input: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    width: '90%',
    padding: 18,
    opacity: 0.5,
    borderColor: '#757083',
  },
  choose: {
    fontSize: 18,
    color: '#757083',
    marginLeft: 20,
    marginTop: 10,
  },
  colors: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '70%',
    marginLeft: 20,
    marginTop: 5,
  },
  colorButton: {
    height: 45,
    width: 45,
    borderRadius: 50
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