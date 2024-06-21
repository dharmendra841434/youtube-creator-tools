import {
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import back from '../assets/images/back.png';
import InputField from '../components/InputField';
import {useNavigation} from '@react-navigation/native';
import ToolsContainer from '../components/ToolsContainer';
import CustomText from '../components/CustomText';
import {appColors} from '../utils/appColors';
import {videoStats} from '../utils/data';
import view from '../assets/images/view.png';
import like from '../assets/images/like.png';
import comment from '../assets/images/comment.png';
import axios from 'axios';
import {BASE_URL} from '../utils/BaseUrl';
import {convertDateFormat, convertToReadableFormat} from '../utils/helper';
import ProgressChart from '../components/charts/ProgressChart';
import {
  TestIds,
  useRewardedInterstitialAd,
} from 'react-native-google-mobile-ads';
import CustomBannerAd from '../components/CustomBannerAd';
import {Ids} from '../utils/ads-Ids';
import VideoOptimizationChart from '../components/charts/VideoOptimizationChart';

const VideoOptimization = () => {
  const navigation = useNavigation();
  const [nclm, setNclm] = useState(2);
  const [videoUrl, setVideoUrl] = useState('');
  const [loader, setLoader] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [videoDetails, setVideoDetails] = useState([]);

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

  const getVideoDetails = async () => {
    setLoader(true);
    if (isLoaded) {
      show();
    }
    await axios
      .post(`${BASE_URL}/Video_Audit_Report`, {url: videoUrl})
      .then(result => {
        //console.log(result?.data);
        if (!isLoaded) {
          load();
        }
        setSearchResult(result?.data?.data);
        setVideoDetails(result?.data?.videoDetails?.data?.items[0]);
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
    setVideoUrl('');
    setSearchResult([]);
  };

  useEffect(() => {
    load();
  }, [load, isClosed]);

  return (
    <View className="flex-1 bg-secondry">
      <View className="flex-row items-center justify-between px-3 py-4 ">
        <View className="items-center justify-center p-2 rounded-full bg-primary">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={back} className=" h-7 w-7" />
          </TouchableOpacity>
        </View>
        <View className=" w-[85%]">
          <InputField
            style={{borderRadius: 28}}
            placeholder="Enter Video Link"
            onSearch={() => {
              getVideoDetails();
            }}
            onClose={onReset}
            isComplete={searchResult.length === 0 ? false : true}
            onChangeText={t => setVideoUrl(t)}
            loader={loader}
            value={videoUrl}
          />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingVertical: '4%'}}>
          {searchResult?.length === 0 ? (
            <CustomBannerAd adId={inputBannerAdUnitId} />
          ) : (
            <View>
              <View className="px-3 ">
                <ToolsContainer title="Video Details">
                  <View className="flex-row p-3 bg-white rounded-lg">
                    {videoDetails?.length !== 0 && (
                      <Image
                        source={{
                          uri:
                            videoDetails?.snippet?.thumbnails?.default?.url !==
                              null &&
                            videoDetails?.snippet?.thumbnails?.default?.url,
                        }}
                        className=" w-[40%] h-20 rounded-lg"
                      />
                    )}
                    <View className=" w-[60%] ml-4">
                      <CustomText
                        style={{fontSize: 11, color: appColors.appText}}>
                        {videoDetails?.snippet?.title}
                      </CustomText>
                      <CustomText
                        style={{
                          fontSize: 8,
                          color: appColors.appGray,
                          paddingVertical: 3,
                        }}>
                        Published On{' '}
                        {convertDateFormat(videoDetails?.snippet?.publishedAt)}
                      </CustomText>
                      <View>
                        <FlatList
                          data={videoStats}
                          numColumns={nclm}
                          scrollEnabled={false}
                          renderItem={({item, index}) => (
                            <View
                              key={index}
                              className={` flex-row  w-[42%] m-1 items-center py-1 justify-between  rounded-md  bg-borderGray/60  px-5 `}>
                              <Image
                                source={
                                  index == 0
                                    ? view
                                    : index == 1
                                    ? like
                                    : comment
                                }
                                className={` ${
                                  index == 0 ? 'h-2 w-[16px]' : 'w-3 h-3'
                                } `}
                              />
                              <CustomText
                                style={{fontSize: 9, color: appColors.appText}}>
                                {index == 0
                                  ? convertToReadableFormat(
                                      videoDetails?.statistics?.viewCount,
                                    )
                                  : index == 1
                                  ? convertToReadableFormat(
                                      videoDetails?.statistics?.likeCount,
                                    )
                                  : convertToReadableFormat(
                                      videoDetails?.statistics?.commentCount,
                                    )}
                              </CustomText>
                            </View>
                          )}
                        />
                      </View>
                    </View>
                  </View>
                </ToolsContainer>
                <ToolsContainer
                  title="Video Optimization Score"
                  style={{marginTop: '10%'}}>
                  <View className="flex-row ">
                    <View className=" w-[60%] pr-3 justify-center ">
                      <VideoOptimizationChart
                        progress={
                          (searchResult?.description_score +
                            searchResult?.hashtags_score +
                            searchResult?.title_score +
                            searchResult?.tags_score) /
                          4
                        }
                        title="Overall Optimization Score"
                      />
                    </View>
                    <View className=" w-[40%]">
                      <View
                        style={{elevation: 1}}
                        className="flex-row items-center justify-between p-2 bg-white rounded-lg ">
                        <CustomText
                          style={{fontSize: 12, color: appColors.appText}}>
                          Description Score :
                        </CustomText>
                        <CustomText
                          font="bold"
                          style={{fontSize: 12, color: appColors.primary}}>
                          {searchResult?.description_score}
                        </CustomText>
                      </View>
                      <View
                        style={{elevation: 1}}
                        className="flex-row items-center justify-between p-2 mt-1 bg-white rounded-lg ">
                        <CustomText
                          style={{fontSize: 12, color: appColors.appText}}>
                          Hashtags Score :
                        </CustomText>
                        <CustomText
                          font="bold"
                          style={{fontSize: 12, color: appColors.primary}}>
                          {searchResult?.hashtags_score}
                        </CustomText>
                      </View>
                      <View
                        style={{elevation: 1}}
                        className="flex-row items-center justify-between p-2 mt-1 bg-white rounded-lg ">
                        <CustomText
                          style={{fontSize: 12, color: appColors.appText}}>
                          Title Score :
                        </CustomText>
                        <CustomText
                          font="bold"
                          style={{fontSize: 12, color: appColors.primary}}>
                          {searchResult?.title_score}
                        </CustomText>
                      </View>
                      <View
                        style={{elevation: 1}}
                        className="flex-row items-center justify-between p-2 mt-1 bg-white rounded-lg ">
                        <CustomText
                          style={{fontSize: 12, color: appColors.appText}}>
                          Tags Score :
                        </CustomText>
                        <CustomText
                          font="bold"
                          style={{fontSize: 12, color: appColors.primary}}>
                          {searchResult?.tags_score}
                        </CustomText>
                      </View>
                    </View>
                  </View>
                </ToolsContainer>
              </View>
              <CustomBannerAd adId={outputBannerAdUnitId1} />
              <View className="px-3 ">
                <ToolsContainer
                  title="Video Optimization Suggestions"
                  style={{marginTop: '5%'}}>
                  <View className="p-3 bg-white rounded-lg ">
                    <CustomText>
                      {searchResult?.suggestions === ''
                        ? 'No Suggestions'
                        : searchResult?.suggestions}
                    </CustomText>
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

export default VideoOptimization;
