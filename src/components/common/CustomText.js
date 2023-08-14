import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../utils/constants/theme';

export const TextNormal = ({
  children,
  textStyle,
  color,
  center,
  bold,
  semiBold,
  heading,
  italic,
  ...rest
}) => {
  return (
    <Text
      style={[
        styles.text,
        italic && {fontFamily: 'IBM Plex Sans Medium Italic'},
        styles.normal,
        bold && {fontWeight: 'bold'},
        color && {color: color},
        semiBold && {fontWeight: '600'},
        center && {textAlign: 'center'},
        textStyle,
      ]}
      suppressHighlighting={true}
      {...rest}>
      {children}
    </Text>
  );
};

export const TextSmall = ({
  children,
  textStyle,
  color,
  center,
  bold,
  heading,
  semiBold,
  ...rest
}) => {
  return (
    <Text
      style={[
        styles.text,
        styles.small,
        bold && {fontWeight: 'bold'},
        semiBold && {fontWeight: '600'},
        center && {textAlign: 'center'},
        color && {color: color},
        textStyle,
      ]}
      suppressHighlighting={true}
      {...rest}>
      {children}
    </Text>
  );
};

export const TextSmaller = ({
  children,
  textStyle,
  color,
  center,
  bold,
  heading,
  ...rest
}) => {
  return (
    <Text
      style={[
        styles.text,
        styles.smaller,
        bold && {fontWeight: '500'},
        color && {color: color},
        center && {textAlign: 'center'},
        textStyle,
      ]}
      suppressHighlighting={true}
      {...rest}>
      {children}
    </Text>
  );
};

export const TextBig = ({
  children,
  textStyle,
  ethnocentric,
  color,
  semiBold,
  center,
  bold,
  heading,
  ...rest
}) => {
  return (
    <Text
      style={[
        styles.text,
        styles.big,
        bold && {fontWeight: 'bold'},
        color && {color: color},
        semiBold && {fontWeight: '600'},
        center && {textAlign: 'center'},
        textStyle,
      ]}
      suppressHighlighting={true}
      {...rest}>
      {children}
    </Text>
  );
};

export const TextBigger = ({
  children,
  textStyle,
  ethnocentric,
  color,
  center,
  bold,
  heading,
  ...rest
}) => {
  return (
    <Text
      style={[
        styles.text,
        styles.bigger,
        bold && {fontWeight: 'bold'},
        color && {color: color},
        center && {textAlign: 'center'},
        textStyle,
      ]}
      suppressHighlighting={true}
      {...rest}>
      {children}
    </Text>
  );
};

export const TextHuge = ({
  children,
  textStyle,
  color,
  center,
  bold,
  heading,
  ...rest
}) => {
  return (
    <Text
      style={[
        styles.text,
        styles.huge,
        textStyle,
        bold && {fontWeight: 'bold'},
        color && {color: color},
        center && {textAlign: 'center'},
      ]}
      suppressHighlighting={true}
      {...rest}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'IBM Plex Sans Regular',
  },
  normal: {
    fontSize: wp(4),
    fontWeight: '400',
    color: COLORS.textColor,
  },

  big: {
    fontSize: wp(5),
    fontWeight: '500',
    color: COLORS.textColor,
  },
  bigger: {
    fontSize: wp(6),
    fontWeight: '600',
    color: COLORS.textColor,
  },
  huge: {
    fontSize: wp(8),
    fontWeight: '700',
    color: COLORS.textColor,
  },
  small: {
    fontSize: wp(3.5),
    color: COLORS.textColor,
  },
  smaller: {
    fontSize: wp(3),
    fontWeight: '300',
    color: COLORS.textColor,
  },
});
