import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import AuthStack from './AuthStack';
import SplashScreen from 'react-native-splash-screen';
import {useApp} from '../utils/hooks/useApp';

const RootStack = ({navigation}) => {
  useApp(navigation);
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
};

export default RootStack;
