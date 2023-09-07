import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomTextInput from './CustomTextInput';

const CustomSearchBar = () => {
  return (
    <View>
      <CustomTextInput placeholder="Search" />
    </View>
  );
};

export default CustomSearchBar;

const styles = StyleSheet.create({});
