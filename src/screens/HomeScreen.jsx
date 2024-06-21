import {View, Image, ScrollView, FlatList, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import menu from '../assets/images/menu.png';
import logo from '../assets/images/logo.png';
import bell from '../assets/images/bell.png';
import bulb from '../assets/images/bulb.png';
import research from '../assets/images/research.png';
import thumb from '../assets/images/thumbnail.png';
import book from '../assets/images/book.png';
import content from '../assets/images/content.png';
import script from '../assets/images/script.png';
import CustomText from '../components/CustomText';
import ToolsContainer from '../components/ToolsContainer';
import ToolCard from '../components/ToolCard';
import {appColors} from '../utils/appColors';
import {videoTools} from '../utils/data';
import video from '../assets/images/vd.png';
import title from '../assets/images/title.png';
import desc from '../assets/images/desc.png';
import tag from '../assets/images/tag.png';
import hasTag from '../assets/images/hasTag.png';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {TestIds, useInterstitialAd} from 'react-native-google-mobile-ads';
import {getRoutes, saveRoute} from '../utils/helper';
import CustomBannerAd from '../components/CustomBannerAd';
import {Ids} from '../utils/ads-Ids';

const HomeScreen = () => {
  const [nclm, setNclm] = useState(3);
  const navigation = useNavigation();

  const BannerAdUnitId1 = __DEV__
    ? TestIds.ADAPTIVE_BANNER
    : Ids?.homeBannerId1;

  const BannerAdUnitId2 = __DEV__
    ? TestIds.ADAPTIVE_BANNER
    : Ids?.homeBannerId2;

  const InterstitialsAdUnitId = __DEV__
    ? TestIds.INTERSTITIAL
    : Ids?.interstitialsAdId;

  const {isLoaded, isClosed, load, show} = useInterstitialAd(
    InterstitialsAdUnitId,
  );

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (isClosed) {
      // Action after the ad is closed
      getRoutes('route').then(val => {
        navigation.navigate(val);
      });
    }
  }, [isClosed, navigation]);

  useFocusEffect(
    useCallback(() => {
      if (!isLoaded) {
        load();
      }
      return () => {
        // Optional cleanup function
      };
    }, [isLoaded, load]),
  );

  return (
    <View style={styles.screen}>
      <View style={styles.headerContainer}>
        <View style={styles.IconConatiner}>
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}>
            <Image source={menu} style={{width: 30, height: 30}} />
          </TouchableOpacity>
        </View>
        <Image
          source={logo}
          style={{width: 120, height: 30, marginTop: '2%'}}
        />
        <View style={styles.IconConatiner}>
          <TouchableOpacity activeOpacity={0.6}>
            <Image source={bell} style={{width: 30, height: 30}} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View style={{paddingVertical: '5%'}}>
          <View className="px-4 ">
            <ToolsContainer title="Keyword Tools">
              <View style={{flexDirection: 'row'}}>
                <ToolCard
                  style={{width: '49%', marginRight: '3%'}}
                  onPress={() => {
                    if (isLoaded) {
                      saveRoute('route', 'topic_idea');
                      show();
                    }
                  }}>
                  <View style={styles.cardConatiner}>
                    <Image source={bulb} style={{width: 30, height: 30}} />
                    <CustomText
                      style={{
                        color: appColors.appText,
                        width: '70%',
                        textAlign: 'center',
                      }}>
                      Topic Ideas
                    </CustomText>
                  </View>
                </ToolCard>
                <ToolCard
                  style={{width: '49%'}}
                  onPress={() => {
                    if (isLoaded) {
                      saveRoute('route', 'keyword_research');
                      show();
                    }
                  }}>
                  <View style={styles.cardConatiner}>
                    <Image source={research} style={{width: 30, height: 30}} />
                    <CustomText
                      style={{color: appColors.appText, width: '60%'}}>
                      Keyword Research
                    </CustomText>
                  </View>
                </ToolCard>
              </View>
            </ToolsContainer>
            <ToolsContainer title="Thumbnail Tools" style={{marginTop: '10%'}}>
              <View style={{flexDirection: 'row'}}>
                <ToolCard
                  onPress={() => {
                    if (isLoaded) {
                      saveRoute('route', 'thumbnail_quality');
                      show();
                    }
                  }}
                  style={{width: '49%', marginRight: '3%'}}>
                  <View style={styles.cardConatiner}>
                    <Image source={thumb} style={{width: 30, height: 25}} />
                    <CustomText
                      style={{
                        color: appColors.appText,
                        width: '80%',
                        textAlign: 'center',
                      }}>
                      Thumbnail Quality Checker
                    </CustomText>
                  </View>
                </ToolCard>
                <ToolCard
                  onPress={() => {
                    if (isLoaded) {
                      saveRoute('route', 'thumbnail_guid');
                      show();
                    }
                  }}
                  style={{width: '49%', marginRight: '2%'}}>
                  <View style={styles.cardConatiner}>
                    <Image source={book} style={{width: 30, height: 23}} />
                    <CustomText
                      style={{
                        color: appColors.appText,
                        width: '60%',
                        textAlign: 'center',
                      }}>
                      Thumbnail Guide
                    </CustomText>
                  </View>
                </ToolCard>
              </View>
            </ToolsContainer>
          </View>

          <CustomBannerAd adId={BannerAdUnitId1} />
          <View className="px-4 ">
            <ToolsContainer
              title="Content Creation Tools"
              style={{marginTop: '5%'}}>
              <View style={{flexDirection: 'row'}}>
                <ToolCard
                  style={{width: '49%', marginRight: '2%'}}
                  onPress={() => {
                    if (isLoaded) {
                      saveRoute('route', 'content');
                      show();
                    }
                  }}>
                  <View style={styles.cardConatiner}>
                    <Image source={content} style={{width: 27, height: 30}} />
                    <CustomText
                      style={{
                        color: appColors.appText,
                        width: '60%',
                        textAlign: 'center',
                      }}>
                      Content Research
                    </CustomText>
                  </View>
                </ToolCard>
                <ToolCard
                  onPress={() => {
                    if (isLoaded) {
                      saveRoute('route', 'script');
                      show();
                    }
                  }}
                  style={{width: '49%', marginRight: '2%'}}>
                  <View style={styles.cardConatiner}>
                    <Image source={script} style={{width: 30, height: 30}} />
                    <View style={{alignItems: 'center', width: '60%'}}>
                      <CustomText>Script</CustomText>
                      <CustomText>Generator</CustomText>
                    </View>
                  </View>
                </ToolCard>
              </View>
            </ToolsContainer>
            <ToolsContainer title="Video Tools" style={{marginTop: '10%'}}>
              <FlatList
                data={videoTools}
                scrollEnabled={false}
                numColumns={nclm}
                renderItem={({item, index}) => (
                  <ToolCard
                    onPress={() => {
                      if (isLoaded) {
                        saveRoute('route', item.route);
                        show();
                      }
                    }}
                    style={{width: '31.1%', margin: 4}}>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: 20,
                      }}>
                      <Image
                        source={
                          index === 0
                            ? video
                            : index === 1
                            ? title
                            : index === 2
                            ? desc
                            : index === 3
                            ? tag
                            : hasTag
                        }
                        className={` h-[30px] w-[30px]`}
                      />
                      <CustomText style={{marginTop: 10}}>
                        {item?.title?.split(' ')[0]}
                      </CustomText>
                      <CustomText>{item?.title?.split(' ')[1]}</CustomText>
                    </View>
                  </ToolCard>
                )}
              />
            </ToolsContainer>
          </View>

          <CustomBannerAd adId={BannerAdUnitId2} />
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '4%',
    paddingVertical: '3%',
  },
  IconConatiner: {
    backgroundColor: appColors.primary,
    borderRadius: 50,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 24,
    paddingHorizontal: 5,
  },
});

export default HomeScreen;
