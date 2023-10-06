import {NavigationContainer, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import AuthStack from './AuthStack';
import SplashScreen from 'react-native-splash-screen';
import {useApp} from '../utils/hooks/useApp';
import auth from '@react-native-firebase/auth';
import TakingUserInformationStep from './TakingUserInformationStep';
import firestore from '@react-native-firebase/firestore';
import {useDispatch} from 'react-redux';
import {setUser} from '../redux/reducers/userSlice';
import CustomLoader from '../components/common/CustomLoader';
import useUser from '../utils/hooks/useUser';
import BottomTabNavigator from './BottomTabNavigator';
import ScreenStack from './ScreenStack';
import {setFirstTimeLogin} from '../redux/reducers/generalSlice';

const RootStack = () => {
  const [loading, setLoading] = useState(true);
  const {user} = useUser();
  const navigation = useNavigation();
  useApp(navigation);
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1500);
  }, []);

  const [isLogin, setIslogin] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async user => {
      setLoading(true);
      try {
        console.log({user});
        if (user) {
          setIslogin(true);
          let userDetail = firestore()
            .collection('accounts')
            .doc(user?._user?.uid)
            .get()
            .then(userDetailData => {
              const userData = userDetailData?.data();
              console.log({userData});
              dispatch(
                setUser({
                  email: userData?.email,
                  photo: userData?.photo,
                  firstName: userData?.firstName,
                  lastName: userData?.lastName,
                  isVerified: userData?.isVerified,
                  firebaseUserId: userData?.firebaseUserId,
                  major: userData?.major,
                  spaces: userData?.spaces,
                  classYear: userData?.classYear,
                  PushNotificationToken: userData?.fcmToken,
                }),
              );
            });
        } else {
          setIslogin(false);
        }
      } catch (error) {
        console.log('error', error);
      }
      setLoading(false);
    });
    console.log({user});
    return subscriber;
  }, []);

  return (
    <>
      {loading ? (
        <CustomLoader />
      ) : !isLogin ? (
        <AuthStack />
      ) : user.isVerified == null ? (
        <CustomLoader />
      ) : user.isVerified ? (
        <>
          <ScreenStack />
        </>
      ) : (
        <TakingUserInformationStep />
      )}
    </>
  );
};

export default RootStack;
