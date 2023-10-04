import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLORS, FONTS} from '../../utils/constants/theme';
import CustomTextInput from '../common/CustomTextInput';
import {useFocusEffect} from '@react-navigation/native';

const AddPostTextInput = ({text, setText}) => {
  return (
    <View style={styles.parentContainer}>
      <CustomTextInput
        onChange={txt => setText(txt)}
        value={text}
        multiline={true}
        containerStyle={styles.container}
        textInputStyle={[text ? styles.textInput : styles.placeholderStyle]}
        placeholder={'Share With Your Community...'}
        autoCapitalize="sentences"
        autoCorrect={true}
        autoFocus={true}
      />
    </View>
  );
};

export default AddPostTextInput;

const styles = StyleSheet.create({
  parentContainer: {
    maxHeight: hp(40),
    minHeight: hp(7),
    overflow: 'hidden',
  },
  container: {
    height: hp(35),
    // minHeight: hp(7),
    width: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    marginTop: hp(2.3),
  },
  textInput: {
    height: hp(35),
    flex: 1,
    fontFamily: 'IBMPlexSans-Regular',
    //for overriding customTextInput values
    borderBottomColor: COLORS.white,
    borderBottomWidth: 0,
    fontSize: wp(5),
    alignSelf: 'flex-start',
    paddingHorizontal: wp(2),
  },
  placeholderStyle: {
    fontSize: wp(5.3),
    fontFamily: FONTS.LightItalic,
    alignSelf: 'flex-start',
    fontWeight: '400',
    paddingHorizontal: wp(2),
  },
});
