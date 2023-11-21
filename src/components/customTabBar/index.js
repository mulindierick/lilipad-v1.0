import React, {useEffect, useRef} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import PagerView from 'react-native-pager-view';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../utils/constants/theme';
import {TextNormal} from '../common/CustomText';
import {Animated} from 'react-native';

const headerHeight = hp(38.5);
let scrollValue = 0;
let headerVisible = true;
let focused = false;

const CustomTabBar = props => {
  const {
    children,
    tabs = [],
    activeIndex,
    setActiveIndex,
    pagerRef,
    innerContainerStyle,
    y,
    setUpperBorderFlag,
  } = props;

  if (children?.length != tabs.length) {
    console.error('Make sure the children and tabs are of same length');
  }

  const onPageScroll = event => {
    let position = event?.nativeEvent.position;
    setActiveIndex(position);
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
      bounciness: 0,
    }).start();
    headerVisible = true;
    setUpperBorderFlag(false);
  };

  const onPressTab = index => {
    pagerRef.current?.setPage(index);
    // setActiveIndex(index)
  };

  //For Animation
  const animation = useRef(new Animated.Value(1)).current;
  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, headerHeight / 2 - 2],
  });
  const inputTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [headerHeight / 4, 0],
  });
  const opacity = animation;

  useEffect(() => {
    if (focused) return;

    if (y > scrollValue && headerVisible && y > headerHeight / 2) {
      Animated.spring(animation, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 0,
      }).start();
      headerVisible = false;
      setUpperBorderFlag(true);
    }
    if (y < scrollValue && !headerVisible) {
      Animated.spring(animation, {
        toValue: 1,
        useNativeDriver: true,
        bounciness: 0,
      }).start();
      headerVisible = true;
      setUpperBorderFlag(false);
    }
    scrollValue = y;
  }, [y]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.animatedFirstContainer, {transform: [{translateY}]}]}>
        <Animated.View
          style={[
            styles.tabContainer,
            {opacity, transform: [{translateY: inputTranslateY}]},
          ]}>
          <TouchableOpacity
            onPress={() => onPressTab(0)}
            style={[
              styles.tab,
              activeIndex == 0 && styles.selectedTab,
              innerContainerStyle,
            ]}>
            <TextNormal color={activeIndex == 0 ? COLORS.blue : '#B0B0B0'}>
              Students
            </TextNormal>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onPressTab(1)}
            style={[
              styles.tab,
              activeIndex == 1 && styles.selectedTab,
              innerContainerStyle,
              {marginLeft: wp(3)},
            ]}>
            <TextNormal color={activeIndex == 1 ? COLORS.blue : '#B0B0B0'}>
              Spaces
            </TextNormal>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>

      {/* <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => onPressTab(0)}
          style={[
            styles.tab,
            activeIndex == 0 && styles.selectedTab,
            innerContainerStyle,
          ]}>
          <TextNormal color={activeIndex == 0 ? COLORS.blue : '#B0B0B0'}>
            Students
          </TextNormal>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onPressTab(1)}
          style={[
            styles.tab,
            activeIndex == 1 && styles.selectedTab,
            innerContainerStyle,
            {marginLeft: wp(3)},
          ]}>
          <TextNormal color={activeIndex == 1 ? COLORS.blue : '#B0B0B0'}>
            Spaces
          </TextNormal>
        </TouchableOpacity>
      </View> */}
      <PagerView
        style={styles.pagerView}
        ref={pagerRef}
        onPageScroll={onPageScroll}
        scrollEnabled={false}>
        {children}
      </PagerView>
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    // borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: COLORS.backgroundColor,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: hp(5),
    marginLeft: wp(6),
  },
  selectedTab: {
    backgroundColor: COLORS.primary,
  },
  pagerView: {
    flex: 1,
  },
  animatedFirstContainer: {
    height: headerHeight / 2,
    marginTop: hp(-20),
    zIndex: 10000,
  },
});
