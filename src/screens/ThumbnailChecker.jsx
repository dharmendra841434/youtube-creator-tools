import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import TopHeader from '../components/TopHeader';
import CustomText from '../components/CustomText';
import ToolsContainer from '../components/ToolsContainer';
import InputField from '../components/InputField';
import upload from '../assets/images/Upload.png';
import ImagePicker from 'react-native-image-crop-picker';
import {getFilename} from '../utils/helper';
import close from '../assets/images/close.png';
import preview from '../assets/images/preview.png';
import ok from '../assets/images/done2.png';
import redClose from '../assets/images/redClose.png';
import {appColors} from '../utils/appColors';
import axios from 'axios';
import {BASE_URL} from '../utils/BaseUrl';
import ProgressChart from '../components/charts/ProgressChart';
import {
  TestIds,
  useRewardedInterstitialAd,
} from 'react-native-google-mobile-ads';
import CustomBannerAd from '../components/CustomBannerAd';
import {Ids} from '../utils/ads-Ids';

const ThumbnailChecker = () => {
  const [imgUrl, setImgUrl] = useState('');
  const [imageLoader, setImageLoader] = useState(false);
  const [videoTitle, setVideoTitle] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loader, setLoader] = useState(false);
  const [brandName, setBrandName] = useState('');
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

  const selectThumbanil = async () => {
    setImageLoader(true);
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      mediaType: 'photo',
    })
      .then(async image => {
        let path = image?.path;
        console.log(image);
        const formData = new FormData();
        formData.append('file', {
          uri: Platform.OS === 'android' ? image.path : image.sourceURL,
          type: image.mime, // Adjust MIME type as necessary
          name: getFilename(path),
        });
        await axios
          .post(`${BASE_URL}/user/upload-to-google-bucket-storage`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(result => {
            // console.log(result?.data);
            setImgUrl(result?.data?.publicUrl);
            // setSearchedData(result?.data);
            setImageLoader(false);
          })
          .catch(error => {
            //setSearchedData(null);
            //setLoader(false);
            setImageLoader(false);
            //console.log(error?.message, 'this is error');
          });
        // uploadImageToGCS(path);
      })
      .catch(err => {
        setImageLoader(false);
        ToastAndroid.show(
          'Something went wrong try again',
          ToastAndroid.BOTTOM,
        );
        // console.log(err, 'error');
      });
  };

  const checkThumbnailQuality = async () => {
    setLoader(true);
    if (isLoaded) {
      show();
    }
    const requestData = {
      formValues: {
        videoTitle: videoTitle,
        thumbnail: imgUrl,
        brandName: brandName,
        brandLogo: '',
        userProfile: '',
      },
    };

    //console.log(requestData, "red darta");
    await axios
      .post(`${BASE_URL}/user/get-thumbnail-quality`, requestData)
      .then(result => {
        if (!isLoaded) {
          load();
        }
        //console.log(result?.data);
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

  const resetForm = () => {
    setVideoTitle('');
    setBrandName('');
    setImgUrl('');
    setImageLoader(false);
    setSearchResult([]);
  };

  //console.log(searchResult);

  useEffect(() => {
    load();
  }, [load, isClosed]);

  return (
    <View className="flex-1 bg-secondry">
      <TopHeader
        title="Thumbnail Quality Checker"
        titleStyle={{marginLeft: '12%'}}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="">
          <View className="px-3 ">
            <InputField
              isSearch={true}
              placeholder="Enter Video Title"
              value={videoTitle}
              onChangeText={t => setVideoTitle(t)}
            />
            <InputField
              isSearch={true}
              placeholder="Enter Brand Name"
              style={{marginTop: '5%'}}
              value={brandName}
              onChangeText={t => setBrandName(t)}
            />
          </View>
          <View className="flex-row items-center px-3 my-4 ">
            <View
              style={{elevation: 3}}
              className="bg-white w-[65%] px-3 py-4 rounded-lg ">
              <CustomText
                numberOfLines={1}
                ellipsizeMode="head"
                className={` ${imgUrl ? 'text-gray-800' : 'text-gray-400'} `}>
                {imgUrl ? getFilename(imgUrl) : 'Upload Thumbnail...'}
              </CustomText>
            </View>
            <View style={{elevation: 3}} className="ml-3 bg-white rounded-lg">
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => selectThumbanil()}>
                <View className="flex-row items-center px-4 py-3 ">
                  <Image source={upload} className="w-6 h-6 mr-2 " />
                  <CustomText>Upload</CustomText>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {imgUrl ? (
            <View className="items-center px-3 my-3 ">
              <Image
                source={{uri: imgUrl}}
                className="w-[80%] h-36 rounded-lg "
              />
              <View className="absolute p-2 rounded-full bg-primary -top-3 right-6">
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    setImageLoader(false);
                    setImgUrl('');
                  }}>
                  <Image source={close} className="w-5 h-5 " />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View className="items-center py-5 mx-3 my-3 border border-gray-300 rounded-xl ">
              {imageLoader ? (
                <ActivityIndicator color={appColors?.primary} size={35} />
              ) : (
                <>
                  <Image
                    source={preview}
                    className="w-[20%] h-16 rounded-lg "
                  />
                  <CustomText>Thumbnail Preview</CustomText>
                </>
              )}
            </View>
          )}
          <View className="items-center my-5 ">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                if (searchResult?.length !== 0) {
                  resetForm();
                } else {
                  checkThumbnailQuality();
                }
              }}
              className="px-6 py-3 bg-primary rounded-3xl">
              {loader ? (
                <ActivityIndicator color={appColors.appWhite} />
              ) : (
                <>
                  {searchResult?.length !== 0 ? (
                    <CustomText className="text-white ">Clear</CustomText>
                  ) : (
                    <CustomText className="text-white ">
                      Check Quality
                    </CustomText>
                  )}
                </>
              )}
            </TouchableOpacity>
          </View>

          {searchResult?.length === 0 ? (
            <CustomBannerAd adId={inputBannerAdUnitId} />
          ) : (
            <>
              <CustomBannerAd adId={outputBannerAdUnitId1} />
              <View className="px-4 ">
                <ToolsContainer
                  title="Thumbnail Quality Score"
                  style={{marginVertical: '10%'}}>
                  <View className="flex-row ">
                    <View className=" w-[60%] pr-3 justify-center ">
                      <ProgressChart
                        range={100}
                        progress={searchResult?.score}
                        title="Overall Quality Meter"
                      />
                      <View className="items-center mt-5">
                        <CustomText
                          font="semibold"
                          className="text-xl text-black ">
                          Feedback
                        </CustomText>
                        <CustomText>{searchResult?.feedback}</CustomText>
                        {/* <Image source={ok} className="w-20 h-20 " /> */}
                      </View>
                    </View>
                    <View className=" w-[40%]">
                      <View
                        style={{elevation: 1}}
                        className="flex-row items-center justify-between p-2 mt-2 bg-white rounded-lg ">
                        <CustomText
                          style={{fontSize: 12, color: appColors.appText}}>
                          Aspect Ratio :
                        </CustomText>
                        {searchResult?.factors?.aspect_ratio_core ? (
                          <Image source={ok} className="w-3 h-3 " />
                        ) : (
                          <Image source={redClose} className="w-3 h-3 " />
                        )}
                      </View>
                      <View
                        style={{elevation: 1}}
                        className="flex-row items-center justify-between p-2 mt-2 bg-white rounded-lg ">
                        <CustomText
                          style={{fontSize: 12, color: appColors.appText}}>
                          Brand Identity :
                        </CustomText>
                        {searchResult?.factors?.brand_identity_score ? (
                          <Image source={ok} className="w-3 h-3 " />
                        ) : (
                          <Image source={redClose} className="w-3 h-3 " />
                        )}
                      </View>

                      <View
                        style={{elevation: 1}}
                        className="flex-row items-center justify-between p-2 mt-2 bg-white rounded-lg ">
                        <CustomText
                          style={{fontSize: 12, color: appColors.appText}}>
                          Color Palette :
                        </CustomText>
                        {searchResult?.factors?.color_palette ? (
                          <Image source={ok} className="w-3 h-3 " />
                        ) : (
                          <Image source={redClose} className="w-3 h-3 " />
                        )}
                      </View>

                      <View
                        style={{elevation: 1}}
                        className="flex-row items-center justify-between p-2 mt-2 bg-white rounded-lg ">
                        <CustomText
                          style={{fontSize: 12, color: appColors.appText}}>
                          'Font Size' :
                        </CustomText>
                        {searchResult?.factors?.font_size_score ? (
                          <Image source={ok} className="w-3 h-3 " />
                        ) : (
                          <Image source={redClose} className="w-3 h-3 " />
                        )}
                      </View>

                      <View
                        style={{elevation: 1}}
                        className="flex-row items-center justify-between p-2 mt-2 bg-white rounded-lg ">
                        <CustomText
                          style={{fontSize: 12, color: appColors.appText}}>
                          'NSFW' :
                        </CustomText>
                        {searchResult?.factors?.nsfw_score ? (
                          <Image source={ok} className="w-3 h-3 " />
                        ) : (
                          <Image source={redClose} className="w-3 h-3 " />
                        )}
                      </View>

                      <View
                        style={{elevation: 1}}
                        className="flex-row items-center justify-between p-2 mt-2 bg-white rounded-lg ">
                        <CustomText
                          style={{fontSize: 12, color: appColors.appText}}>
                          Sentiment :
                        </CustomText>
                        {searchResult?.factors?.semtiment_score ? (
                          <Image source={ok} className="w-3 h-3 " />
                        ) : (
                          <Image source={redClose} className="w-3 h-3 " />
                        )}
                      </View>
                      <View
                        style={{elevation: 1}}
                        className="flex-row items-center justify-between p-2 mt-2 bg-white rounded-lg ">
                        <CustomText
                          style={{fontSize: 12, color: appColors.appText}}>
                          Similarity : :
                        </CustomText>
                        {searchResult?.factors?.similarity_score ? (
                          <Image source={ok} className="w-3 h-3 " />
                        ) : (
                          <Image source={redClose} className="w-3 h-3 " />
                        )}
                      </View>
                      <View
                        style={{elevation: 1}}
                        className="flex-row items-center justify-between p-2 mt-2 bg-white rounded-lg ">
                        <CustomText
                          style={{fontSize: 12, color: appColors.appText}}>
                          White Space :
                        </CustomText>
                        {searchResult?.factors?.white_space_score ? (
                          <Image source={ok} className="w-3 h-3 " />
                        ) : (
                          <Image source={redClose} className="w-3 h-3 " />
                        )}
                      </View>
                    </View>
                  </View>
                </ToolsContainer>
              </View>
              <CustomBannerAd adId={outputBannerAdUnitId2} />
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ThumbnailChecker;
