import React from 'react';
import {Text} from 'react-native';
import {appFonts} from '../utils/appFonts';
import {appColors} from '../utils/appColors';

const CustomText = ({font, children, className, style, ...props}) => {
  let fontFamily;
  switch (font) {
    case 'bold':
      fontFamily = appFonts.bold;
      break;
    case 'extraBold':
      fontFamily = appFonts.extraBold;
      break;
    case 'medium':
      fontFamily = appFonts.medium;
      break;
    default:
      fontFamily = appFonts.regular;
  }
  return (
    <Text
      className={` ${className} `}
      style={[{fontFamily: fontFamily, color: appColors.appText}, style]}
      {...props}
      testID={className}>
      {children}
    </Text>
  );
};

export default CustomText;
