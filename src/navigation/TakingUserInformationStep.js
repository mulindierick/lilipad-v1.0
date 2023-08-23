import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import FurtherInfo from '../screens/Auth/FurtherInfo';

const Stack = createNativeStackNavigator();

const TakingUserInformationStep = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="FurtherInfo" component={FurtherInfo} />
    </Stack.Navigator>
  );
};

export default TakingUserInformationStep;
