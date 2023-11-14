import {StyleSheet, Switch, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  AboutLiliPad,
  BlueLiliPadIcon,
  DeleteAccount,
  NotificationSvg,
  NotificationSvgForSettings,
  PrivacyAndSecurity,
} from '../../components/common/CustomSvgItems';
import {TextBig, TextNormal} from '../../components/common/CustomText';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../utils/constants/theme';
import useUser from '../../utils/hooks/useUser';
import {useDispatch} from 'react-redux';
import {setFCMToken} from '../../redux/reducers/userSlice';
import UseFirebaseAuth from '../../utils/hooks/UseFirebaseAuth';

const CustomSettingsButton = ({text, containerStyle, onPress}) => {
  const {user} = useUser();
  const {pushNotificationSwitch} = UseFirebaseAuth();
  const [popUp, setPopUp] = useState(
    user?.PushNotificationToken ? true : false,
  );

  console.log({user});

  const updatePushNotificationToken = async () => {
    try {
      pushNotificationSwitch(popUp);
      setPopUp(!popUp);
    } catch (error) {
      console.log(error);
    }
  };

  const SvgIcon = {
    'Community Guidelines': <AboutLiliPad />,
    'About LiliPad': (
      <BlueLiliPadIcon containerStyle={{height: wp(7), width: wp(7)}} />
    ),
    'Delete Account': (
      <DeleteAccount containerStyle={{height: wp(6), width: wp(6)}} />
    ),
  };

  if (text === 'Push Notifications') {
    return (
      <View style={[styles.container, containerStyle]}>
        <View style={{flex: 1}}>
          <NotificationSvgForSettings
            containerStyle={{height: wp(6.2), width: wp(6.2)}}
          />
        </View>
        <TextNormal textStyle={styles.text}>Push Notifications</TextNormal>
        <View
          style={{
            alignItems: 'flex-end',
            justifyContent: 'center',
            flex: 1,
            marginRight: wp(1),
          }}>
          <Switch
            value={popUp}
            thumbColor={popUp ? 'white' : 'white'}
            trackColor={{true: COLORS.blue}}
            onValueChange={() => updatePushNotificationToken()}
            //   style={{transform: [{scaleX: wp(0.25)}, {scaleY: wp(0.25)}]}}
          />
        </View>
      </View>
    );
  }
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}
      activeOpacity={1}>
      <View style={{flex: 1}}>{SvgIcon[text]}</View>
      <TextNormal
        textStyle={[
          styles.text,
          'Delete Account' == text ? {fontWeight: 'bold'} : {},
        ]}>
        {text}
      </TextNormal>
      <View style={{flex: 1}}></View>
    </TouchableOpacity>
  );
};

export default CustomSettingsButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: wp(2),
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
    borderRadius: 14,
    borderWidth: 0.1,
    borderColor: '#CACACA',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.02,
    shadowRadius: 0.5,
    backgroundColor: COLORS.white,
    borderWidth: 0,
  },
  text: {
    fontWeight: '600',
    marginLeft: wp(5),
    fontSize: wp(4.5),
    flex: 15,
  },
});
