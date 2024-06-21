import {View, ScrollView, Keyboard, ToastAndroid} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import TopHeader from '../components/TopHeader';
import InputField from '../components/InputField';
import CustomText from '../components/CustomText';
import ToolsContainer from '../components/ToolsContainer';
import {ALL_LANGUAGES_LIST, VIDEO_CATEGORY_LIST} from '../utils/data';
import CopyButton from '../components/CopyButton';
import Dropdown from '../components/Selector';
import {BASE_URL} from '../utils/BaseUrl';
import AdConatiner from '../components/AdConatiner';
import axios from 'axios';
import {
  TestIds,
  useRewardedInterstitialAd,
} from 'react-native-google-mobile-ads';
import CustomBannerAd from '../components/CustomBannerAd';
import {Ids} from '../utils/ads-Ids';

const DescriptionGenerator = () => {
  const [selectedGenre, setSelectedGenre] = useState('Choose Video Genre');
  const [selectedLanguage, setSelectedLanguage] = useState('Choose Language');
  const [videoTitle, setVideoTitle] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const inputRef = useRef();
  const [loader, setLoader] = useState(false);
  const [videoGenerError, setVideoGenerError] = useState(false);
  const [videoLanguageError, setVideoLanguageError] = useState(false);

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

  const generateVideoDescription = async () => {
    Keyboard.dismiss();
    if (isLoaded) {
      show();
    }
    if (selectedGenre === 'Choose Video Genre') {
      return setVideoGenerError(true);
    }
    if (selectedLanguage === 'Choose Language') {
      return setVideoLanguageError(true);
    }
    setLoader(true);

    const requestData = {
      data: {
        title: videoTitle,
        language: selectedLanguage,
        genre: selectedGenre,
        alphabet: '',
      },
    };
    //console.log(requestData, "red darta");
    await axios
      .post(`${BASE_URL}/ai/generate_descriptions`, requestData)
      .then(result => {
        //console.log(result?.data);
        if (!isLoaded) {
          load();
        }
        // setSearchedData(result?.data);
        setSearchResult(result?.data?.data?.description);
        setLoader(false);
      })
      .catch(error => {
        setLoader(false);
        ToastAndroid.show(
          'Something went wrong try again',
          ToastAndroid.BOTTOM,
        );
        //console.log(error?.message, 'this is error');
      });
  };

  const onReset = () => {
    setSearchResult([]);
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
      <TopHeader title="Description Generator" />
      <View className="px-4 pb-3 bg-secondry ">
        <InputField
          placeholder="Enter Video Title"
          onSearch={() => {
            inputRef?.current?.blur();
            generateVideoDescription();
          }}
          onClose={onReset}
          onFocus={() => setSearchResult([])}
          isComplete={searchResult.length === 0 ? false : true}
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
              onSelect={() => {
                setVideoGenerError(false);
                setSearchResult([]);
              }}
              error={videoGenerError}
            />
          </View>
          <View className=" w-[48%] mr-2 ">
            <Dropdown
              selectedItem={selectedLanguage}
              setSelectedItem={setSelectedLanguage}
              data={ALL_LANGUAGES_LIST}
              onSelect={() => {
                setVideoLanguageError(false);
                setSearchResult([]);
              }}
              error={videoLanguageError}
            />
          </View>
        </View>
      </View>
      <ScrollView>
        <View className="">
          {searchResult?.length === 0 ? (
            <CustomBannerAd adId={inputBannerAdUnitId} />
          ) : (
            <View className="pt-10 ">
              <CustomBannerAd adId={outputBannerAdUnitId1} />
              <View className="px-4 ">
                <ToolsContainer title="Generated Description" className="mt-10">
                  <View className="px-4 py-2 overflow-hidden bg-white rounded-lg ">
                    <CustomText
                      font="medium"
                      style={{lineHeight: 30}}
                      className="text-justify line-clamp-5">
                      {searchResult[0]}
                    </CustomText>
                  </View>
                </ToolsContainer>
              </View>
              <View className="flex-row justify-center my-4">
                <CopyButton text={searchResult[0]} />
              </View>
              <CustomBannerAd adId={outputBannerAdUnitId2} />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default DescriptionGenerator;
