import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Community from '../screens/Community';
import Profile from '../screens/Profile';
import {COLORS, images} from '../utils/constants/theme';
import CustomIcon from '../components/common/CustomIcon';
import {TextSmaller} from '../components/common/CustomText';
import CustomImage from '../components/common/CustomImage';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TABS = [
  {
    id: 1,
    name: 'Community',
    imageFocused: images.communitySelected,
    image: images.communityUnselected,
    component: Community,
  },
  {
    id: 2,
    name: 'Profile',
    image: images.profileUnselected,
    imageFocused: images.profileSelected,
    component: Profile,
  },
];

const BottomTabNavigator = () => {
  const tabsBar = TABS;
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          height: hp(13),
          borderTopRightRadius: hp(10),
          borderTopLeftRadius: hp(10),
          position: 'absolute',
          bottom: 0,
          overflow: 'hidden',
        },
      }}>
      {tabsBar.map(tab => (
        <Tab.Screen
          {...tab}
          key={tab.id}
          options={{
            tabBarButton: props => {
              let focused = props.accessibilityState.selected;
              return (
                <TouchableWithoutFeedback
                  key={tab.id}
                  {...props}
                  style={[...props.style]}
                  onPress={() => {
                    props.onPress();
                  }}>
                  <View
                    style={[...props.style, {bottom: hp(0.5)}]}
                    key={tab.id}>
                    <CustomImage
                      source={focused ? tab.imageFocused : tab.image}
                      height={hp(6)}
                      width={wp(50)}
                      resizeMode="contain"
                      disabled
                    />
                  </View>
                </TouchableWithoutFeedback>
              );
            },
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({});
