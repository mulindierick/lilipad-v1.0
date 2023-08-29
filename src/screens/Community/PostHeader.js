import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomImage from '../../components/common/CustomImage';
import {TextNormal} from '../../components/common/CustomText';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {images} from '../../utils/constants/theme';

const PostHeader = ({photo, name}) => {
  return (
    <View style={styles.postHeader}>
      <CustomImage
        source={{uri: photo}}
        height={hp(7)}
        width={hp(7)}
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
          <TextNormal textStyle={styles.textTimeAgo}>9 minutes ago</TextNormal>
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
    fontSize: hp(1.9),
    fontWeight: 'bold',
  },
  textTimeAgo: {
    fontSize: hp(1.5),
    color: 'rgba(87, 87, 87, 0.83)',
    fontWeight: '400',
  },
});
