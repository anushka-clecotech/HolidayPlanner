import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import React from 'react';
import CustomInputField from './CustomInputField';
import {HStack, Modal} from 'native-base';
import {Colors, FontFamily, h, w} from '../utils';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import CustomBTN from './CustomBTN';
import {Keyboard} from 'react-native';

const ModalForm = props => {
  var {
    showModal,
    closeModal,
    data,
    form_name,
    onGetdata,
    footerBtn,
    submitBtnName,
    element,
    onClickSubmit,
  } = props;
  console.log(element, 'VVVVVVVVVV');
  // const [isModalVisible, setModalVisible] = useState(false);
  return (
    <Modal
      isOpen={showModal}
      {...props}
      onClose={() => {
        closeModal(false);
      }}>
      <View
        style={{
          height: h(80),
          width: w(90),
          backgroundColor: Colors.white,
          marginTop: h(5),
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
              {form_name}
            </Text>
          </View>
          <View
            style={{
              // backgroundColor: Colors.ThemeColor,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                closeModal(false);
                //   setModalVisible(false);
                //   console.log(isModalVisible, 'FFFFFFF');
              }}
              style={{
                alignSelf: 'flex-end',
              }}>
              <Icon
                name="close"
                style={{
                  fontSize: 25,
                  color: Colors.ThemeColor,
                  // marginRight: 15,
                  // backgroundColor: 'pink',
                }}
              />
            </TouchableOpacity>
          </View>
        </HStack>

        <View style={{flex: 1}}>
          {/* <KeyboardAvoidingView behavior="padding"> */}
          <FlatList
            data={data}
            renderItem={({item, index}) => {
              // console.log(item, 'CVCVCVCCV');
              return (
                <CustomInputField
                  item={item}
                  // value={element}
                  index={index}
                  onGet={value => {
                    onGetdata({value, index});
                    //   dispatch(onChangeAddTripArr({value, index}));
                  }}
                  error={item.error ? item.error : null}
                />
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
            height: 45,
          }}
          btn_name={'Add Trip'}
          link={onClickSubmit}
        />
      </View>
    </Modal>
  );
};

export default ModalForm;

const styles = StyleSheet.create({});
