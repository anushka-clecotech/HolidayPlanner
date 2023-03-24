import {HStack} from 'native-base';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors, h, IconAsset, w} from '../utils';

const ProfileOptionList = props => {
  var {optionName, optionIcon, styleText, link, optionStyle} = props;
  return (
    <TouchableOpacity {...props} onPress={link}>
      <HStack style={(styles.options, [optionStyle])}>
        <Image source={optionIcon} style={styles.icon} />
        <Text style={(styles.text, [styleText])}>{optionName}</Text>
      </HStack>
    </TouchableOpacity>
  );
};

export default ProfileOptionList;

const styles = StyleSheet.create({
  options: {
    alignItems: 'center',
    marginVertical: h(1),
    backgroundColor: 'red',
    // justifyContent: 'flex-end',
    // alignSelf: 'baseline',
    position: 'absolute',
  },

  icon: {
    height: 35,
    width: 35,
    marginHorizontal: w(2),
  },
  text: {
    color: Colors.black,
  },
});
