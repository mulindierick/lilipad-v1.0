import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import FurtherInfoPart1 from '../screens/Auth/FurtherInfoPart1';
import FurtherInfoPart2 from '../screens/Auth/FurtherInfoPart2';

const Stack = createNativeStackNavigator();

const TakingUserInformationStep = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="FurtherInfoPart1" component={FurtherInfoPart1} />
      <Stack.Screen name="FurtherInfoPart2" component={FurtherInfoPart2} />
    </Stack.Navigator>
  );
};

export default TakingUserInformationStep;
