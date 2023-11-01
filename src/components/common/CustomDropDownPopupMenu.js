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
import {COLORS} from '../../utils/constants/theme';
import {TextNormal} from './CustomText';

const CustomDropDownPopupMenu = ({
  selectedFilter,
  contentContainerStyle,
  style,
  children = null,
  focus = false,
  possibleHeight = hp(10),
  setSelectedFilter,
  setFocus,
}) => {
  const [animation] = useState(new Animated.Value(focus ? 1 : 0)); // Initialize to 1 if focused, 0 if not
  const containerRef = useRef(null);

  useEffect(() => {
    animateDropDown(focus ? 1 : 0);
  }, [focus]);

  const animateDropDown = toValue => {
    Animated.timing(animation, {
      toValue,
      duration: 300, // Adjust the duration as needed
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  const height = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, wp(35)], // Adjust the height as needed
  });

  return (
    <>
      <Animated.View ref={containerRef} style={[styles.container, {height}]}>
        <FlatList
          data={['Recent', 'Popular', 'My Posts']}
          style={[style]}
          contentContainerStyle={[
            contentContainerStyle,
            styles.shadow,
            styles.contentContainer,
          ]}
          renderItem={({item, index}) => (
            <TextNormal
              textStyle={[
                styles.filterPopMenuText,
                selectedFilter == item && {color: COLORS.blue},
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

export default CustomDropDownPopupMenu;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    zIndex: 99999999999,
    overflow: 'hidden',
    right: wp(4),
    top: hp(1),
    width: wp(30),
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
    fontSize: wp(4.3),
    fontWeight: '500',
    paddingHorizontal: wp(3),
    marginVertical: hp(1),
  },
});
