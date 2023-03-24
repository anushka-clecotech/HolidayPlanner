import {Colors} from '../utils';
import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {w} from '../utils';
const LoaderMoreComponent = () => {
  return (
    <ActivityIndicator
      size={'small'}
      color={Colors.grey}
      style={styles.loader}
    />
  );
};

const styles = StyleSheet.create({
  loader: {
    // flex: 1,
    // position: 'absolute',
    // top: 0,
    // bottom: 0,
    // left: 0,
    // right: 0,
    marginVertical: w(5),
  },
});
export default LoaderMoreComponent;
