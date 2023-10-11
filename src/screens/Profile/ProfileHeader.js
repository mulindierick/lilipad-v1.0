import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  FilterSvg,
  NotificationSvg,
  SearchSvg,
  SettingSvg,
} from '../../components/common/CustomSvgItems';
import {TextBig, TextNormal} from '../../components/common/CustomText';
import {COLORS, FONTS} from '../../utils/constants/theme';
import {useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {setUser} from '../../redux/reducers/userSlice';

const ProfileHeader = ({differentUserProfile}) => {
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(
      setUser({
        email: null,
        photo: null,
        firstName: null,
        lastName: null,
        isVerified: null,
        firebaseUserId: null,
        major: null,
        spaces: null,
      }),
    );
    auth().signOut();
  };

  if (differentUserProfile) {
    return (
      <>
        <View style={styles.container}>
          <TextBig textStyle={styles.textStyle} bold>
            Profile
          </TextBig>
        </View>
      </>
    );
  }

  const navigation = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <TextBig textStyle={styles.textStyle} bold>
          Profile
        </TextBig>
        <View style={styles.innerContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <SettingSvg />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <NotificationSvg />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
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
});
