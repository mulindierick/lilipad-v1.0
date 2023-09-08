import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import FurtherInfo from '../screens/Auth/FurtherInfo';
import ExploreSpaces from '../screens/ExploreSpaces';
import BottomTabNavigator from './BottomTabNavigator';
import PostDetails from '../screens/PostDetails';

const Stack = createNativeStackNavigator();

const ScreenStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
      <Stack.Screen name="ExploreSpaces" component={ExploreSpaces} />
      <Stack.Screen name="PostDetails" component={PostDetails} />
    </Stack.Navigator>
  );
};

export default ScreenStack;
