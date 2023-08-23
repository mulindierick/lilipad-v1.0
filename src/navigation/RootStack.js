import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import AuthStack from './AuthStack';
import SplashScreen from 'react-native-splash-screen';
import {useApp} from '../utils/hooks/useApp';
import auth from '@react-native-firebase/auth';
import TakingUserInformationStep from './TakingUserInformationStep';

const RootStack = ({navigation}) => {
  useApp(navigation);
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const [isLogin, setIslogin] = useState(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async user => {
      try {
        if (user) {
          setIslogin(true);
          // let userDetail = firestore()
          //   .collection('accounts')
          //   .doc(user?.uid)
          //   .onSnapshot(userDetailData => {
          //     const userData = userDetailData?.data();
          //     dispatch(
          //       setUser({
          //         accountType: userData?.AccountType,
          //         email: userData?.email,
          //         location: userData?.location,
          //         name: userData?.name,
          //         phone: userData?.phone,
          //         photo: userData?.photo,
          //         profileType: userData?.profile_type,
          //         uid: userData?.uid,
          //       }),
          //     );
          //   });

          // const userData = await userDetail.data();

          // let token = await user.getIdToken(true);
        } else {
          setIslogin(false);
        }
      } catch (error) {
        console.log('error', error);
      }
    });
    return subscriber;
  }, []);

  return (
    <NavigationContainer>
      {isLogin ? <TakingUserInformationStep /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootStack;
