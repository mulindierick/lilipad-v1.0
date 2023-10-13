import React, {useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../../utils/constants/theme';

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

  return (
    <View>
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
          source={source}
          style={{height: '100%', width: '100%'}}
          resizeMode={resizeMode || 'contain'}
          // resizeMode='contain'
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          {...rest}
        />
        {(isLoading || imageProcessing) && (
          <ActivityIndicator
            size="large"
            color={COLORS.grey}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
          />
        )}
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

export default CustomImage;

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
