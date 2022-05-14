import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {LoginButton, AccessToken, LoginManager} from 'react-native-fbsdk-next';

import {signIn} from '../action/User';

import {useDispatch} from 'react-redux';

const App = ({route, navigation}) => {
  const dispatch = useDispatch();

  const [loggedIn, setloggedIn] = useState(false);
  const [userInfo, setuserInfo] = useState([]);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#009' : '#fff',
  };

  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();

      const {accessToken, idToken} = await GoogleSignin.signIn();

      setloggedIn(true);

      const credential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken,
      );

      await auth().signInWithCredential(credential);

      dispatch(signIn());

      navigation.navigate('ChatScreen');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        alert('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('PLAY_SERVICES_NOT_AVAILABLE');
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const faceBookSignIn = async () => {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    // If the user cancels the login process, the result will have a
    // isCancelled boolean set to true. We can use that to break out of this function.
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    const data = await AccessToken.getCurrentAccessToken();

    // If we don't get the access token, then something has went wrong.
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Use the Access Token to create a facebook credential.
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // // Use the facebook credential to sign in to the application.
    await auth().signInWithCredential(facebookCredential);

    dispatch(signIn());

    navigation.navigate('ChatScreen');
  };

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '291835737844-mo87saq0fuj1punkaeoi48nkdjdhp091.apps.googleusercontent.com',
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
  }, []);

  const FBLogin = () => {
    return (
      <View style={{height: 50, width: 200, backgroundColor: '#c3c3c3'}}>
        <Button
          style={{backgroundColor: 'blue'}}
          title={'Login with Facebook'}
          onPress={() => faceBookSignIn()}
        />
      </View>
    );
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setloggedIn(false);
      setuserInfo([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <GoogleSigninButton
                style={{width: 192, height: 48}}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={() => _signIn()}
              />
            </View>

            <FBLogin />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
