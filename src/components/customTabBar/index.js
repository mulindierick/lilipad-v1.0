import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import PagerView from 'react-native-pager-view';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../utils/constants/theme';
import {TextNormal} from '../common/CustomText';

const CustomTabBar = props => {
  const {
    children,
    tabs = [],
    activeIndex,
    setActiveIndex,
    pagerRef,
    innerContainerStyle,
  } = props;

  if (children?.length != tabs.length) {
    console.error('Make sure the children and tabs are of same length');
  }

  const onPageScroll = event => {
    let position = event?.nativeEvent.position;
    setActiveIndex(position);
  };

  const onPressTab = index => {
    pagerRef.current?.setPage(index);
    // setActiveIndex(index)
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
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
      </View>
      <PagerView
        style={styles.pagerView}
        ref={pagerRef}
        onPageScroll={onPageScroll}>
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
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: hp(5),
  },
  selectedTab: {
    backgroundColor: COLORS.primary,
  },
  pagerView: {
    flex: 1,
  },
});
