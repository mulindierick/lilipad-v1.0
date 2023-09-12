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
import CustomLoader from '../components/common/CustomLoader';
import useUser from '../utils/hooks/useUser';
import BottomTabNavigator from './BottomTabNavigator';
import ScreenStack from './ScreenStack';
import {setFirstTimeLogin} from '../redux/reducers/generalSlice';

const RootStack = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const {user} = useUser();
  useApp(navigation);
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const [isLogin, setIslogin] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async user => {
      setLoading(true);
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
                  spaces: userData?.spaces,
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
    return subscriber;
  }, []);

  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
};

export default RootStack;
