import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomIcon from '../../components/common/CustomIcon';
import {TextNormal} from '../../components/common/CustomText';
import {COLORS} from '../../utils/constants/theme';

const PostFooter = () => {
  return (
    <View style={styles.postFooter}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <CustomIcon
          type="antdesign"
          icon="heart"
          size={hp(3)}
          color={COLORS.red}
        />
        <TextNormal
          textStyle={{
            fontSize: hp(1.75),
            marginLeft: 5,
            fontWeight: '400',
            color: 'rgba(87, 87, 87, 0.83)',
          }}>
          0 likes
        </TextNormal>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: wp(5),
        }}>
        <CustomIcon
          type="ionicons"
          icon="chatbubble"
          size={hp(3)}
          color={COLORS.blue}
        />
        <TextNormal
          textStyle={{
            fontSize: hp(1.75),
            marginLeft: 5,
            fontWeight: '400',
            color: 'rgba(87, 87, 87, 0.83)',
          }}>
          0 replies
        </TextNormal>
      </View>
    </View>
  );
};

export default PostFooter;

const styles = StyleSheet.create({
  postFooter: {
    flexDirection: 'row',
    marginTop: hp(1.5),
  },
});
