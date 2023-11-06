import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ExploreSpaces from '../screens/ExploreSpaces';
import PostDetails from '../screens/PostDetails';
import Search from '../screens/Search';
import BottomTabNavigator from './BottomTabNavigator';
import Setting from '../screens/Settings';
import DifferentUserProfile from '../screens/Profile/DifferentUserProfile';
import Activity from '../screens/Activity';
import ViewMembers from '../screens/ViewMembers';

const Stack = createNativeStackNavigator();

const ScreenStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
      <Stack.Screen name="ExploreSpaces" component={ExploreSpaces} />
      <Stack.Screen name="PostDetails" component={PostDetails} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Settings" component={Setting} />
      <Stack.Screen
        name="DifferentUserProfile"
        component={DifferentUserProfile}
      />
      <Stack.Screen name="Activity" component={Activity} />
      <Stack.Screen name="ViewMembers" component={ViewMembers} />
    </Stack.Navigator>
  );
};

export default ScreenStack;
