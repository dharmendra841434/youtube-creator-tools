import {
  View,
  FlatList,
  ScrollView,
  StyleSheet,
  Keyboard,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import TopHeader from '../components/TopHeader';
import InputField from '../components/InputField';
import CustomText from '../components/CustomText';
import ToolsContainer from '../components/ToolsContainer';
import {appColors} from '../utils/appColors';
import {BASE_URL} from '../utils/BaseUrl';
import axios from 'axios';
import {
  TestIds,
  useRewardedInterstitialAd,
} from 'react-native-google-mobile-ads';
import {Ids} from '../utils/ads-Ids';
import CustomBannerAd from '../components/CustomBannerAd';

const TopicIdeas = () => {
  const [videoLink, setVideoLink] = useState('');
  const [loader, setLoader] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
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

  const getTopicIdeaData = async () => {
    Keyboard.dismiss();
    if (isLoaded) {
      show();
    }
    setLoader(true);
    const requestData = {
      url: videoLink,
    };

    await axios
      .post(`${BASE_URL}/recommended-keywords`, requestData)
      .then(result => {
        if (!isLoaded) {
          load();
        }
        // console.log(result?.data);
        setSearchResult(result?.data?.response?.recommendations);
        setLoader(false);
      })
      .catch(error => {
        //setSearchedData(null);
        setLoader(false);
        ToastAndroid.show(
          'Something went wrong try again',
          ToastAndroid.BOTTOM,
        );
        // console.log(error?.message, 'this is error');
      });
  };

  useEffect(() => {
    load();
  }, [load, isClosed]);

  return (
    <View style={styles.screen}>
      <TopHeader title="Topic Ideas" />
      <View style={{paddingHorizontal: '4%', paddingBottom: '3%'}}>
        <InputField
          onChangeText={t => setVideoLink(t)}
          value={videoLink}
          loader={loader}
          onSearch={getTopicIdeaData}
          onClose={() => {
            setVideoLink('');
            setSearchResult([]);
          }}
          isComplete={searchResult?.length !== 0}
          placeholder="Enter Your/Competitor Video Link"
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {searchResult?.length === 0 ? (
            <CustomBannerAd adId={inputBannerAdUnitId} />
          ) : (
            <>
              <CustomBannerAd adId={outputBannerAdUnitId1} />
              <View className="p-4 ">
                <ToolsContainer title="Generated Ideas">
                  <View
                    style={{
                      backgroundColor: appColors.appWhite,
                      paddingHorizontal: '3%',
                      paddingVertical: '4%',
                      borderRadius: 10,
                    }}>
                    <FlatList
                      data={searchResult}
                      scrollEnabled={false}
                      renderItem={({item, index}) => (
                        <View
                          key={index}
                          style={{
                            padding: '3%',
                            marginVertical: 10,
                            backgroundColor: appColors.secondry,
                            borderRadius: 8,
                          }}>
                          <CustomText>{item}</CustomText>
                        </View>
                      )}
                    />
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: appColors.secondry,
  },
});

export default TopicIdeas;
