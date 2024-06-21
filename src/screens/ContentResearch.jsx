import {View, ScrollView, StyleSheet, ToastAndroid} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import TopHeader from '../components/TopHeader';
import InputField from '../components/InputField';
import CustomText from '../components/CustomText';
import ToolsContainer from '../components/ToolsContainer';
import {ALL_LANGUAGES_LIST, VIDEO_CATEGORY_LIST} from '../utils/data';
import CopyButton from '../components/CopyButton';
import {appColors} from '../utils/appColors';
import axios from 'axios';
import {BASE_URL} from '../utils/BaseUrl';
import Dropdown from '../components/Selector';
import {
  TestIds,
  useInterstitialAd,
  useRewardedInterstitialAd,
} from 'react-native-google-mobile-ads';
import CustomBannerAd from '../components/CustomBannerAd';
import {Ids} from '../utils/ads-Ids';

const ContentResearch = () => {
  const [videoTitle, setVideoTitle] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Choose Video Genre');
  const [selectedLanguage, setSelectedLanguage] = useState('Choose Language');
  const [searchedData, setSearchedData] = useState(null);
  const [loader, setLoader] = useState(false);
  const inputRef = useRef();
  const inputBannerAdUnitId = __DEV__
    ? TestIds.ADAPTIVE_BANNER
    : Ids?.inputScreenBannerId;
  const outputBannerAdUnitId1 = __DEV__
    ? TestIds.ADAPTIVE_BANNER
    : Ids?.outputBannerId1;
  const outputBannerAdUnitId2 = __DEV__
    ? TestIds.ADAPTIVE_BANNER
    : Ids?.outputBannerId2;
  const interstitialAdUnitId = __DEV__
    ? TestIds.REWARDED_INTERSTITIAL
    : Ids?.interstitialsAdId;

  const {isLoaded, isClosed, load, show} =
    useRewardedInterstitialAd(interstitialAdUnitId);

  const onReset = () => {
    setSearchedData(null);
    setVideoTitle('');
    setSelectedGenre('Choose Video Genre');
    setSelectedLanguage('Choose Language');
    inputRef?.current?.focus();
  };

  const getContentData = async () => {
    setLoader(true);
    if (isLoaded) {
      show();
    }
    const requestData = {
      data: {
        title: videoTitle,
        genre: selectedGenre,
        language: selectedLanguage,
        realtime: false,
      },
    };

    await axios
      .post(`${BASE_URL}/ai/generate_content`, requestData)
      .then(result => {
        if (!isLoaded) {
          load();
        }
        //console.log(result?.data);

        setSearchedData(result?.data?.data?.content);
        setLoader(false);
      })
      .catch(error => {
        if (!isLoaded) {
          load();
        }
        setLoader(false);
        ToastAndroid.show(
          'Something went wrong try again',
          ToastAndroid.BOTTOM,
        );
        //console.log(error?.message, 'this is error');
      });
  };

  useEffect(() => {
    load();
  }, [load, isClosed]);

  return (
    <View style={styles.screen}>
      <TopHeader title="Content Research" />
      <View className="px-4 pb-4 bg-secondry ">
        <InputField
          ref={inputRef}
          placeholder="Enter Video Title"
          onSearch={() => {
            inputRef?.current?.blur();
            getContentData();
          }}
          onClose={onReset}
          isComplete={searchedData === null ? false : true}
          onChangeText={t => setVideoTitle(t)}
          loader={loader}
          value={videoTitle}
        />
        <View className="flex-row items-center pt-4 ">
          <View className=" w-[48%] mr-2 ">
            <Dropdown
              selectedItem={selectedGenre}
              setSelectedItem={setSelectedGenre}
              data={VIDEO_CATEGORY_LIST}
            />
          </View>
          <View className=" w-[48%] mr-2 ">
            <Dropdown
              selectedItem={selectedLanguage}
              setSelectedItem={setSelectedLanguage}
              data={ALL_LANGUAGES_LIST}
            />
          </View>
        </View>
      </View>
      <ScrollView>
        <View className="">
          {searchedData ? (
            <View className="pt-10">
              <CustomBannerAd adId={outputBannerAdUnitId1} />
              <View className="px-3 ">
                <ToolsContainer title="Generated Script">
                  <View className="px-4 py-2 overflow-hidden bg-white rounded-lg ">
                    <CustomText
                      font="medium"
                      style={{lineHeight: 30, textAlign: 'justify'}}>
                      {searchedData}
                    </CustomText>
                  </View>
                </ToolsContainer>
              </View>
              <View className="flex-row justify-center my-4">
                <CopyButton text={searchedData} />
              </View>
              <CustomBannerAd adId={outputBannerAdUnitId2} />
            </View>
          ) : (
            <CustomBannerAd adId={inputBannerAdUnitId} />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: appColors.secondry,
  },
});

export default ContentResearch;
