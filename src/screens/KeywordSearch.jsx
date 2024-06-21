import {
  ScrollView,
  StyleSheet,
  View,
  Keyboard,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import TopHeader from '../components/TopHeader';
import InputField from '../components/InputField';
import CustomText from '../components/CustomText';
import ToolsContainer from '../components/ToolsContainer';
import {tableHeader} from '../utils/data';
import {appColors} from '../utils/appColors';
import axios from 'axios';
import ProgressChart from '../components/charts/ProgressChart';
import {BASE_URL} from '../utils/BaseUrl';
import RelatedKeywordTable from '../components/RelatedKeywordTable';
import {
  TestIds,
  useInterstitialAd,
  useRewardedInterstitialAd,
} from 'react-native-google-mobile-ads';
import CustomBannerAd from '../components/CustomBannerAd';
import {Ids} from '../utils/ads-Ids';

const KeywordSearch = () => {
  const [keyword, setKeyword] = useState('');
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

  const interstitialsAdUnitId = __DEV__
    ? TestIds.REWARDED_INTERSTITIAL
    : Ids?.interstitialsAdId;

  const {isLoaded, isClosed, load, show} = useRewardedInterstitialAd(
    interstitialsAdUnitId,
  );
  const getKeywordData = async () => {
    Keyboard.dismiss();
    if (isLoaded) {
      show();
    }
    setLoader(true);
    //console.log(requestData, "red darta");
    await axios
      .get(`${BASE_URL}/get-Related-keywords?keyword=${keyword}`)
      .then(result => {
        if (!isLoaded) {
          load();
        }
        // console.log(result?.data);
        setSearchResult(result?.data);

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
    <View style={styles.screen}>
      <TopHeader title="Keyword Research" />
      <View style={{paddingHorizontal: '4%', paddingBottom: '3%'}}>
        <InputField
          onChangeText={t => setKeyword(t)}
          value={keyword}
          loader={loader}
          onSearch={getKeywordData}
          onClose={() => {
            setKeyword('');
            setSearchResult([]);
          }}
          isComplete={searchResult?.length !== 0}
          placeholder="Enter keyword"
        />
      </View>
      <ScrollView>
        <View className="py-10 ">
          {searchResult?.length === 0 ? (
            <CustomBannerAd adId={inputBannerAdUnitId} />
          ) : (
            <View className="">
              <CustomBannerAd adId={outputBannerAdUnitId1} />
              <View className="px-4 ">
                <ToolsContainer title="Keyword Score" style={{marginTop: '5%'}}>
                  <View className="px-2 bg-white rounded-lg ">
                    <ProgressChart
                      range={100}
                      progress={searchResult?.exact_keyword[0]?.overallscore}
                      title="Overall Score"
                    />
                    <ProgressChart
                      range={100}
                      progress={
                        searchResult?.exact_keyword[0]?.competition_score
                      }
                      title="Competitor Score"
                    />
                  </View>
                </ToolsContainer>
              </View>

              <View className="px-4 ">
                <ToolsContainer
                  title="Related Keyword"
                  style={{marginTop: '10%'}}>
                  <View
                    style={{
                      backgroundColor: appColors.appWhite,
                      borderRadius: 10,
                      overflow: 'hidden',
                    }}>
                    <View
                      style={{
                        backgroundColor: '#606060',
                        flexDirection: 'row',
                        paddingVertical: '2%',
                      }}>
                      {tableHeader?.map((item, index) => (
                        <View
                          key={index}
                          style={{
                            width: index === 0 ? '36%' : '16%',
                            paddingLeft: index === 0 && 10,
                            paddingRight: index === 4 && 2,
                          }}>
                          <CustomText
                            style={{
                              fontSize: 9,
                              color: appColors.appWhite,
                              textAlign: index !== 0 ? 'center' : 'start',
                            }}>
                            {item}
                          </CustomText>
                        </View>
                      ))}
                    </View>
                    <RelatedKeywordTable
                      data={searchResult?.related_keywords}
                    />
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: appColors.secondry,
  },
});

export default KeywordSearch;
