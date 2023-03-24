import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import FontistoIcons from 'react-native-vector-icons/dist/Fontisto';
import {HStack} from 'native-base';
import {Colors, FontFamily, w} from '../utils';

const UserProfileOptions = props => {
  var {optionIcon, optionName, link} = props;
  return (
    <TouchableOpacity onPress={link}>
      <HStack justifyContent={'space-between'} my={4} style={{}}>
        <HStack>
          {optionIcon === 'favorite' ? (
            <MaterialIcons
              name={optionIcon}
              style={{fontSize: 22, color: Colors.ThemeColor}}
            />
          ) : (
            <MaterialCommunityIcons
              name={optionIcon}
              style={
                optionIcon === 'logout'
                  ? {fontSize: 22, color: Colors.red}
                  : {fontSize: 22, color: Colors.ThemeColor}
              }
            />
          )}

          <View
            style={{
              justifyContent: 'center',
              //   alignItems: 'center'
            }}>
            <Text
              style={
                optionIcon === 'logout'
                  ? {
                      marginLeft: w(5),
                      fontSize: 16,
                      color: Colors.red,
                      fontFamily: FontFamily.regular_head,
                      includeFontPadding: false,
                    }
                  : {
                      marginLeft: w(5),
                      fontSize: 16,
                      color: Colors.black,
                      fontFamily: FontFamily.regular_head,
                      includeFontPadding: false,
                    }
              }>
              {optionName}
            </Text>
          </View>
        </HStack>
        {optionIcon === 'logout' ? null : (
          <HStack style={{}}>
            <MaterialIcons
              name="navigate-next"
              style={{fontSize: 22, color: Colors.black}}
            />
          </HStack>
        )}
      </HStack>
    </TouchableOpacity>
  );
};

export default UserProfileOptions;

const styles = StyleSheet.create({});
