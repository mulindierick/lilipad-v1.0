import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomIcon from '../common/CustomIcon';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomImage from '../common/CustomImage';
import {TextNormal} from '../common/CustomText';
import {COLORS, FONTS, images} from '../../utils/constants/theme';

const AddPostHeader = ({onIconPress, onPressShare}) => {
  return (
    <View style={styles.container}>
      <CustomIcon
        type="ionicons"
        icon="close"
        size={wp(8)}
        color={'rgba(140,140,140, 0.6)'}
        onPress={onIconPress}
      />
      <CustomImage source={images.headerIcon} height={hp(10)} width={wp(10)} />
      <TextNormal textStyle={styles.textStyle}>Share</TextNormal>
    </View>
  );
};

export default AddPostHeader;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    fontWeight: '700',
    color: COLORS.blue,
    fontSize: wp(6),
  },
});
