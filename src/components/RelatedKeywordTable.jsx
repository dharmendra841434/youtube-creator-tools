import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {appColors} from '../utils/appColors';
import CustomText from './CustomText';
import usePagination from '../utils/customHook';

const RelatedKeywordTable = ({data}) => {
  const ITEMS_PER_PAGE = 5;
  const {currentPage, currentData, nextPage, prevPage, maxPage} = usePagination(
    data,
    ITEMS_PER_PAGE,
  );

  return (
    <View>
      {currentData?.map((item, index) => (
        <View
          key={index}
          style={{
            flexDirection: 'row',
            paddingVertical: '2%',
            borderBottomWidth: 1,
            borderBlockColor: appColors.borderGray,
            backgroundColor: appColors?.appWhite,
          }}>
          <View style={{width: '36%', paddingLeft: 4}}>
            <CustomText style={{fontSize: 11}}>{item?.keyword}</CustomText>
          </View>
          <View style={{width: '16%'}}>
            <CustomText style={{fontSize: 11, textAlign: 'center'}}>
              {item?.competition_score}
            </CustomText>
          </View>
          <View style={{width: '16%'}}>
            <CustomText style={{fontSize: 11, textAlign: 'center'}}>
              {item?.difficulty}
            </CustomText>
          </View>
          <View style={{width: '16%'}}>
            <CustomText style={{fontSize: 11, textAlign: 'center'}}>
              {item?.monthlysearch}
            </CustomText>
          </View>
          <View style={{width: '16%'}}>
            <CustomText style={{fontSize: 11, textAlign: 'center'}}>
              {item?.overallscore}
            </CustomText>
          </View>
        </View>
      ))}
      <View className="flex-row items-center justify-between p-3 bg-white ">
        <View className="flex-row items-center ">
          <CustomText className=" text-[13px]">Rows Per Page: 5</CustomText>
        </View>

        <View className="flex-row items-center justify-between ">
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={prevPage}
            disabled={currentPage === 1}
            className={`px-2 ${
              currentPage === 1 ? 'bg-gray-300' : 'bg-red-500'
            } rounded-md`}>
            <CustomText className=" text-[12px] text-white">
              Previous
            </CustomText>
          </TouchableOpacity>

          <CustomText className=" text-[13px] mx-2">
            1-{currentPage * 5} of {data?.length}
          </CustomText>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={nextPage}
            disabled={currentPage * ITEMS_PER_PAGE >= data.length}
            className={`px-2 ${
              currentPage * ITEMS_PER_PAGE >= data.length
                ? 'bg-gray-300'
                : 'bg-green-500'
            } rounded-md`}>
            <CustomText className=" text-[12px] text-white">Next</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RelatedKeywordTable;
