import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomImage from '../../components/common/CustomImage';
import {TextNormal} from '../../components/common/CustomText';
import {getAgoTimeFullString} from '../../utils/constants/helper';
import {FONTS, images} from '../../utils/constants/theme';
import useUser from '../../utils/hooks/useUser';
import {useNavigation} from '@react-navigation/native';
import {ThreeDotsHorizontal} from '../../components/common/CustomSvgItems';

const PostHeader = ({photo, name, time, uid, disabledProfileClick}) => {
  const {user} = useUser();
  const navigation = useNavigation();
  const handleNavigation = () => {
    console.log({uid, userId: user?.firebaseUserId});
    if (uid == user?.firebaseUserId) {
      navigation.navigate('Profile');
    } else {
      navigation.navigate('DifferentUserProfile', {uid});
    }
  };

  return (
    <View style={styles.postHeader}>
      <CustomImage
        source={{uri: uid == user?.firebaseUserId ? user?.photo : photo}}
        height={hp(6.5)}
        width={hp(6.5)}
        containerStyle={{borderRadius: hp(10)}}
        onPressImage={disabledProfileClick ? null : () => handleNavigation()}
      />
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flex: 1,
          paddingHorizontal: wp(3),
          alignItems: 'flex-start',
        }}
        activeOpacity={1}
        onPress={disabledProfileClick ? null : () => handleNavigation()}>
        <View>
          <TextNormal textStyle={styles.textNormal}>{name}</TextNormal>
          <TextNormal textStyle={styles.textTimeAgo}>
            {getAgoTimeFullString(time._seconds)}
          </TextNormal>
        </View>
        <TouchableOpacity activeOpacity={1}>
          <ThreeDotsHorizontal />
        </TouchableOpacity>
      </TouchableOpacity>
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
