import {
  StyleSheet,
  Text,
  View,
  TextInput,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, h} from '../../utils';
import {
  CustomBTN,
  CustomInputField,
  LoaderComponent,
  ValidationCheck,
} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList, VStack} from 'native-base';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import {
  onChangeUserSignupArr,
  onGetError,
} from '../../../redux-store/slice/UserSignupSlice';
import Geolocation from '@react-native-community/geolocation';
import {isEmpty, validateEmail, validateMob} from '../../utils/Validation';
import {useSignupApiMutation} from '../../../apiCall/apiList';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';

const UserSignupFormScreen = props => {
  console.log(props.route.params, 'XXXXXXXXXXXXXXX');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  const {user, userArr, isLoading} = useSelector(state => state.usersingup);
  const [createUser, createdResult] = useSignupApiMutation();

  const onSubmit = () => {
    var check = 'true';
    userArr.forEach((element, index) => {
      if (isEmpty(element.value)) {
        check = 'false';
        dispatch(
          onGetError({
            error: 'Please Provide ' + element.label,
            index,
          }),
        );
      } else if (element.validation) {
        if (element.validation === 'email') {
          var testemail = validateEmail(element.value);
          if (!testemail) {
            check = 'false';
            dispatch(
              onGetError({
                error: 'Invalid Email ID',
                index,
              }),
            );
          } else {
            check === 'true';
          }
        }
        if (element.validation === 'mobile') {
          var testmob = validateMob(element.value);
          if (!testmob) {
            check = 'false';
            dispatch(
              onGetError({
                error: 'Invalid Mobile Number',
                index,
              }),
            );
          } else {
            check === 'true';
          }
        }
        if (element.validation === 'age') {
          if (element.value < 18) {
            check = 'false';
            dispatch(
              onGetError({
                error: 'Age must be 18+',
                index,
              }),
            );
          } else {
            check === 'true';
          }
        }
        if (element.validation === 'pass') {
          if (element.value.length < 6) {
            check = 'false';
            dispatch(
              onGetError({
                error: 'Password is too shorts (minimum is 6 characters)',
                index,
              }),
            );
          } else {
            check === 'true';
          }
        }
        if (element.validation === 'cpass') {
          var pass = userArr[index - 1];
          if (element.value !== pass.value) {
            check = 'false';
            dispatch(
              onGetError({
                error: 'Password not Matched!!',
                index,
              }),
            );
          } else {
            check === 'true';
          }
        }
        if (element.validation === 'year') {
          if (element.value > currentYear || element.value < 1900) {
            check = 'false';
            dispatch(
              onGetError({
                error: 'Please Provide Valid Year',
                index,
              }),
            );
          } else {
            check === 'true';
          }
        }
      }
    });
    console.log(check, 'check');
    if (check === 'true') {
      signupApicall();
    }
  };

  const signupApicall = async () => {
    var userData = {
      name: userArr[0].value,
      email: userArr[1].value,
      mobile_number: userArr[2].value,
      gender: userArr[3].value,
      age: userArr[4].value,
      password: userArr[5].value,
      confirm_password: userArr[6].value,
      address: userArr[7].value,
      // image_file: userArr[8].value,
      user_type: user.userType,
      latitude: user.latitude,
      longitude: user.longitude,
    };

    console.log(userData, 'UUUUUUUUUUUU');
    const res = await createUser(userData);

    console.log(res, 'RESULTTTTTTTTTTTTTTT');
    if (res.data) {
      console.log(res.data.data.user.user_type, 'RRRRRRRRRRR');

      navigation.navigate('LoginScreen');
    } else if (res.error) {
      if (res.error.data) {
        Alert.alert('Error', res.error.data.messages);
      } else {
        Alert.alert('Error', res.error.error);
      }
    }
    // const res = JSON.stringify(userData);

    // const test = RNFetchBlob.fetch(
    //   'POST',
    //   'http://192.168.1.21:3000/api/v1/sign_up',
    //   {
    //     'Content-Type': 'multipart/form-data',
    //   },
    //   [
    //     // element with property `filename` will be transformed into `file` in form data
    //     // {name: 'avatar', filename: 'avatar.png', data: binaryDataInBase64},
    //     // custom content type
    //     {
    //       name: 'image_file',
    //       filename: 'avatar-foo.png',
    //       type: 'image/png',
    //       data: RNFetchBlob.wrap(userArr[8].value),
    //     },
    //     // // part file from storage
    //     // {
    //     //   name: 'avatar-foo',
    //     //   filename: 'avatar-foo.png',
    //     //   type: 'image/foo',
    //     //   data: RNFetchBlob.wrap(path_to_a_file),
    //     // },
    //     // elements without property `filename` will be sent as plain text
    //     // {name: 'name', data: userArr[0].value},
    //     // {name: 'email', data: userArr[1].value},
    //     // {name: 'mobile_number', data: userArr[2].value},
    //     // {name: 'gender', data: userArr[3].value},
    //     // {name: 'age', data: userArr[4].value},
    //     // {name: 'password', data: userArr[5].value},
    //     // {name: 'confirm_password', data: userArr[6].value},
    //     // {name: 'address', data: userArr[7].value},
    //     // {name: 'user_type', data: 'costumer'},
    //     {
    //       name: 'user',
    //       data: JSON.stringify({
    //         userData,
    //       }),
    //     },
    //   ],
    // )
    //   .then(resp => {
    //     // ...
    //     console.log(resp.array, 'DDDDDDDDDDDD');
    //   })
    //   .catch(err => {
    //     // ...
    //     console.log(err, 'AAAAAAAAAAAAaaa');
    //   });

    // console.log(test, 'JJJJJJJJJJJJJ');
  };

  return isLoading ? (
    <LoaderComponent />
  ) : (
    <View style={styles.container}>
      <VStack backgroundColor={Colors.ThemeColor} py={5} mb={5}>
        <Text
          style={{
            textAlign: 'center',
            color: Colors.white,
            fontFamily: FontFamily.headingFont,
            fontSize: 20,
          }}>
          User Detail Form
        </Text>
      </VStack>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.white,
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: Colors.gray,
            fontFamily: FontFamily.regular,
            fontSize: 14,
          }}>
          Please fill out the form below to get started
        </Text>

        <FlatList
          style={{
            flex: 1,
          }}
          keyExtractor={(item, index) => index.toString()}
          data={userArr}
          renderItem={({item, index}) => {
            return (
              <CustomInputField
                index={index}
                item={item}
                data={userArr}
                onGet={value => {
                  console.log(value, 'VVVVVVVVVVv');
                  dispatch(onChangeUserSignupArr({value, index}));
                }}
                error={item.error ? item.error : null}
              />
            );
          }}
          ListFooterComponent={() => {
            return (
              <CustomBTN
                btn_name={'Submit'}
                link={() => {
                  onSubmit();
                  // <ValidationCheck data={userArr} />;
                }}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

export default UserSignupFormScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: w(5),
    backgroundColor: Colors.white,
    justifyContent: 'center',
  },

  headText: {
    textAlignVertical: 'center',
    fontSize: 26,
    color: Colors.ThemeColor,
    fontWeight: 'bold',
  },
  optionActive: {
    justifyContent: 'space-around',
    borderWidth: 1,
    alignItems: 'center',
    borderColor: Colors.ThemeColor,
    borderRadius: 20,
  },
  optionDeactive: {
    justifyContent: 'space-around',
    borderWidth: 1,
    alignItems: 'center',
    borderColor: Colors.gray,
    borderRadius: 20,
  },
  userTypeIcon1: {
    marginTop: 10,
  },
  textActive: {
    color: Colors.ThemeColor,
    fontFamily: FontFamily.extraBold,
    fontSize: 20,
    textAlign: 'center',
    padding: h(2),
  },
  textDeactive: {
    color: Colors.gray,
    fontSize: 20,
    padding: h(2),
    fontFamily: FontFamily.openSans,
    textAlign: 'center',
  },
});
