import {View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {appColors} from '../utils/appColors';

const ToolCard = ({children, onPress, style}) => {
  return (
    <View
      style={[
        {
          ...{
            backgroundColor: appColors.appWhite,
            borderRadius: 10,
            elevation: 4,
            alignItems: 'center',
            justifyContent: 'center',
          },
          ...style,
        },
      ]}>
      <TouchableOpacity activeOpacity={0.4} onPress={onPress}>
        {children}
      </TouchableOpacity>
    </View>
  );
};

export default ToolCard;
