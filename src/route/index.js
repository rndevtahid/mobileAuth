// // In App.js in a new project

// import * as React from 'react';
// import {View, Text} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {useSelector} from 'react-redux';
// import Login from '../screens/loginScreen';
// // import ChatScreen from '../screens/chatScreen';

// const Stack = createNativeStackNavigator();

// const userStatus = useSelector(state => state);

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Login" component={Login} />
//         {/* <Stack.Screen name="ChatScreen" component={ChatScreen} /> */}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import Login from '../screens/loginScreen';
import ChatScreen from '../screens/chatScreen';

const Stack = createNativeStackNavigator();

function App() {
  const userStatus = useSelector(state => state.user.login);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={!userStatus ? 'Login' : 'ChatScreen'}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
