import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TextBig} from '../../components/common/CustomText';

const Community = () => {
  return (
    <View style={styles.container}>
      <TextBig>Under Construction</TextBig>
    </View>
  );
};

export default Community;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
