import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  BackButton,
  NotificationSvg,
  SettingSvg,
} from '../../components/common/CustomSvgItems';
import {TextBig} from '../../components/common/CustomText';
import {MyContext} from '../../context/Context';
import {COLORS, FONTS} from '../../utils/constants/theme';
import useUser from '../../utils/hooks/useUser';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ProfileHeader = ({differentUserProfile, upperBorderFlag, uid}) => {
  const {general} = useUser();
  const navigation = useNavigation();
  const {top} = useSafeAreaInsets();

  if (differentUserProfile) {
    return (
      <>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.goBack()}
          style={{
            position: 'absolute',
            top: top + 10,
            alignItems: 'center',
            borderColor: '#C9C9C9',
            borderWidth: 1,
            height: wp(15),
            aspectRatio: 1,
            borderRadius: hp(10),
            justifyContent: 'center',
            backgroundColor: COLORS.backgroundColor,
            left: wp(4),
            zIndex: 1,
          }}>
          <BackButton containerStyle={{marginLeft: wp(-0.5)}} />
        </TouchableOpacity>
      </>
    );
  }

  const {ProfileFlatListRef} = useContext(MyContext);
  const useScrollToTop = () => {
    ProfileFlatListRef.current.scrollToOffset({animated: true, offset: 0});
  };

  return (
    <>
      <View style={[styles.container]}>
        <TextBig
          textStyle={styles.textStyle}
          bold
          onPress={() => useScrollToTop()}>
          Profile
        </TextBig>
        <View style={styles.innerContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Activity')}
            activeOpacity={1}
            style={{marginRight: wp(8)}}>
            <NotificationSvg />
            {general?.newNotification && <View style={styles.redDot} />}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
            activeOpacity={1}>
            <SettingSvg />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={
          upperBorderFlag
            ? {
                borderBottomWidth: 0.8,
                paddingTop: hp(1.5),
                borderBottomColor: '#DADADA',
              }
            : {
                borderBottomWidth: 0.8,
                borderBottomColor: 'transparent',
                paddingTop: hp(1.5),
              }
        }
      />
    </>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: wp(4),
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  textStyle: {
    fontFamily: FONTS.Bold,
    fontSize: wp(9),
    color: '#151313',
  },
  secondContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2),
  },
  filterPopMenu: {
    marginTop: hp(5),
    width: wp(50),
    borderRadius: 5,
    backgroundColor: COLORS.white,
    alignItems: 'flex-start',
    paddingVertical: hp(1.5),
    borderRadius: 12,
    shadowColor: '#000000',
    borderWidth: 0.1,
    borderColor: '#CCCCCC',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 3,
  },
  filterPopMenuText: {
    fontSize: wp(4.3),
    fontWeight: 'bold',
    paddingHorizontal: wp(3),
    marginVertical: hp(0.4),
    width: wp(47),
  },
  redDot: {
    width: wp(2.5),
    aspectRatio: 1,
    position: 'absolute',
    backgroundColor: COLORS.red,
    borderRadius: wp(100),
    right: wp(2),
  },
  borderColors: {
    borderBottomWidth: 0.8,
    borderBottomColor: '#DADADA',
  },
});
