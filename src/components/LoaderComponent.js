import React from 'react';
import {Colors} from '../utils';
import {ActivityIndicator} from 'react-native-paper';
import {Image, StyleSheet, View} from 'react-native';
import * as Animatable from 'react-native-animatable';

const LoaderComponent = () => {
  return (
    <ActivityIndicator
      size={35}
      color={Colors.ThemeColor}
      style={styles.loader}
    />

    // <View>
    //   <Image source={require('../utils')} />
    // </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
export default LoaderComponent;
