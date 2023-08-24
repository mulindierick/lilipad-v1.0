import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import AuthStack from './AuthStack';
import SplashScreen from 'react-native-splash-screen';
import {useApp} from '../utils/hooks/useApp';
import auth from '@react-native-firebase/auth';
import TakingUserInformationStep from './TakingUserInformationStep';
import firestore from '@react-native-firebase/firestore';
import {useDispatch} from 'react-redux';
import {setUser} from '../redux/reducers/userSlice';

const RootStack = ({navigation}) => {
  useApp(navigation);
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const [isLogin, setIslogin] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async user => {
      try {
        if (user) {
          setIslogin(true);
          let userDetail = firestore()
            .collection('accounts')
            .doc(user?.uid)
            .onSnapshot(userDetailData => {
              const userData = userDetailData?.data();
              dispatch(
                setUser({
                  email: userData?.email,
                  photo: userData?.photo,
                  firstName: userData?.firstName,
                  lastName: userData?.lastName,
                  isVerified: userData?.isVerified,
                  firebaseUserId: userData?.firebaseUserId,
                  major: userData?.major,
                }),
              );
            });
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
