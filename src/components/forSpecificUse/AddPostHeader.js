import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLORS, images} from '../../utils/constants/theme';
import CustomIcon from '../common/CustomIcon';
import CustomImage from '../common/CustomImage';
import {TextNormal} from '../common/CustomText';

const AddPostHeader = ({
  onIconPress,
  onPressShare,
  loader,
  disabled,
  title = 'Share',
}) => {
  return (
    <View style={styles.container}>
      <CustomIcon
        type="ionicons"
        icon="close"
        size={wp(9)}
        color={'rgba(140,140,140, 0.6)'}
        onPress={onIconPress}
        style={{
          flex: 1,
          marginTop: wp(1.8),
          marginLeft: wp(-2),
        }}
      />
      <View
        style={{
          flex: 3,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <CustomImage
          source={images.headerIcon}
          height={hp(11)}
          width={wp(11)}
        />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'flex-end',
        }}>
        <TextNormal
          textStyle={styles.textStyle}
          onPress={onPressShare}
          disabled={disabled}
          color={disabled ? COLORS.grey : COLORS.blue}>
          {title}
        </TextNormal>
      </View>
    </View>
  );
};

export default AddPostHeader;

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: wp(2),
  },
  textStyle: {
    fontWeight: '700',
    fontSize: wp(6.5),
    marginTop: wp(2),
  },
});
