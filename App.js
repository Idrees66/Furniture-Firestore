import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Gallery from './components/Gallery';
import ItemDetail from './components/ItemDetail';
import Cart from './components/Cart';
import Header from './components/Header';
import Login from './components/login';
import SignUp from './components/signUp';
import CheckPage from './components/CheckPage';
// import DrawerComp from './Drawer';
import MyTabs from './BottomTabs';

const Stack = createStackNavigator();

function StackFunction() {
  return (
    <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Home" component={MyTabs} //Gallery
      options={{ title: 'Home', headerShown:false }} />
      <Stack.Screen name="Details" component={ItemDetail}
       options={{ title: 'Details', headerShown:false }} />
      <Stack.Screen name="Cart" component={Cart}
       options={{ title: 'Cart', headerShown:true }} />
      <Stack.Screen name="Login" component={Login}
       options={{ title: 'Login', headerShown:true, headerTitleStyle:{color:'white'},  headerStyle:{backgroundColor:'#cc0e86'} }} />
      <Stack.Screen name="SignUp" component={SignUp}
        options={{ title: 'Sign Up', headerShown:true, headerTitleStyle:{color:'white'}, headerStyle:{backgroundColor:'#eb3838'}  }} />
      <Stack.Screen name="CheckPage" component={CheckPage}
        options={{ title: 'Check Page', headerShown:true, headerTitleStyle:{color:'white'},  headerStyle:{backgroundColor:'#eb3838'} }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    // <Gallery />
    <NavigationContainer>
      {/* <DrawerComp /> */}
      <StackFunction />
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
