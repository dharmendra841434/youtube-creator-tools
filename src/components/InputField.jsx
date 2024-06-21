import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {forwardRef} from 'react';
import {appColors} from '../utils/appColors';
import {appFonts} from '../utils/appFonts';
import send from '../assets/images/send.png';
import close from '../assets/images/close.png';
import {useNavigation} from '@react-navigation/native';

const InputField = forwardRef((props, ref) => {
  const {
    placeholder,
    style,
    isSearch,
    isComplete,
    onSearch,
    onClose,
    onChangeText,
    loader,
    onFocus,
    value,
  } = props;

  return (
    <View style={[{...styles.conatiner, ...style}]}>
      <TextInput
        style={{fontFamily: appFonts.regular}}
        cursorColor={appColors.primary}
        className="w-[85%] pl-3 text-black "
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        onFocus={onFocus}
        placeholderTextColor={appColors?.appGray}
        ref={ref}
      />
      {!isSearch && (
        <>
          {isComplete ? (
            <View style={styles.IconConatiner}>
              <TouchableOpacity activeOpacity={0.6} onPress={onClose}>
                <Image source={close} style={{width: 17, height: 17}} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.IconConatiner}>
              <TouchableOpacity
                disabled={loader}
                activeOpacity={0.6}
                onPress={onSearch}>
                {loader ? (
                  <ActivityIndicator color={appColors.appWhite} />
                ) : (
                  <Image source={send} style={{width: 17, height: 17}} />
                )}
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </View>
  );
});
const styles = StyleSheet.create({
  conatiner: {
    backgroundColor: appColors.appWhite,
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: appColors.borderGray,
    borderRadius: 12,
    paddingVertical: 2,
    alignItems: 'center',
    elevation: 2,
  },
  IconConatiner: {
    backgroundColor: appColors.primary,
    borderRadius: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default InputField;
