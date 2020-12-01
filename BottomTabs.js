import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Gallery from './components/Gallery';
import Cart from './components/Cart';
import CustomerOrder from './components/CustomerOrder';
import Favourite from './components/Favourite';
import Home from './components/Home';

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="gray"
  
     
      labelStyle={{ fontSize: 12 }}
      
       // barStyle={{ padding:  }}
      //  options={{
      //   style:{borderTopWidth:5, borderColor:'black' }
      //  }}
    >
      <Tab.Screen
        name="Feed"
        component={Gallery}
        options={{
        //   tabBarLabel: 'Home',
        tabBarLabel: 'Home',
        tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color="gray"  size={26} />
          ),
          tabBarColor: "white",
         
        }}
        
      />
      <Tab.Screen
        name="Notifications"
        component={Home}
        options={{
          tabBarLabel: 'Updates',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color="gray"  size={26} />
          ),
          tabBarColor: "white",
        }}
        // barStyle={{ backgroundColor: '#ABEF5E' }}
      />
      <Tab.Screen
        name="Favourites"
        component={Favourite}
        options={{
          tabBarLabel: 'Favourites',
          tabBarColor: "white",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="heart" color="gray"  size={26} />
          ),
        }}
        
      />

          <Tab.Screen
        name="News"
        component={CustomerOrder}
        options={{
          tabBarLabel: 'Ordered',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cart" color="gray" size={26} />
          ),
          tabBarColor: "white",
        }}

      />
    </Tab.Navigator>
  );
}

export default MyTabs;
