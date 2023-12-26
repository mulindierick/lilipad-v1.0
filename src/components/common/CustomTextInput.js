import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../utils/constants/theme';
import {TextSmall} from './CustomText';
import CustomIcon from './CustomIcon';

const CustomTextInput = ({
  value,
  onChange,
  label,
  onBlur = null,
  onFocus = null,
  placeholder,
  secureTextEntry,
  withIcon,
  iconType,
  iconName,
  shadow,
  optional,
  containerStyle,
  error,
  textInputStyle,
  showError = true,
  multiline = false,
  exploreSpaces = false,
  autoCapitalize = 'none',
  placeholderTextColor = COLORS.placeholder,
  spellCheck = true,
  autoCorrect = true,
  autoFocus = false,
  ref = null,
  keyboardType = 'default',
  defaultValue = '',
  forMultiLineContainerStyle,
}) => {
  const [visible, setVisible] = useState(secureTextEntry ? true : false);

  return (
    <>
      <View style={[styles.container, containerStyle, shadow && styles.shadow]}>
        <View
          style={[
            {
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
            },
            forMultiLineContainerStyle,
          ]}>
          {withIcon ? (
            <CustomIcon
              type={iconType}
              icon={iconName}
              size={wp('5')}
              color={COLORS.lightgrey}
              style={{marginLeft: 10}}
            />
          ) : null}
          <TextInput
            value={value}
            onChangeText={txt => onChange(txt)}
            style={[styles.textInput, textInputStyle]}
            secureTextEntry={visible}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
            onFocus={onFocus}
            onBlur={onBlur}
            multiline={multiline}
            spellCheck={spellCheck}
            autoFocus={autoFocus}
            keyboardType={keyboardType}
            defaultValue={defaultValue}
            allowFontScaling={false}
          />

          {secureTextEntry && (
            <CustomIcon
              style={{paddingRight: wp(3)}}
              icon={!visible ? 'eye' : 'eye-off'}
              type="ionicons"
              onPress={() => setVisible(!visible)}
              color={COLORS.disabledGrey}
            />
          )}
        </View>
      </View>
      {error && (
        <TextSmall color={'red'} semiBold>
          {'*' + error}
        </TextSmall>
      )}
    </>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    height: hp(6),
    width: '100%',
    // borderRadius: wp(2),
    borderRadius: 12,
    // marginVertical: hp(1),
    justifyContent: 'center',
    backgroundColor: '#E4E4E4',
  },
  textInput: {
    height: hp(7),
    flex: 1,
    fontFamily: 'IBMPlexSans-Regular',
    borderBottomColor: COLORS.white,
    borderBottomWidth: 0,
    paddingHorizontal: wp(4),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  shadow: {
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.16,
    shadowRadius: 3,
    backgroundColor: COLORS.white,
    borderWidth: 0,
  },
});
