import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Auth from '../screens/Auth';
import EmailAuth from '../screens/Auth/EmailAuth';
import FurtherInfo from '../screens/Auth/FurtherInfo';
import OTPverification from '../screens/Auth/OTPverification';
import TermsAndConditions from '../screens/TermsAndConditions/TermsAndConditions';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="EmailAuth" component={EmailAuth} />
      <Stack.Screen name="OTPverification" component={OTPverification} />
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
    </Stack.Navigator>
  );
};

export default AuthStack;
