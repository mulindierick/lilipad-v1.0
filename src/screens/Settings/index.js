import {Alert, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomWrapper from '../../components/wrapper/CustomWrapper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomIcon from '../../components/common/CustomIcon';
import CustomImage from '../../components/common/CustomImage';
import {images} from '../../utils/constants/theme';
import {TextNormal} from '../../components/common/CustomText';
import {useNavigation} from '@react-navigation/native';
import CustomSettingsButton from './CustomSettingsButton';
import UseFirebaseAuth from '../../utils/hooks/UseFirebaseAuth';
import {TouchableOpacity} from 'react-native';
import {BackButton} from '../../components/common/CustomSvgItems';

const Setting = () => {
  const {DeleteUserAccountAndRelatedActivities} = UseFirebaseAuth();
  const DeleteAccount = async () => {
    //show the alert and ask for yes and no options and do certain operation on yes
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },

        {
          text: 'Yes',
          onPress: async () => {
            await DeleteUserAccountAndRelatedActivities();
          },
        },
      ],
      {cancelable: false},
    );
  };
  const navigation = useNavigation();
  return (
    <CustomWrapper containerStyle={{paddingHorizontal: 0}}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={1}
          style={{flex: 1}}>
          <BackButton />
        </TouchableOpacity>
        <View style={{flex: 5, alignItems: 'center'}}>
          <TextNormal textStyle={styles.textStyle}>Settings</TextNormal>
        </View>
        <View style={{flex: 1}}></View>
      </View>
      <CustomSettingsButton
        text={'Push Notifications'}
        containerStyle={{
          marginTop: hp(4),
        }}
      />
      <CustomSettingsButton text={'Community Guidelines'} onPress={() => {}} />
      <CustomSettingsButton text={'About LiliPad'} onPress={() => {}} />
      <CustomSettingsButton
        text={'Delete Account'}
        containerStyle={{marginTop: hp(5)}}
        onPress={() => DeleteAccount()}
      />
    </CustomWrapper>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: wp(2),
    paddingHorizontal: wp(5),
  },
  textStyle: {
    fontWeight: '600',
    fontSize: wp(9),
  },
});
