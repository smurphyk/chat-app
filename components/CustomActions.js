import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import firebase from 'firebase';
import 'firebase/firestore';

export default class CustomActions extends React.Component {
  /**
   * Returns the action selected by the user, from the options
   * @function onActionPress
   */
  onActionPress = () => {
    const options = ['Send Image', 'Take Photo', 'Send Location', 'Cancel'];

    const cancelButtonIndex = options.length - 1;

    this.context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            return this.pickImage();
          case 1:
            return this.takePhoto();
          case 2:
            return this.getLocation();
          default:
        }
      },
    );
  };

  /**
   * Requests permission to access user's camera roll
   * If granted, user's image library is displayed
   * Once image is selected, image is stored via storeImage function
   * @function pickImage
   * @async
   */
  pickImage = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status === 'granted') {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: 'Images',
        }).catch(error => console.log(error));

        if (!result.cancelled) {
          this.storeImage(result.uri);
        }
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  /**
   * Requests permission to access user's camera
   * If granted, user's camera app is luanched
   * Once image is taken, user is able to confirm picture, then image is
   * stored via storeImage function.
   * @function takePhoto
   * @async
   */
  takePhoto = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);

      if (status === 'granted') {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: 'Images',
        }).catch(error => console.log(error));

        if (!result.cancelled) {
          this.storeImage(result.uri);
        }
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  /**
   * Image is converted to blob
   * Blob is then uploaded to firebase cloud storage
   * @function storeImage
   * @async
   * @param {string} uri URI of image
   */
  storeImage = async (uri) => {
    try {
      const { props } = this.props;
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError('Network said NOPE! Request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
      });

      // Create new name for image
      const uriParse = uri.split('/');
      const uriName = uriParse[uriParse.length - 1];

      const promise = [];
      const ref = firebase.storage().ref();
      const uploadTask = ref.child(`${uriName}`).put(blob);
      promise.push(uploadTask);

      Promise.all(promise).then(async tasks => {
        blob.close();
        const imageUrl = await uploadTask.snapshot.ref.getDownloadURL()
        this.props.onSend({ image: imageUrl });
      })
    }
    catch (error) {
      console.log(error);
    }
  }

  /**
   * Requests permission to access user's location
   * If granted, longitude and latitude coordinates are injected into
   * onSend function
   * @function getLocation
   * @async
   */
  getLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      let result = await Location.getCurrentPositionAsync({});

      if (result) {
        this.props.onSend({
          location: {
            latitude: result.coords.latitude,
            longitude: result.coords.longitude
          }
        })
      }
    }
  }

  render() {
    return (
      <TouchableOpacity style={[styles.container]} onPress={this.onActionPress}>
        <View style={[styles.wrapper, this.props.wrapperStyle]}>
          <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

CustomActions.contextTypes = {
  actionSheet: PropTypes.func,
};