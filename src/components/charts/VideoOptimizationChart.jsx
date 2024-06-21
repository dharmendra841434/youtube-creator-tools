import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../CustomText';
import arrow from '../../assets/images/arr.png';
import {appColors} from '../../utils/appColors';

const VideoOptimizationChart = ({progress, title}) => {
  const [markPlace, setMarkPlace] = useState(progress * 10);
  return (
    <View className="w-[100%] bg-transparent pb-4  ">
      <CustomText className="my-2 text-center">{title}</CustomText>
      <View className="flex-row items-center justify-between px-2 ">
        <CustomText className="text-[11px]">0</CustomText>
        <CustomText className="text-[11px] ml-4">5</CustomText>
        <CustomText className="text-[11px]">10</CustomText>
      </View>
      <LinearGradient
        colors={['#ff0000', '#ffa500', '#ffff00', '#5bfa46', '#008000']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{
          height: 20,
          width: '100%',
          backgroundColor: 'red',
          borderRadius: 20,
        }}
      />
      <View style={{position: 'relative'}} className="relative w-[95%] ">
        <Image
          source={arrow}
          tintColor={appColors?.primary}
          style={{marginLeft: `${markPlace}%`}}
          className="w-5 h-5 -rotate-90 "
        />
      </View>
      <View className="items-center px-3 mt-2 rounded-2xl">
        <CustomText
          style={{elevation: 3, backgroundColor: appColors?.appWhite}}
          className="px-4 text-center rounded-2xl text-primary">
          {progress}
        </CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#e0e0e0',
    overflow: 'hidden',
    position: 'relative',
  },
  progress: {
    position: 'absolute',
  },
  progressText: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{translateY: -10}],
    color: '#000',
    fontWeight: 'bold',
  },
});

export default VideoOptimizationChart;
