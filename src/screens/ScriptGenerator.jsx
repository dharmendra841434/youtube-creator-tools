import {View, ScrollView, ToastAndroid} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import TopHeader from '../components/TopHeader';
import InputField from '../components/InputField';
import CustomText from '../components/CustomText';
import ToolsContainer from '../components/ToolsContainer';
import {ALL_LANGUAGES_LIST, VIDEO_CATEGORY_LIST} from '../utils/data';
import CopyButton from '../components/CopyButton';
import Dropdown from '../components/Selector';
import axios from 'axios';
import {BASE_URL} from '../utils/BaseUrl';
import {
  TestIds,
  useInterstitialAd,
  useRewardedInterstitialAd,
} from 'react-native-google-mobile-ads';
import CustomBannerAd from '../components/CustomBannerAd';
import {Ids} from '../utils/ads-Ids';

const ScriptGenerator = () => {
  const [searchResult, setSearchResult] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState('Choose Video Genre');
  const [selectedLanguage, setSelectedLanguage] = useState('Choose Language');
  const [videoTitle, setVideoTitle] = useState('');
  const inputRef = useRef();
  const [loader, setLoader] = useState(false);
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

  const generateVideoScript = async () => {
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
    //console.log(requestData, 'red darta');
    await axios
      .post(`${BASE_URL}/ai/generate_script`, requestData)
      .then(result => {
        if (!isLoaded) {
          load();
        }
        //console.log(result?.data);

        setSearchResult(result?.data?.data?.script);
        setLoader(false);
      })
      .catch(error => {
        setLoader(false);
        if (!isLoaded) {
          load();
        }
        ToastAndroid.show(
          'Something went wrong try again',
          ToastAndroid.BOTTOM,
        );
        // console.log(error?.message, 'this is error');
      });
  };

  const onReset = () => {
    setSearchResult(null);
    setVideoTitle('');
    setSelectedGenre('Choose Video Genre');
    setSelectedLanguage('Choose Language');
    inputRef?.current?.focus();
  };

  useEffect(() => {
    load();
  }, [load, isClosed]);

  return (
    <View className="flex-1 bg-secondry">
      <TopHeader title="Script Generator" />
      <View className="px-4 pb-3 bg-secondry ">
        <InputField
          ref={inputRef}
          placeholder="Enter Video Title"
          onSearch={() => {
            inputRef?.current?.blur();
            generateVideoScript();
          }}
          onClose={onReset}
          isComplete={searchResult === null ? false : true}
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
          {!searchResult ? (
            <CustomBannerAd adId={inputBannerAdUnitId} />
          ) : (
            <View>
              <CustomBannerAd adId={outputBannerAdUnitId1} />
              <View className="px-3 ">
                <ToolsContainer title="Generated Script" className="mt-10">
                  <View className="px-4 py-2 overflow-hidden bg-white rounded-lg ">
                    <CustomText
                      font="medium"
                      style={{lineHeight: 30, textAlign: 'justify'}}>
                      {searchResult}
                    </CustomText>
                  </View>
                </ToolsContainer>
              </View>
              <View className="flex-row justify-center my-4">
                <CopyButton text={searchResult} />
              </View>
              <CustomBannerAd adId={outputBannerAdUnitId2} />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ScriptGenerator;
