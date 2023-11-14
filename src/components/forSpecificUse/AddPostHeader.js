import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLORS, images} from '../../utils/constants/theme';
import CustomIcon from '../common/CustomIcon';
import CustomImage from '../common/CustomImage';
import {TextNormal} from '../common/CustomText';
import {CloseAddPostModalSvg} from '../common/CustomSvgItems';

const AddPostHeader = ({
  onIconPress,
  onPressShare,
  loader,
  disabled,
  title = 'Share',
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onIconPress} activeOpacity={1}>
        <CloseAddPostModalSvg />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          alignItems: 'flex-end',
          backgroundColor: disabled ? COLORS.grey : COLORS.blue,
          alignSelf: 'center',
          justifyContent: 'center',
          paddingHorizontal: wp(2.5),
          paddingVertical: wp(1),
          borderRadius: wp(100),
        }}
        onPress={onPressShare}
        disabled={disabled}>
        <TextNormal textStyle={styles.textStyle} color={COLORS.white}>
          {title}
        </TextNormal>
      </TouchableOpacity>
    </View>
  );
};

export default AddPostHeader;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(3),
    paddingHorizontal: wp(1),
  },
  textStyle: {
    fontWeight: '700',
    fontSize: wp(5),
  },
});
