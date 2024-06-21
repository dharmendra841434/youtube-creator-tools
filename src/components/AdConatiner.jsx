import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import CustomText from './CustomText';

const AdConatiner = ({children}) => {
  return (
    <View className="items-center justify-center h-40 px-3 mx-2 my-8 bg-appGray/70 ">
      {children}
    </View>
  );
};

export default AdConatiner;
