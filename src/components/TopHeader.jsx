import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import back from '../assets/images/back.png';
import CustomText from './CustomText';
import {useNavigation} from '@react-navigation/native';
import {appColors} from '../utils/appColors';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  useInterstitialAd,
} from 'react-native-google-mobile-ads';

const TopHeader = ({title}) => {
  const navigation = useNavigation();
  const {isLoaded, isClosed, load, show} = useInterstitialAd(
    TestIds.INTERSTITIAL,
  );
  return (
    <View style={styles.container}>
      <CustomText font="bold" style={{fontSize: 16, color: appColors.appGray}}>
        {title}
      </CustomText>
      <View style={styles.IconConatiner}>
        <TouchableOpacity
          onPress={() => {
            load();
            navigation.goBack();
          }}>
          <Image source={back} style={{width: 27, height: 27}} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '3%',
    paddingVertical: '5%',
    position: 'relative',
    justifyContent: 'center',
  },
  IconConatiner: {
    backgroundColor: appColors.primary,
    borderRadius: 50,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: '4%',
  },
});

export default TopHeader;
