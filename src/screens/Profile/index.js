import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TextBig} from '../../components/common/CustomText';
import CustomButton from '../../components/common/CustomButton';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {setUser} from '../../redux/reducers/userSlice';

const Profile = () => {
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
  return (
    <View style={styles.container}>
      <TextBig>Under Construction</TextBig>
      <CustomButton onPress={() => signOut()} title="Sign Out" />
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
