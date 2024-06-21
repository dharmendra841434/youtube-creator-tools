import {View, TouchableOpacity, Image, ToastAndroid} from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import Clipboard from '@react-native-clipboard/clipboard';
import copy from '../assets/images/copy.png';

const CopyButton = ({text, className, isText}) => {
  const copyToClipboard = () => {
    Clipboard.setString(text ? text : '');
    ToastAndroid.show('Text Copied', ToastAndroid.SHORT);
  };
  return (
    <View style={{elevation: 1}} className="p-2 bg-white rounded-lg">
      <TouchableOpacity onPress={() => copyToClipboard()}>
        <View className="flex-row items-center ">
          <Image source={copy} className={`  ${className} w-8 h-8 mt-1 mr-1`} />
          {!isText && <CustomText className=" text-appText">Copy</CustomText>}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CopyButton;
