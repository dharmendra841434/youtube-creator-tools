import {
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import InputField from '../components/InputField';
import TopHeader from '../components/TopHeader';
import CustomText from '../components/CustomText';
import ToolsContainer from '../components/ToolsContainer';
import TextArea from '../components/charts/TextArea';
import axios from 'axios';
import {BASE_URL} from '../utils/BaseUrl';
import {appColors} from '../utils/appColors';
import {
  TestIds,
  useRewardedInterstitialAd,
} from 'react-native-google-mobile-ads';
import CustomBannerAd from '../components/CustomBannerAd';
import {Ids} from '../utils/ads-Ids';

const ThumbnailGuid = () => {
  const [videoTitle, setVideoTitle] = useState('');
  const [videoScript, setVideoScript] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [loader, setLoader] = useState(false);
  const [fieldError, setFieldError] = useState(false);

  const inputBannerAdUnitId = __DEV__
    ? TestIds.ADAPTIVE_BANNER
    : Ids?.inputScreenBannerId;
  const outputBannerAdUnitId1 = __DEV__
    ? TestIds.ADAPTIVE_BANNER
    : Ids?.outputBannerId1;
  const outputBannerAdUnitId2 = __DEV__
    ? TestIds.ADAPTIVE_BANNER
    : Ids?.outputBannerId2;

  const rewardedAdUnitId = __DEV__
    ? TestIds.REWARDED_INTERSTITIAL
    : Ids?.rewardAdId;

  const {isLoaded, isClosed, load, show} =
    useRewardedInterstitialAd(rewardedAdUnitId);

  const getThumbnailSuggetions = async () => {
    if (isLoaded) {
      show();
    }
    if (!videoTitle || !videoScript) {
      return setFieldError(true);
    }
    setLoader(true);

    const requestData = {
      formValues: {
        videoTitle: videoTitle,
        script: videoScript,
      },
    };
    //console.log(requestData, "red darta");
    await axios
      .post(`${BASE_URL}/user/get-thumbnail-suggestions`, requestData)
      .then(result => {
        if (!isLoaded) {
          load();
        }
        // console.log(result?.data?.data);
        setSearchResult(result?.data?.data);
        setLoader(false);
      })
      .catch(error => {
        //setSearchedData(null);
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
    <View className="flex-1 bg-secondry">
      <TopHeader title="Thumbnail Guide" titleStyle={{marginLeft: '12%'}} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="">
          <View className="px-3 ">
            <InputField
              isSearch={true}
              placeholder="Enter Video Title"
              value={videoTitle}
              onFocus={() => setFieldError(false)}
              onChangeText={t => setVideoTitle(t)}
            />
            <View
              style={{elevation: 3}}
              className="px-3 my-4 bg-white rounded-lg h-80">
              <TextArea
                value={videoScript}
                onFocus={() => setFieldError(false)}
                placeholder="Enter Video Script"
                onChangeText={t => setVideoScript(t)}
              />
            </View>
          </View>
          <View className="px-3 h-7">
            {fieldError && (
              <CustomText className="text-red-800 ">
                All fields are required!!{' '}
              </CustomText>
            )}
          </View>
          <View className="items-center my-3 ">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                if (!searchResult) {
                  getThumbnailSuggetions();
                  return;
                } else {
                  setVideoScript('');
                  setVideoTitle('');
                  setSearchResult('');
                }
              }}
              className="px-6 py-3 bg-primary rounded-3xl">
              {loader ? (
                <ActivityIndicator color={appColors.appWhite} />
              ) : (
                <>
                  {searchResult ? (
                    <CustomText className="text-white ">Clear</CustomText>
                  ) : (
                    <CustomText className="text-white ">
                      Get Suggestions
                    </CustomText>
                  )}
                </>
              )}
            </TouchableOpacity>
          </View>

          {searchResult ? (
            <View>
              <CustomBannerAd adId={outputBannerAdUnitId1} />
              <ToolsContainer title="Thumbnail Suggestions">
                <View className="p-3 bg-white rounded-lg ">
                  <CustomText
                    className="my-1 line-clamp-3"
                    style={{lineHeight: 30}}>
                    {searchResult?.thumbnail_suggestions}
                  </CustomText>
                </View>
              </ToolsContainer>
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

export default ThumbnailGuid;
