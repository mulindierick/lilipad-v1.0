import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomImage from '../../components/common/CustomImage';
import {TextNormal} from '../../components/common/CustomText';
import {getAgoTimeFullString} from '../../utils/constants/helper';
import {images} from '../../utils/constants/theme';
import useUser from '../../utils/hooks/useUser';
import {BackButton} from '../../components/common/CustomSvgItems';

const PostDetailHeader = ({
  FullName,
  timeInSeconds,
  photo,
  onBackPress,
  uid,
}) => {
  const navigation = useNavigation();
  const {user} = useUser();
  const handleNavigation = () => {
    if (user?.firebaseUserId == uid) {
      navigation.navigate('Profile');
    } else {
      navigation.navigate('DifferentUserProfile', {uid});
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{alignItems: 'center'}}
        onPress={() => navigation.goBack()}
        activeOpacity={1}>
        <BackButton />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.middleContainer}
        activeOpacity={1}
        onPress={() => handleNavigation()}>
        <View style={styles.imageContainer}>
          <CustomImage
            source={{uri: photo}}
            containerStyle={styles.innerImageContainer}
            resizeMode="cover"
            disabled
          />
        </View>
        <TextNormal textStyle={styles.textNormal}>{FullName}</TextNormal>
        <TextNormal textStyle={styles.textTimeAgo}>
          {getAgoTimeFullString(timeInSeconds)}
        </TextNormal>
      </TouchableOpacity>
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
    fontSize: wp(4.5),
    fontWeight: 'bold',
    marginTop: hp(1),
  },
  textTimeAgo: {
    fontSize: wp(3.5),
    color: 'rgba(87, 87, 87, 0.83)',
    fontWeight: '400',
    marginTop: hp(0.2),
  },
});
