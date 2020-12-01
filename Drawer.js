import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer'

import Gallery from './components/Gallery';
import ItemDetail from './components/ItemDetail';
import Cart from './components/Cart';
import Header from './components/Header';
import Login from './components/login';
import SignUp from './components/signUp';
import CheckPage from './components/CheckPage';

// const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function DrawerComp() {
  return (
    // <Gallery />
    // <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Gallery} />
        <Drawer.Screen name="Details" component={Gallery} />
      </Drawer.Navigator>
    // </NavigationContainer>

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
