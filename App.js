import React, {useEffect} from 'react';
import {StyleSheet, SafeAreaView, Text} from 'react-native';
// import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store from './src/config/Store';
import Router from './src/route/';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store.store}>
        <PersistGate loading={null} persistor={store.persistor}>
          <Router />
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
