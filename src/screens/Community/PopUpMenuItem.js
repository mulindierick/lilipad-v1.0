import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomImage from '../../components/common/CustomImage';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {TextNormal} from '../../components/common/CustomText';

const PopUpMenuItem = ({icon, iconHeight, iconWidth, text, color}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp(1),
      }}>
      <CustomImage
        source={icon}
        height={iconHeight || hp(3)}
        width={iconWidth || wp(6)}
        resizeMode="cover"
      />
      <TextNormal textStyle={[styles.filterPopMenuText]} color={color}>
        {text}
      </TextNormal>
    </View>
  );
};

export default PopUpMenuItem;

const styles = StyleSheet.create({
  filterPopMenuText: {
    fontSize: hp(1.8),
    fontWeight: 'bold',
    paddingLeft: wp(2),
  },
});
