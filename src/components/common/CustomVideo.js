import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {memo, useMemo, useState} from 'react';
import Video from 'react-native-video';
import {COLORS} from '../../utils/constants/theme';
import {useFocusEffect} from '@react-navigation/native';

const CustomVideo = ({uri, containerStyle, index, activeIndex}) => {
  const [loading, setLoading] = useState(true);

  const uriMemoized = useMemo(() => uri, [uri]);

  return (
    <>
      <Video
        source={{uri: uriMemoized}}
        style={containerStyle}
        resizeMode="contain"
        controls={true} // Store reference
        onBuffer={() => setLoading(false)}
        onLoadStart={() => setLoading(true)}
        onError={err => console.log(err)} // Callback when video cannot be loaded
        playWhenInactive={false}
        playInBackground={false}
        paused={index == activeIndex ? false : true}
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

export default memo(CustomVideo);

const styles = StyleSheet.create({});
