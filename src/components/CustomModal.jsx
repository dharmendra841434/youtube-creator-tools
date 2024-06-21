import React, {useState} from 'react';
import {Modal, View, StyleSheet, TouchableOpacity} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {appColors} from '../utils/appColors';

const CustomModal = ({
  visible,
  setVisible,
  onClose,
  children,
  containerStyle,
  radius,
}) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableOpacity
          style={{height: '100%', zIndex: 20}}
          activeOpacity={0}
          onPress={() => setVisible(false)}
        />
        <BlurView
          style={styles.absolute}
          blurAmount={3}
          blurType="regular"
          overlayColor="rgba(0,0,0,0.2)"
          reducedTransparencyFallbackColor="white"
        />
        <View
          style={[
            containerStyle,
            styles?.contentView,
            {
              borderTopLeftRadius: radius ? radius : 50,
              borderTopRightRadius: radius ? radius : 50,
            },
          ]}
          className="py-6 ">
          <View className="items-center ">
            <View className="w-16 h-1 bg-gray-400 rounded-3xl " />
          </View>
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  contentView: {
    backgroundColor: appColors.appWhite,
    zIndex: 30,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default CustomModal;
