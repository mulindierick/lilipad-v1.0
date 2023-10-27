import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useContext, useState} from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {MyContext} from '../context/Context';
import Community from '../screens/Community';
import Profile from '../screens/Profile';
import {COLORS, images} from '../utils/constants/theme';
import CustomImage from '../components/common/CustomImage';
import DeviceInfo from 'react-native-device-info';

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
  const [selectedTab, setSelectedTab] = useState(tabsBar[0].name);
  const {PostFlatListRef, ProfileFlatListRef} = useContext(MyContext);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          height: hp(13),
          backgroundColor: 'transparent',
          borderTopRightRadius: hp(10),
          borderTopLeftRadius: hp(10),
        },
        tabBarBackground: () => (
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: hp(13),
              backgroundColor: COLORS.white,
              borderTopRightRadius: hp(10),
              borderTopLeftRadius: hp(10),
              borderWidth: 0.6,
              borderBottomWidth: 0,
              borderColor: '#DADADA',
            }}
          />
        ),
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
                    if (tab.name === selectedTab) {
                      if (tab.name === 'Profile') {
                        if (ProfileFlatListRef.current) {
                          ProfileFlatListRef.current.scrollToOffset({
                            animated: true,
                            offset: 0,
                          });
                        }
                      } else {
                        if (PostFlatListRef.current) {
                          PostFlatListRef.current.scrollToOffset({
                            animated: true,
                            offset: 0,
                          });
                        }
                      }
                    } else {
                      setSelectedTab(tab.name);
                    }
                  }}>
                  <View
                    style={[
                      ...props.style,
                      DeviceInfo.hasNotch()
                        ? {bottom: hp(0.5)}
                        : {bottom: hp(3.5)},
                    ]}
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
