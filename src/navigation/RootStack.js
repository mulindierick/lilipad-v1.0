import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import AuthStack from './AuthStack';
import SplashScreen from 'react-native-splash-screen';

const RootStack = () => {
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
