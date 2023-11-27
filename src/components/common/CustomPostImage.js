import React, {memo, useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../../utils/constants/theme';
import LottieView from 'lottie-react-native';

const CustomImage = props => {
  const {
    editable,
    id,
    source,
    onRemove,
    height,
    width,
    onPressImage,
    containerStyle,
    disabled,
    resizeMode,
    onPressEditable,
    imageProcessing = false,
    ...rest
  } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [calcImgHeight, setCalcImgHeight] = useState(0);

  const handleLoad = evt => {
    try {
      setCalcImgHeight(
        (evt.nativeEvent.height / evt.nativeEvent.width) * width,
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      {(isLoading || imageProcessing) && (
        <LottieView
          source={require('../../assets/ImageLoader.json')}
          autoPlay
          loop
          style={{height: hp(20), width: wp(101)}}
        />
      )}
      <Pressable
        disabled={disabled}
        onPress={() =>
          typeof onPressImage == 'function' ? onPressImage() : {}
        }
        style={[
          styles.container,
          containerStyle,
          {
            height: height,
            width: width,
          },
        ]}>
        <FastImage
          onLoad={e => handleLoad(e)}
          source={source}
          style={{height: calcImgHeight, width: '100%'}}
          resizeMode={resizeMode || 'contain'}
          // resizeMode='contain'
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          {...rest}
        />
      </Pressable>
      {editable && (
        <TouchableOpacity
          style={styles.iconContainer}
          activeOpacity={0.5}
          onPress={onPressEditable}>
          <MaterialIcons
            name="camera-alt"
            color={COLORS.white}
            disabled
            size={widthPercentageToDP(4)}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default memo(CustomImage);

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  iconContainer: {
    position: 'absolute',
    right: 0,
    bottom: 3,
    backgroundColor: COLORS.grey,
    borderRadius: 100,
    zIndex: 1000,
    padding: 6,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
});
