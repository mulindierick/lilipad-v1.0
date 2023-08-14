import React from 'react';
import {StyleSheet, View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../../utils/constants/theme';
import CustomIcon from '../common/CustomIcon';
import CustomHeader from '../common/CustomHeader';

const CustomWrapper = ({
  children,
  requiresHeader = false,
  forInfoFurtherScreen = false,
}) => {
  return (
    <SafeAreaView style={styles.container}>
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
