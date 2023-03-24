import React from 'react';
import {Button, HStack, VStack, View, Image} from 'native-base';
import {Colors, w, h, IconAsset} from '../utils';
import {FlatList, StyleSheet, Text} from 'react-native';
const CustomEventListing = props => {
  var {listData, listHeader, onRefresh, isLoadMore, onEnd, columnNumber} =
    props;
  const onHandleRefresh = () => {
    onRefresh();
  };
  const onHandleEndReached = async () => {
    if (isLoadMore) {
      onEnd();
    }
  };
  return (
    <View style={{marginBottom: w(15)}}>
      <FlatList
        {...props}
        ListHeaderComponent={listHeader}
        data={listData}
        keyExtractor={(item, index) => index.toString()}
        refreshing={false}
        onRefresh={onHandleRefresh}
        onEndReached={onHandleEndReached}
      />
    </View>
  );
};

export default CustomEventListing;

const styles = StyleSheet.create({});
