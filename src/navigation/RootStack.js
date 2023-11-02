import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {useDispatch} from 'react-redux';
import CustomLoader from '../components/common/CustomLoader';
import {setUser} from '../redux/reducers/userSlice';
import {useApp} from '../utils/hooks/useApp';
import useUser from '../utils/hooks/useUser';
import {
  GetFCMToken,
  NotificationListener,
  requestUserPermission,
} from '../utils/pushNotification_Helper';
import AuthStack from './AuthStack';
import ScreenStack from './ScreenStack';
import TakingUserInformationStep from './TakingUserInformationStep';

const RootStack = () => {
  const [loading, setLoading] = useState(true);
  const {user} = useUser();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useApp(navigation, dispatch);

  useEffect(() => {
    SplashScreen.hide();
    requestUserPermission();
    GetFCMToken();
    NotificationListener(dispatch);
    // setTimeout(() => {
    //   SplashScreen.hide();
    // }, 1500);
  }, []);

  const [isLogin, setIslogin] = useState(null);
  useEffect(() => {
    setLoading(true);
    const subscriber = auth().onAuthStateChanged(async user => {
      try {
        console.log('on Auth State Changed');
        console.log({user});
        if (user) {
          let userDetail = await firestore()
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
                  college: userData?.college,
                  spaceId: userData?.spacesId,
                }),
              );
              setIslogin(true);
            });
        } else {
          setIslogin(false);
        }
      } catch (error) {
        console.log('error', error);
      }
      setLoading(false);
    });
    return subscriber;
  }, []);

  return (
    <>
      {loading ? (
        <CustomLoader />
      ) : !isLogin ? (
        <AuthStack />
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
