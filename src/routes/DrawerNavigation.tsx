import React, {useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import DrawerMenu from './DrawerMenu';

const DrawerNav = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <DrawerNav.Navigator
      initialRouteName="home"
      drawerContent={() => <DrawerMenu />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: 'rgb(0,0,0,0.4)',
        },
      }}>
      <DrawerNav.Screen name="home" component={HomeScreen} />
    </DrawerNav.Navigator>
  );
};

export default DrawerNavigation;
