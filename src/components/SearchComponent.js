import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {Colors} from '../utils';

const SearchComponent = props => {
  var {onGetData, setValue} = props;
  return (
    <View
      style={{
        backgroundColor: Colors.white,
        justifyContent: 'space-around',
        borderWidth: 1,
        borderColor: Colors.ThemeColor,
        margin: 5,
        paddingHorizontal: 5,
      }}>
      <TextInput
        {...props}
        onChangeText={text => onGetData(text)}
        value={setValue}
        placeholder="Search Here"
      />
    </View>
  );
};

export default SearchComponent;

const styles = StyleSheet.create({});
