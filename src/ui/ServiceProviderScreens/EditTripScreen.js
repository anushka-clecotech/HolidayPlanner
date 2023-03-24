import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {CustomBTN, CustomInputField, ModalForm} from '../../components';
import {useSelector} from 'react-redux';
import {HStack} from 'native-base';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {w, h, Colors, IconAsset} from '../../utils';

const EditTripScreen = () => {
  const {addTripArr, isAddtripLoading, isAddtripModalVisible} = useSelector(
    state => state.addtrip,
  );
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          width: w(100),
          backgroundColor: Colors.white,
          borderRadius: 5,
          alignSelf: 'center',
        }}>
        <HStack
          style={{
            justifyContent: 'space-between',
            margin: 5,
            // backgroundColor: 'red',
            paddingHorizontal: 20,
          }}>
          <View style={{padding: 5}}>
            <Text
              style={{
                fontFamily: FontFamily.regular_head,
                fontSize: 20,
                color: Colors.ThemeColor,
              }}>
              {'Edit Trip'}
            </Text>
          </View>
        </HStack>

        <View style={{flex: 1}}>
          {/* <KeyboardAvoidingView behavior="padding"> */}
          <FlatList
            data={addTripArr}
            renderItem={({item, index}) => {
              // console.log(item, 'CVCVCVCCV');
              return (
                // <CustomInputField
                //   item={item}
                //   // value={element}
                //   index={index}
                //   onGet={value => {
                //     onGetdata({value, index});
                //     //   dispatch(onChangeAddTripArr({value, index}));
                //   }}
                //   error={item.error ? item.error : null}
                // />
                null
              );
            }}
            // ListFooterComponent={footerBtn}
          />
          {/* </KeyboardAvoidingView> */}
        </View>
        <CustomBTN
          btnStyle={{
            backgroundColor: Colors.ThemeColor,
            width: w(90),
            marginTop: w(5),
            height: 50,
            elevation: 20,
          }}
          btn_name={'Edit Trip'}
          // link={onClickSubmit}
        />
      </View>
    </View>
  );
};

export default EditTripScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
