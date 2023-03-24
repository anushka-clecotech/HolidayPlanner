import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {w} from '../utils';
import {HStack, VStack} from 'native-base';
import EntypoIcon from 'react-native-vector-icons/dist/Entypo';
import AntDesignIcon from 'react-native-vector-icons/dist/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const HeaderSection = props => {
  var {backlink, wishlink} = props;

  return (
    <View
      style={{
        // height: 500,
        // backgroundColor: 'red',
        position: 'absolute',
        zIndex: 99,
        width: w(100),
      }}>
      <HStack justifyContent={'space-between'}>
        <TouchableOpacity onPress={backlink}>
          <VStack style={styles.backBtnView}>
            <AntDesignIcon
              name="arrowleft"
              style={{
                fontSize: 25,
                color: Colors.gray1,
              }}
            />
          </VStack>
        </TouchableOpacity>
        <TouchableOpacity onPress={wishlink}>
          <VStack style={styles.backBtnView}>
            <AntDesignIcon
              name="hearto"
              style={{
                fontSize: 20,
                color: Colors.gray1,
              }}
            />
          </VStack>
        </TouchableOpacity>
      </HStack>
    </View>
  );
};

export default HeaderSection;

const styles = StyleSheet.create({
  backBtnView: {
    margin: w(5),
    backgroundColor: 'white',
    width: w(8),
    height: w(8),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: w(5),
  },
});
