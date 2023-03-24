import React from 'react';
import {Button} from 'native-base';
import {StyleSheet, Text, View} from 'react-native';
import {w, Colors} from '../utils';

const CustomBTN = props => {
  var {btn_name, link, btnStyle, btnText} = props;
  return (
    <Button onPress={link} style={[btnStyle, styles.btn]} {...props}>
      <Text style={[btnText, styles.text]}>{btn_name}</Text>
    </Button>
  );
};

export default CustomBTN;

const styles = StyleSheet.create({
  btn: {
    // backgroundColor: Colors.ThemeColor,
    // width: w(95),
    alignSelf: 'center',
    // marginTop: w(5),
  },
  text: {
    color: Colors.white,
    fontFamily: FontFamily.headingFont,
  },
});
