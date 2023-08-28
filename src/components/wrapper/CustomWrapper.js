import React from 'react';
import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../../utils/constants/theme';
import CustomHeader from '../common/CustomHeader';

const CustomWrapper = ({
  children,
  requiresHeader = false,
  forInfoFurtherScreen = false,
  containerStyle,
}) => {
  return (
    <SafeAreaView style={[styles.container, containerStyle]}>
      {requiresHeader && (
        <CustomHeader forInfoFurtherScreen={forInfoFurtherScreen} />
      )}
      {children}
    </SafeAreaView>
  );
};

export default CustomWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
    paddingHorizontal: wp(4),
  },
  header: {},
});
