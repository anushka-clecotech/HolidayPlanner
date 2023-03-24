import {
  StyleSheet,
  Text,
  View,
  TextInput,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, h, w} from '../../utils';
import {CustomBTN, CustomInputField, LoaderComponent} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList, VStack} from 'native-base';
import {
  onChangeOrganizerSignupArr,
  onGetError,
} from '../../../redux-store/slice/OrganizerSignupFormSlice';
import {isEmpty, validateEmail, validateMob} from '../../utils/Validation';
import {useSignupApiMutation} from '../../../apiCall/apiList';
import {useNavigation} from '@react-navigation/native';

const OrganizerSignupFormScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  const {user, organizerArr, isLoading} = useSelector(
    state => state.organizersignup,
  );
  const [createUser, createdResult] = useSignupApiMutation();

  const onSubmit = () => {
    var check = 'true';
    organizerArr.forEach((element, index) => {
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
          var pass = organizerArr[index - 1];
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
      name: organizerArr[0].value,
      email: organizerArr[1].value,
      mobile_number: organizerArr[2].value,
      gender: organizerArr[3].value,
      age: organizerArr[4].value,
      password: organizerArr[5].value,
      confirm_password: organizerArr[6].value,
      address: organizerArr[7].value,
      organization_name: organizerArr[8].value,
      organization_mobile_number: organizerArr[9].value,
      organization_registration_year: organizerArr[10].value,
      organization_member_number: organizerArr[11].value,
      user_type: user.userType,
      latitude: user.latitude,
      longitude: user.longitude,
    };
    console.log(userData, 'UUUUUUUUUUUU');
    const res = await createUser(userData);
    console.log(res.data, 'RESULTTTTTTTTTTTTTTT');
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
          Organizer Detail Form
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
          data={organizerArr}
          renderItem={({item, index}) => {
            return (
              <CustomInputField
                index={index}
                item={item}
                onGet={value => {
                  dispatch(onChangeOrganizerSignupArr({value, index}));
                }}
                error={item.error ? item.error : null}
              />
            );
          }}
          ListFooterComponent={() => {
            return (
              <CustomBTN
                btnStyle={{
                  backgroundColor: Colors.ThemeColor,
                  width: w(90),
                  marginTop: w(5),
                  height: 45,
                }}
                btn_name={'Submit'}
                link={() => {
                  onSubmit();
                }}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

export default OrganizerSignupFormScreen;
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
