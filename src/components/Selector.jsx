import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
} from 'react-native';
import CustomText from './CustomText';
import arrow from '../assets/images/down.png';
import {appColors} from '../utils/appColors';
import {VIDEO_CATEGORY_LIST} from '../utils/data';
import CustomModal from './CustomModal';
import {truncateString} from '../utils/helper';

const Dropdown = ({selectedItem, setSelectedItem, data, error, onSelect}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          setIsOpen(!isOpen);
          if (onSelect) {
            onSelect();
          }
        }}
        style={{elevation: 2}}
        className={`flex-row items-center justify-between px-3 py-3 bg-white border-[0.5px]  ${
          error ? 'border-red-500 ' : 'border-gray-200 '
        } rounded-md`}>
        <CustomText font="medium" className=" text-appText">
          {truncateString(selectedItem, 17)}
        </CustomText>
        <Image
          source={arrow}
          className="w-3 h-3 "
          tintColor={appColors.appGray}
        />
      </TouchableOpacity>
      <CustomModal visible={isOpen} setVisible={setIsOpen} onClose={setIsOpen}>
        <View className="px-4 pt-4 ">
          <ScrollView className=" h-72">
            {data?.map((item, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.6}
                onPress={() => {
                  setSelectedItem(item);
                  setIsOpen(false);
                }}
                className="px-2 py-2 border-b border-gray-300">
                <CustomText font="medium">{item}</CustomText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </CustomModal>
    </View>
  );
};

export default Dropdown;
