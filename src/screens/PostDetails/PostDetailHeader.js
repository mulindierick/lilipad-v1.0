import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomImage from '../../components/common/CustomImage';
import {TextBigger, TextNormal} from '../../components/common/CustomText';
import {images} from '../../utils/constants/theme';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {getAgoTime, getAgoTimeFullString} from '../../utils/constants/helper';

const PostDetailHeader = ({FullName, timeInSeconds, photo}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <CustomImage
        source={images.backButton}
        height={hp(5.5)}
        width={wp(8)}
        onPressImage={() => navigation.goBack()}
      />
      <View style={styles.middleContainer}>
        <View style={styles.imageContainer}>
          <CustomImage
            source={{uri: photo}}
            containerStyle={styles.innerImageContainer}
            resizeMode="cover"
          />
        </View>
        <TextNormal textStyle={styles.textNormal}>{FullName}</TextNormal>
        <TextNormal textStyle={styles.textTimeAgo}>
          {getAgoTimeFullString(timeInSeconds)}
        </TextNormal>
      </View>
      <CustomImage source={images.postOptions} height={hp(5.5)} width={wp(9)} />
    </View>
  );
};

export default PostDetailHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  innerImageContainer: {
    height: hp(10),
    aspectRatio: 1,
    borderRadius: hp(10),
  },
  imageContainer: {
    height: hp(6.5),
    aspectRatio: 1,
    borderRadius: hp(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleContainer: {
    alignItems: 'center',
  },
  textNormal: {
    fontSize: hp(1.9),
    fontWeight: 'bold',
    marginTop: hp(1),
  },
  textTimeAgo: {
    fontSize: hp(1.5),
    color: 'rgba(87, 87, 87, 0.83)',
    fontWeight: '400',
    marginTop: hp(0.2),
  },
});
