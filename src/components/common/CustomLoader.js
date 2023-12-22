import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ReactNativeModal from 'react-native-modal';
import {COLORS, images} from '../../utils/constants/theme';
import CustomImage from './CustomImage';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const CustomLoader = ({
  splashScreen = false,
  isVisible,
  PostDetail = false,
}) => {
  if (splashScreen) {
    return (
      <ReactNativeModal
        isVisible={isVisible}
        style={styles.container}
        animationIn={'slideInRight'}
        animationOut={'slideOutLeft'}
        backdropOpacity={1}>
        <View
          style={{position: 'absolute', bottom: 0, right: 0, left: 0, top: 0}}>
          <CustomImage
            source={images.loaderImage}
            containerStyle={{
              height: heightPercentageToDP(100),
              width: widthPercentageToDP(100),
            }}
            resizeMode="cover"
          />
        </View>
      </ReactNativeModal>
    );
  }

  if (PostDetail) {
    return (
      <ReactNativeModal
        isVisible={true}
        style={styles.container}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        backdropOpacity={1}
        backdropColor={COLORS.white}>
        <ActivityIndicator size={'small'} color={COLORS.grey} />
      </ReactNativeModal>
    );
  }

  return (
    <ReactNativeModal
      isVisible={true}
      style={styles.container}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      backdropOpacity={0.1}
      backdropColor={COLORS.white}>
      <ActivityIndicator size={'large'} color={COLORS.grey} />
    </ReactNativeModal>
  );
};

export default CustomLoader;

const styles = StyleSheet.create({
  container: {
    margin: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
