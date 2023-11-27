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
import ExploreSpaces from '../screens/ExploreSpaces';
import {
  BottomCommunitySvg,
  BottomExploreSvg,
  BottomProfileSvg,
  ExploreMainSvg,
  ViewMemberSvg,
} from '../components/common/CustomSvgItems';
import {TextNormal} from '../components/common/CustomText';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TABS = [
  {
    id: 1,
    name: 'Community',
    imageFocused: images.communitySelected,
    image: images.communityUnselected,
    component: Community,
    focusedSvg: <BottomCommunitySvg color="black" />,
    unFocusedSvg: <BottomCommunitySvg />,
    text: 'Community',
  },
  {
    id: 3,
    name: 'ExploreSpaces',
    image: images.profileUnselected,
    imageFocused: images.profileSelected,
    component: ExploreSpaces,
    focusedSvg: <BottomExploreSvg color="black" />,
    unFocusedSvg: <BottomExploreSvg />,
    text: 'Explore',
  },
  {
    id: 2,
    name: 'Profile',
    image: images.profileUnselected,
    imageFocused: images.profileSelected,
    component: Profile,
    focusedSvg: <BottomProfileSvg color="black" />,
    unFocusedSvg: <BottomProfileSvg />,
    text: 'Profile',
  },
];

const BottomTabNavigator = () => {
  const tabsBar = TABS;
  const [selectedTab, setSelectedTab] = useState(tabsBar[0].name);
  const {PostFlatListRef, ProfileFlatListRef, ExploreSpacesFlatListRef} =
    useContext(MyContext);
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
              borderTopRightRadius: wp(7),
              borderTopLeftRadius: wp(7),
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
                      } else if (tab.name === 'Community') {
                        if (PostFlatListRef.current) {
                          PostFlatListRef.current.scrollToOffset({
                            animated: true,
                            offset: 0,
                          });
                        }
                      } else {
                        if (ExploreSpacesFlatListRef.current) {
                          ExploreSpacesFlatListRef.current.scrollToOffset({
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
                      tab.name == 'Community'
                        ? {left: wp(2.5)}
                        : tab.name == 'Profile'
                        ? {right: wp(2.5)}
                        : {left: wp(1.3)},
                    ]}
                    key={tab.id}>
                    {/* <CustomImage
                      source={focused ? tab.imageFocused : tab.image}
                      height={hp(6)}
                      width={wp(50)}
                      resizeMode="contain"
                      disabled
                    /> */}
                    <View style={styles.container}>
                      {focused ? tab.focusedSvg : tab.unFocusedSvg}
                      <TextNormal
                        textStyle={styles.text}
                        color={focused ? 'black' : '#747474'}>
                        {tab.text}
                      </TextNormal>
                    </View>
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

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  text: {
    fontWeight: '600',
  },
});
