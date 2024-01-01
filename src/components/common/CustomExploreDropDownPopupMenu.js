import React, {useState, useEffect, useRef} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLORS, FONTS} from '../../utils/constants/theme';
import {TextNormal} from './CustomText';

const CustomExploreDropDownPopupMenu = ({
  selectedFilter,
  contentContainerStyle,
  style,
  children = null,
  focus = false,
  possibleHeight = hp(10),
  setSelectedFilter,
  setFocus,
  setNoMoreFetchingPosts,
}) => {
  const [animation] = useState(new Animated.Value(focus ? 1 : 0)); // Initialize to 1 if focused, 0 if not
  const containerRef = useRef(null);

  useEffect(() => {
    animateDropDown(focus ? 1 : 0);
  }, [focus]);

  const animateDropDown = toValue => {
    Animated.timing(animation, {
      toValue,
      duration: 200, // Adjust the duration as needed
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  const height = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, wp(50)], // Adjust the height as needed
  });

  return (
    <>
      {/* {focus && (
        <TouchableWithoutFeedback onPress={() => setFocus(false)}>
          <View
            style={{
              position: 'absolute',
              height: hp(100),
              width: wp(100),
              zIndex: 99999999999,
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}></View>
        </TouchableWithoutFeedback>
      )} */}
      <Animated.View ref={containerRef} style={[styles.container, {height}]}>
        <FlatList
          data={[
            'All Spaces',
            'Living',
            'My Spaces',
            'Other',
            'Activities',
            'User-Created Spaces',
            'Academics',
          ]}
          style={[style]}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            paddingHorizontal: wp(3),
          }}
          contentContainerStyle={[
            contentContainerStyle,
            styles.shadow,
            styles.contentContainer,
          ]}
          renderItem={({item, index}) => (
            <TextNormal
              textStyle={[
                styles.filterPopMenuText,
                selectedFilter == item && {
                  color: COLORS.blue,
                  fontWeight: '600',
                },
              ]}
              onPress={() => {
                setSelectedFilter(item);
                setFocus(false);
              }}>
              {item}
            </TextNormal>
          )}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
        />
      </Animated.View>
    </>
  );
};

export default CustomExploreDropDownPopupMenu;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: wp(15),
    zIndex: 99999999999,
    overflow: 'hidden',
    right: wp(4),
    left: wp(4),
  },
  shadow: {
    backgroundColor: COLORS.white,
    shadowColor: '#000000',
    borderWidth: 0.4,
    borderColor: '#CCCCCC',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    borderRadius: 12,
  },
  contentContainer: {
    borderRadius: 12,
    paddingVertical: hp(1),
  },
  filterPopMenuText: {
    fontFamily: FONTS.Medium,
    fontSize: wp(4.3),
    marginVertical: hp(1),
    fontWeight: '500',
    width: wp(44),
  },
});
