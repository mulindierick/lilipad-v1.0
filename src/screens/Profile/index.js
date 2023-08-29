import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TextBig} from '../../components/common/CustomText';
import CustomButton from '../../components/common/CustomButton';
import auth from '@react-native-firebase/auth';

const Profile = () => {
  return (
    <View style={styles.container}>
      <TextBig>Under Construction</TextBig>
      <CustomButton onPress={() => auth().signOut()} title="Sign Out" />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
