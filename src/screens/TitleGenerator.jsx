import {View, ScrollView, ToastAndroid, Keyboard} from 'react-native';
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

const TitleGenerator = () => {
  const [selectedGenre, setSelectedGenre] = useState('Choose Video Genre');
  const [selectedLanguage, setSelectedLanguage] = useState('Choose Language');
  const [inputKeyword, setInputKeyword] = useState('');
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

  const generateVideoTitle = async () => {
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
        keywords: inputKeyword,
        language: selectedLanguage,
        genre: selectedGenre,
        alphabet: '',
        advanceSearch: false,
        advanceSearchResult: [],
      },
    };
    //console.log(requestData, "red darta");
    await axios
      .post(`${BASE_URL}/ai/generate_titles`, requestData)
      .then(result => {
        //console.log(result?.data);
        if (!isLoaded) {
          load();
        }
        // setSearchedData(result?.data);

        setSearchResult(result?.data?.data?.titles);
        setLoader(false);
      })
      .catch(error => {
        //setSearchedData(null);
        setLoader(false);
        if (!isLoaded) {
          show();
        }
        ToastAndroid.show(
          'Something went wrong try again',
          ToastAndroid.BOTTOM,
        );
        // console.log(error?.message, 'this is error');
      });
  };

  const onReset = () => {
    setSearchResult([]);
    setInputKeyword('');
    setSelectedGenre('Choose Video Genre');
    setSelectedLanguage('Choose Language');
    inputRef?.current?.focus();
  };

  useEffect(() => {
    load();
  }, [load, isClosed]);

  return (
    <View className="flex-1 bg-secondry">
      <TopHeader title="Title Generator" />
      <View className="px-4 pb-3 bg-secondry ">
        <InputField
          placeholder="Enter Keywords To Generate Title"
          onSearch={() => {
            inputRef?.current?.blur();
            generateVideoTitle();
          }}
          onClose={onReset}
          onFocus={() => setSearchResult([])}
          isComplete={searchResult.length === 0 ? false : true}
          onChangeText={t => setInputKeyword(t)}
          loader={loader}
          value={inputKeyword}
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
              <View className="px-3 ">
                <ToolsContainer title="Generated Titles">
                  <View className="">
                    {searchResult?.map((item, index) => (
                      <View
                        key={index}
                        className="flex-row items-center justify-between my-2 ">
                        <View className="p-3 bg-white rounded-lg w-[82%] ">
                          <CustomText>
                            {index + 1}. {item}
                          </CustomText>
                        </View>
                        <CopyButton
                          text={item}
                          isText={true}
                          className="w-8 h-8 "
                        />
                      </View>
                    ))}
                  </View>
                </ToolsContainer>
              </View>
              <CustomBannerAd adId={outputBannerAdUnitId2} />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default TitleGenerator;
