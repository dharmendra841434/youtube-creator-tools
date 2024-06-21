import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import {appColors} from '../utils/appColors';

const ToolsContainer = ({children, title, style, conatinerStyle}) => {
  //relative border-2 border-borderGray rounded-2xl pt-7 pb-5

  return (
    <View style={[{...{position: 'relative'}, ...style}]}>
      <View style={[{...styles.container, ...conatinerStyle}]}>{children}</View>
      {title && (
        <View style={styles.titleContainer}>
          <View
            style={{
              backgroundColor: appColors.secondry,
              paddingHorizontal: 13,
            }}>
            <CustomText
              font="bold"
              style={{fontSize: 16, color: appColors.appGray}}>
              {title}
            </CustomText>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '3%',
    paddingTop: '6%',
    paddingBottom: '3%',
    borderWidth: 2,
    borderColor: appColors.borderGray,
    borderRadius: 16,
  },
  titleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    top: -16,
  },
});

export default ToolsContainer;
