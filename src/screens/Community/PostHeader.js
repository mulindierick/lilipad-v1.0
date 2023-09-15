import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomImage from '../../components/common/CustomImage';
import {TextNormal} from '../../components/common/CustomText';
import {getAgoTimeFullString} from '../../utils/constants/helper';
import {FONTS, images} from '../../utils/constants/theme';

const PostHeader = ({photo, name, time}) => {
  return (
    <View style={styles.postHeader}>
      <CustomImage
        source={{uri: photo}}
        height={hp(6.5)}
        width={hp(6.5)}
        containerStyle={{borderRadius: hp(10)}}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flex: 1,
          paddingHorizontal: wp(3),
          alignItems: 'flex-start',
        }}>
        <View>
          <TextNormal textStyle={styles.textNormal}>{name}</TextNormal>
          <TextNormal textStyle={styles.textTimeAgo}>
            {getAgoTimeFullString(time._seconds)}
          </TextNormal>
        </View>
        <CustomImage
          source={images.postOptions}
          height={hp(2)}
          width={hp(3)}
          containerStyle={{marginTop: hp(0.4)}}
        />
      </View>
    </View>
  );
};

export default PostHeader;

const styles = StyleSheet.create({
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textNormal: {
    fontSize: wp(4.5),
    fontWeight: 'bold',
  },
  textTimeAgo: {
    fontSize: wp(3.3),
    color: 'rgba(87, 87, 87, 0.83)',
    fontFamily: FONTS.Light,
  },
});
