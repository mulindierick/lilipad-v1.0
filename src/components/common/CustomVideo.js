import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Video from 'react-native-video';
import {COLORS} from '../../utils/constants/theme';
import {useFocusEffect} from '@react-navigation/native';

const CustomVideo = ({uri, containerStyle, pause}) => {
  const [loading, setLoading] = useState(true);
  return (
    <>
      <Video
        source={{uri: uri}}
        style={containerStyle}
        resizeMode="cover"
        controls={true} // Store reference
        onBuffer={() => setLoading(false)}
        onLoadStart={() => setLoading(true)}
        onError={err => console.log(err)} // Callback when video cannot be loaded
        paused={true}
      />
      {loading && (
        <ActivityIndicator
          size="large"
          color={COLORS.grey}
          style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}
        />
      )}
    </>
  );
};

export default CustomVideo;

const styles = StyleSheet.create({});
