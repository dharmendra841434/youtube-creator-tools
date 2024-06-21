import {View, Text, Image, ActivityIndicator, StyleSheet} from 'react-native';
import React from 'react';
import logo from '../assets/images/logo.png';
import {appColors} from '../utils/appColors';
import {useNavigation} from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();
  setTimeout(() => {
    navigation.replace('drawer');
  }, 2000);
  return (
    <View style={styles.screen}>
      <Image source={logo} style={{width: '90%', height: '12%'}} />
      <ActivityIndicator
        color={appColors.primary}
        size={40}
        style={{marginTop: '10%'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: appColors.secondry,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SplashScreen;
