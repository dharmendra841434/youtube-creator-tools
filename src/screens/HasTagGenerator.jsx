import {View, ScrollView, FlatList, ToastAndroid, Keyboard} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import TopHeader from '../components/TopHeader';
import InputField from '../components/InputField';
import CustomText from '../components/CustomText';
import ToolsContainer from '../components/ToolsContainer';
import {ALL_LANGUAGES_LIST, VIDEO_CATEGORY_LIST} from '../utils/data';
import CopyButton from '../components/CopyButton';
import AdConatiner from '../components/AdConatiner';
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

const HasTagGenerator = () => {
  const [nclm, setNclm] = useState(2);
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

  const generateVideoTags = async () => {
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
      },
    };
    //console.log(requestData, "red darta");
    await axios
      .post(`${BASE_URL}/ai/generate_hashtags`, requestData)
      .then(result => {
        console.log(result?.data);
        if (!isLoaded) {
          load();
        }
        // setSearchedData(result?.data);
        setSearchResult(result?.data?.data?.tags);
        setLoader(false);
      })
      .catch(error => {
        //setSearchedData(null);
        setLoader(false);
        if (!isLoaded) {
          load();
        }
        ToastAndroid.show('Something went wrong try again', ToastAndroid.SHORT);
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
      <TopHeader title="Hashtag Generator" />
      <View className="px-4 pb-3 bg-secondry ">
        <InputField
          placeholder="Enter Video Title"
          onSearch={() => {
            inputRef?.current?.blur();
            generateVideoTags();
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
        {searchResult?.length === 0 ? (
          <CustomBannerAd adId={inputBannerAdUnitId} />
        ) : (
          <View className="">
            <CustomBannerAd adId={outputBannerAdUnitId1} />
            <View className="px-4 ">
              <ToolsContainer title="Hashtag Generator" className="mt-16">
                <View className="p-3 bg-white rounded-xl ">
                  <FlatList
                    data={searchResult}
                    numColumns={nclm}
                    scrollEnabled={false}
                    renderItem={({item, index}) => (
                      <View
                        key={index}
                        className=" bg-secondry w-[45%] m-2 items-center py-2 rounded-lg">
                        <CustomText className="text-center text-appText">
                          #{item}
                        </CustomText>
                      </View>
                    )}
                  />
                </View>
              </ToolsContainer>
            </View>
            <View className="flex-row justify-center my-4">
              <CopyButton text="skudiasudiu" />
            </View>
            <CustomBannerAd adId={outputBannerAdUnitId2} />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default HasTagGenerator;
