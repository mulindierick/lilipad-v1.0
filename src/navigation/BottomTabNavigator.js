import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import FurtherInfo from '../screens/Auth/FurtherInfo';
import Community from '../screens/Community';

const Stack = createNativeStackNavigator();

const BottomTabNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Community" component={Community} />
    </Stack.Navigator>
  );
};

export default BottomTabNavigator;
