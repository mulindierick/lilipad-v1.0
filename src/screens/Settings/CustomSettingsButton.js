import {StyleSheet, Switch, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  AboutLiliPad,
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

const CustomSettingsButton = ({text, containerStyle, onPress}) => {
  const [popUp, setPopUp] = useState(false);

  const SvgIcon = {
    'Privacy & Security': <PrivacyAndSecurity />,
    'About LiliPad': <AboutLiliPad />,
    'Delete Account': <DeleteAccount />,
  };

  if (text === 'Push Notifications') {
    return (
      <TouchableOpacity style={[styles.container, containerStyle]}>
        <NotificationSvgForSettings />
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
            trackColor={{true: '#4CCF0F'}}
            onValueChange={() => setPopUp(!popUp)}
            //   style={{transform: [{scaleX: wp(0.25)}, {scaleY: wp(0.25)}]}}
          />
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}>
      {SvgIcon[text]}
      <TextNormal textStyle={styles.text}>{text}</TextNormal>
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
    borderRadius: 15,
    borderWidth: 0.1,
    borderColor: '#CACACA',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.16,
    shadowRadius: 1,
    backgroundColor: COLORS.white,
    borderWidth: 0,
  },
  text: {
    fontWeight: '600',
    marginLeft: wp(5),
    fontSize: wp(4.5),
  },
});
