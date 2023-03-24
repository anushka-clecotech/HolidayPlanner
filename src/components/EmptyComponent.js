import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, FontFamily, h, IconAsset, w} from '../utils';

const EmptyComponent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.emptyListStyle}>
        <Image source={IconAsset.emptyList} style={styles.emptyImg} />
        <Text style={styles.emptyMessageStyle}>
          You haven't organized any Trip
        </Text>
      </View>
    </View>
  );
};

export default EmptyComponent;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    height: h(100),
  },
  emptyListStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyMessageStyle: {
    textAlign: 'center',
    color: Colors.gray1,
    fontFamily: FontFamily.regular,
    fontSize: 20,
  },
  emptyImg: {
    justifyContent: 'center',
    height: w(50),
    width: w(50),
  },
});
