import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {useDispatch} from 'react-redux';
import CustomLoader from '../components/common/CustomLoader';
import CustomNoInternetModal from '../components/common/CustomNoInternetModal';
import {setReportPost} from '../redux/reducers/generalSlice';
import {setUser} from '../redux/reducers/userSlice';
import {useApp} from '../utils/hooks/useApp';
import {useNetInfo} from '../utils/hooks/useNetInfo';
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
  const {internetStatus} = useNetInfo();

  useEffect(() => {
    requestUserPermission();
    GetFCMToken();
    NotificationListener(dispatch);
    setTimeout(() => {
      SplashScreen.hide();
    }, 1500);
  }, []);
  const [isLogin, setIslogin] = useState(null);

  useEffect(() => {
    setLoading(true);
    const subscriber = auth().onAuthStateChanged(async user => {
      try {
        if (user) {
          let userDetail = await firestore()
            .collection('accounts')
            .doc(user?._user?.uid)
            .get()
            .then(userDetailData => {
              const userData = userDetailData?.data();
              if (!userData?.email) {
                auth().signOut();
                dispatch(setUser({}));
                setIslogin(false);
              } else {
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
                    collegeName: userData?.collegeName,
                    notificationStatus: userData?.notificationStatus,
                  }),
                );
                dispatch(setReportPost(userData?.reportPost || []));
                setIslogin(true);
              }
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

  useEffect(() => {
    //snapshot to check whether the account is deleted or not from admin panel
    const snapshot = firestore()
      .collection('accounts')
      .doc(user?.firebaseUserId)
      .onSnapshot(doc => {
        console.log({data: doc.data()});
        if (!doc?.data()?.email) {
          if (user?.isVerified) {
            auth().signOut();
            dispatch(setUser({}));
            setIslogin(false);
          }
        }
      });
    return () => (user?.email ? snapshot() : null);
  }, []);

  return (
    <>
      <CustomNoInternetModal isVisible={!internetStatus} />
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
