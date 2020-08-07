# ChatterBox
A react native application built using Expo's gifted-chat and Google Firebase to create a chat app that runs in real-time, for Android and iOS.
## Getting Started

## Install NodeJS and Expo
Before the app can run at all, [Node.js](https://nodejs.org/en/ "NodeJs") needs to be downloaded and installed on the user's computer.  Additionally, the Expo CLI must be installed via the terminal with the command:

`
npm install expo-cli --global
`

The Expo app will also need to be downloaded on the user's mobile device to allow the app to run using Expo.

### Expo Setup
User must create an Expo account.  This can be done by navigating to the [Expo sign-up page](https://expo.io/signup) and following the steps outlined to create an account.  Once finished, the user should be able to log in to Expo on their mobile device and in the browser.  These credentials will also be used to log in to the Expo CLI during setup.

### iOS Simulator Setup
*User will need a product that runs on iOS in order to run this app on an iOS simulator.* On a device running on iOS, the user must install [Xcode](https://developer.apple.com/xcode/resources/ "Xcode").  Once installed, the user will open it and navigate to "Preferences."  Under "Preferences," the user will click on "Components" and install their choice of simulator from the list.  Once installed, the user will open the simulator, start their Expo project, and run the project.  Projects can be run by either typing "i" in the Expo CLI or clicking "Run on iOS simulator" in Xcode.

### Android Emulator Setup
To set up an emulator for Android, users must download and install [Android Studio](https://docs.expo.io/versions/v32.0.0/workflow/android-studio-emulator/ "Android Studio"). The user will be guided through the installation process once the download completes. **Do not uncheck the option for "Android Virtual Device"** when it shows up during installation.

Once installed, the user should open Android Studio and click the "Configure" option.  From there, navigate to Settings --> Appearance & Behaviour --> System Settings --> Android SDK.  Then click on "SDK Tools" and check whether or not "Android SDK Build-Tools" are installed.  If not, click on the row labelled "Android SDK Build-Tools" and download the latest version using the download symbol next to it.

**macOS and Linux Users:**
If a user is using macOS or Linux, they will need to add the location of the Android SDK to their PATH.  In order to accomplish this, copy the path (displayed in the text field at the top of the screen in Android Studio) and add the following to their "~/.bash_profile" or "~/.bashrc" file:

`export ANDROID_SDK=/Users/myuser/Library/Android/sdk`

*Be sure to replace 'myuser' and 'Library' with your information.*

**macOS Users Only:**
Users with macOS will also need to add platform-tools to their "~/.bash_profile" or "~/.bashrc" file.  The line for this is:

`export PATH=/Users/myuser/Library/Android/sdk/platform-tools:$PATH`

*Once again, make sure to insert your information into the path.*

##### Installing and Running Android Emulator
At this point, the user will close out of the "Settings for New Projects" window and click "Configure" again.  This time around, the user will select the "AVD Manager" option instead.  From there, click "Create Virtual Device" and select a device from the list.  Click "Next" to navigate to the "System Image" interface and click on the "Recommended" tab.  Finallay select an operating system.

Click the "Download" link next to whichever OS you choose, and Androiod Studio will download the image.  *This may take a few minutes.*  Once finished, in the next window, give your device a name and click "Finish."

Finally, return to the Virtual Device Manager and click the "Play" icon to start the emulator.  Then, navigate to the "Browser" tab of the project you're currently running in Expo and click "Run on Android device/emulator." Expo will begin installing the Expo client on the virtual device and then start the project.

## Firebase Setup
First, navigate to [Google Firebase](https://firebase.google.com/ "Google Firebase") and click "Sign In" in the top-right corner.  The user should use their existing Google credentials to sign in and create a new Firebase account. *If you do not have a Google Account, create one and then proceed.*

After that, click on the "Go to Console" link in the top-right corner and click "Create Project".  *If you've created any Firebase projects in the past, it will say "Add Project."*  The user will then fill out a form with some basic information about themselves. Go ahead and use the default settings on the last step.

#### Firebase Database Setup
Once the project is created, click on the "Database" option in the left panel.  From there, click "Create Database" and select the "Start in test mode" option.  This option allows users to read from and write to the user's database.  Select a database location that is closest to whomever will be using the application.

#### Firebase Cloud Storage Setup
The user will need to set up Firebase Cloud Storage to store any images they send and receive.  To do so, click the "Storage" option in the left panel, click "Get Started," "Next," and then "Done."

#### Firebase Authentication Setup
Users will need to be authenticated if they want to utilize the application's ability to send and store messages.  To set this up, return to the dashboard and click the "Authentication" option in the left panel.  Then click "Setup Sign-In Method" and enable the "Anonymous" option, which should be the final item on the list.

#### Generating an API Key
To give the application access to the user's Firebase project, they must generate an  API Key.  To do so, go to "Project Settings" at the top of the left panel and click "Create Web App" under the "General" tab. *This option may appear as: </>.*  In the modal that appears, name your applications and click "Register App." *Firebase hosting is not necessary; that is up to the user.*

Once registered, you will get a code snippet that looks something like:
```HTML
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.14.4/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/7.14.4/firebase-analytics.js"></script>

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCMphASS75dv5mXXx18JOgvXwRz8LbN6Qc",
    authDomain: "testchat-5f8e8.firebaseapp.com",
    databaseURL: "https://testchat-5f8e8.firebaseio.com",
    projectId: "testchat-5f8e8",
    storageBucket: "testchat-5f8e8.appspot.com",
    messagingSenderId: "655102562368",
    appId: "1:655102562368:web:34e1a16546f498f1b00fa5",
    measurementId: "G-N5CYP8ZEX6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
</script>
```

Copy everything within the curly braces of the config variable.  Once the user has cloned or downloaded this repository, they will navigate to components/configs/firebaseConfig, delete the content within the curly braces, and paste their unique API Key information instead.

## Final Steps
Now that all configuration is complete, the user is able to run the application.  Navigate to the project directory in the terminal and type:

`expo start`
or
`npm start`
or
`yarn start`

*Depending on what package manager the user has chosen*

From there, the user can type "i" in the terminal to run the app in the iOS simulator or "a" to run in the Android emulator. *Make sure the Android emulator is already running.*

You can also run the app on your personal mobile device:

**Android:**
Open the Expo app on your Android device, navigate to the user icon in the bottom right, and sign in if you havn't already.  Then, navigate back to the Projects tab, and scan the QR code that was generated in the terminal and the Metro Bundler in the browser.

**iPhone:**
Open the camera app and focus it on the QR code that was generated in the terminal and the Metro Bundler in the browser.

The app will open, the user will enter their name, choose a background color for the chat screen, and get to chatting!

**KANBAN BOARD**
https://trello.com/b/spuZnsVT/react-native-chat-app