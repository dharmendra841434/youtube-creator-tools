import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React, {useCallback} from 'react';
import logo from '../assets/images/logo.png';
import {navOption} from '../utils/data';
import CustomText from '../components/CustomText';
import home from '../assets/images/home.png';
import person from '../assets/images/person.png';
import chat from '../assets/images/chat.png';
import info from '../assets/images/info.png';
import share from '../assets/images/share.png';
import {useNavigation} from '@react-navigation/native';

const DrawerMenu = () => {
  const navigation = useNavigation();
  const handleOpenEmail = () => {
    const email = 'contact@tubetool.ai';
    const subject = 'Support Request';
    const body = 'Hi, I need help with...';
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    Linking.openURL(mailtoUrl).catch(err => {
      Alert.alert(
        'Error',
        'An error occurred while trying to open the email app.',
      );
      console.error('Failed to open URL:', err);
    });
  };
  return (
    <View
      style={{borderTopRightRadius: 30, borderBottomRightRadius: 30}}
      className="flex-1 bg-secondry rounded-tr-xl">
      <View>
        <View className="px-8 py-5 ">
          <Image source={logo} className="w-32 h-8 " />
        </View>
        <View className="px-8 ">
          <FlatList
            data={navOption}
            renderItem={({item, index}) => (
              <View key={item?.id} className="my-4 ">
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={async () => {
                    if (item?.title === 'Privacy Policy') {
                      //navigation.closeDrawer();
                      return navigation.navigate('privacy');
                    }
                    if (item?.title === 'About Us') {
                      //navigation.closeDrawer();
                      return navigation.navigate('about');
                    }
                    if (item?.title === 'Contact Us') {
                      handleOpenEmail();
                      return;
                    }
                    if (item?.title === 'Home') {
                      //navigation.closeDrawer();
                      return navigation.navigate('drawer');
                    }
                  }}>
                  <View className="flex-row">
                    <Image
                      source={
                        index === 0
                          ? home
                          : index === 1
                          ? person
                          : index == 2
                          ? chat
                          : index === 3
                          ? info
                          : share
                      }
                      className={` h-[27px] w-[25px] `}
                    />
                    <CustomText font="medium" className="ml-2 text-gray-900 ">
                      {item?.title}
                    </CustomText>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default DrawerMenu;
