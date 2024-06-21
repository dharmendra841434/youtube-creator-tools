import {View, Text} from 'react-native';
import React from 'react';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';

const CustomBannerAd = ({adId}) => {
  return (
    <View className="py-10">
      <BannerAd
        unitId={adId}
        size={BannerAdSize.INLINE_ADAPTIVE_BANNER}
        requestOptions={{
          networkExtras: {
            collapsible: 'bottom',
          },
        }}
      />
    </View>
  );
};

export default CustomBannerAd;
