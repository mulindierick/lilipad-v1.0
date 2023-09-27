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
    <CustomWrapper>
      <View style={styles.container}>
        <CustomImage
          source={images.backButton}
          height={hp(5)}
          width={wp(8)}
          onPressImage={() => navigation.goBack()}
        />
        <TextNormal textStyle={styles.textStyle}>Settings</TextNormal>
      </View>
      <CustomSettingsButton
        text={'Push Notifications'}
        containerStyle={{
          marginTop: hp(4),
        }}
      />
      <CustomSettingsButton text={'Privacy & Security'} onPress={() => {}} />
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
    marginTop: wp(2),
  },
  textStyle: {
    fontWeight: '600',
    fontSize: wp(8),
    marginLeft: wp(23),
  },
});
