import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Activity from '../screens/Activity';
import CreateSpace from '../screens/CreateSpaces';
import PostDetails from '../screens/PostDetails';
import DifferentUserProfile from '../screens/Profile/DifferentUserProfile';
import Search from '../screens/Search';
import Setting from '../screens/Settings';
import ViewMembers from '../screens/ViewMembers';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createNativeStackNavigator();

const ScreenStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="BottomTabNavigator">
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
      <Stack.Screen name="PostDetails" component={PostDetails} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Settings" component={Setting} />
      <Stack.Screen
        name="DifferentUserProfile"
        component={DifferentUserProfile}
      />
      <Stack.Screen name="Activity" component={Activity} />
      <Stack.Screen name="ViewMembers" component={ViewMembers} />
      <Stack.Screen name="CreateSpace" component={CreateSpace} />
    </Stack.Navigator>
  );
};

export default ScreenStack;
