import {
  Alert,
  BackHandler,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Colors, FontFamily, h, IconAsset, w} from '../utils';
import {CustomBTN, CustomInputField, LoaderComponent} from '../components';
import {onChangeLoginArr, onGetError} from '../../redux-store/slice/LoginSlice';
import {isEmpty, validateEmail, validateMob} from '../utils/Validation';
import {useLoginApiMutation} from '../../apiCall/apiList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Button, HStack, VStack} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/dist/Feather';

const LoginScreen = () => {
  const {loginArr, isLoading} = useSelector(state => state.login);
  console.log(loginArr, 'LLLLLLLLLL');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [validUser, validResult] = useLoginApiMutation();
  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        Alert.alert('Hold on!', 'Are you sure you want to exit?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ]);
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', backAction);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', backAction);
      };
    }, []),
  );
  const [focus, setfocus] = useState(false);
  const [show, setShow] = useState(false);
  const onLogin = () => {
    console.log('TTTTTTTT');
    var check = 'true';
    loginArr.forEach((element, index) => {
      if (isEmpty(element.value)) {
        check = 'false';
        console.log(index, 'RRRRRRRr');
        dispatch(
          onGetError({
            error: 'Please Provide ' + element.label,
            index,
          }),
        );
      } else if (element.validation === 'username') {
        const test1 = Number(element.value);
        if (test1 == element.value) {
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
        } else {
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
      }
    });
    if (check === 'true') {
      loginApicall();
    }
  };
  const loginApicall = async () => {
    var userData = {
      email: loginArr[0].value,
      password: loginArr[1].value,
    };

    const res = await validUser(userData);
    // console.log(res, 'TTTTTsTTTTTTTTTt');
    // if (res) {
    // console.log(res.data, 'PPPPPPPPPPPPP');
    // }
    if (res.data) {
      if (res.data.status == 200) {
        console.log(res.data.data.user, 'UUUUUUUUUUU');
        storeData(res.data.data.user);

        if (res.data.data.user.user_type === 'organizer') {
          navigation.navigate('EventListingScreen');
        } else if (res.data.data.user.user_type === 'customer') {
          navigation.navigate('UserBottomTab');
        }
      }
    } else {
      console.log(res.error, 'OOOOOOOO');
      // alert();
      Alert.alert('Error', res.error.error);
    }
  };
  const storeData = async value => {
    console.log(value, 'VVVVVVVVVV');
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('userInfo', jsonValue);
    } catch (e) {
      // saving error
      console.log(e, 'LOGIN ERROR');
    }
  };
  const renderForm = ({item, index}) => {
    console.log(item, index);
    return (
      <View>
        {/* <Text style={{color: 'black'}}>{index}</Text> */}
        <HStack
          style={{
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: Colors.gray,
            width: w(50),
          }}>
          <Image
            source={
              item.identifier === 'user'
                ? IconAsset.userIcon
                : IconAsset.lockIcon
            }
            style={{height: 20, width: 20}}
          />
          <TextInput
            placeholder={item.label}
            onChangeText={value => {
              dispatch(onChangeLoginArr({value, index}));
            }}
            secureTextEntry={item.identifier === 'pass' && !show ? true : false}
            keyboardType={item.Keyboard}
            style={{color: Colors.black}}
            placeholderTextColor={Colors.gray}
          />
          {item.identifier === 'pass' ? (
            <TouchableOpacity
              style={{
                height: 20,
                // width: w(20),
                alignSelf: 'flex-end',
                flex: 1,
                marginBottom: 15,
              }}
              onPress={() => {
                setShow(!show);
              }}>
              <View
                style={{
                  // justifyContent: 'center',
                  // alignSelf: 'flex-end',

                  // backgroundColor: 'blue',
                  height: 20,
                  // width: w(50),
                }}>
                {show ? (
                  <FeatherIcon
                    name="eye-off"
                    style={{
                      fontSize: 20,
                      color: Colors.darkGray,
                      alignSelf: 'flex-end',
                    }}
                  />
                ) : (
                  <FeatherIcon
                    name="eye"
                    style={{
                      fontSize: 20,
                      color: Colors.darkGray,
                      alignSelf: 'flex-end',
                    }}
                  />
                )}
              </View>
            </TouchableOpacity>
          ) : null}
        </HStack>
        {item.error ? (
          <VStack mt={1}>
            <Text style={styles.error}>{item.error}</Text>
          </VStack>
        ) : null}
      </View>
    );
  };
  return isLoading ? (
    <LoaderComponent />
  ) : (
    <VStack style={styles.container}>
      <LinearGradient
        colors={['#100245', '#3c15d6', '#4d44fc']}
        style={styles.linearGradient}>
        {/* <Text style={styles.buttonText}>Sign in with Facebook</Text> */}

        <View style={{flex: 1}}>
          <Image
            source={IconAsset.appLogo}
            style={{
              height: h(20),
              width: h(20),
              alignSelf: 'flex-end',
              margin: h(2),
            }}
          />
        </View>

        <View style={{justifyContent: 'center', flex: 8}}>
          {/* <Image source={IconAsset.appLogo} style={{height: 200, width: 200}} /> */}
          <View
            style={{
              height: w(95),
              width: w(95),
              backgroundColor: 'white',
              borderRadius: 50,
              transform: [{rotate: '40deg'}],
              marginLeft: -w(20),
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 20,
              // overflow: 'hidden',
            }}>
            <View
              style={{
                transform: [{rotate: '-40deg'}],
                marginTop: w(8),
                marginRight: -w(20),
                // position: 'absolute',
                // top: 1,
                // bottom: 1,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: Colors.black,
                  fontFamily: FontFamily.regular,
                }}>
                Welcome to
              </Text>
              <Text
                style={{
                  fontSize: 25,
                  color: Colors.ThemeColor,
                  fontFamily: FontFamily.headingFont,
                }}>
                Holiday Planner
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: FontFamily.regular,
                  marginBottom: h(1),
                  color: Colors.gray1,
                }}>
                Please Login to continue
              </Text>
              <FlatList
                data={[
                  {
                    label: 'Username',
                    value: '',
                    error: '',
                    validation: 'username',
                    Keyboard: 'email-address',
                    length: 30,
                    keyType: false,
                    identifier: 'user',
                  },

                  {
                    label: 'Password',
                    value: '',
                    error: '',
                    validation: 'pass',
                    length: 30,
                    identifier: 'pass',
                    keyType: true,
                  },
                ]}
                // keyExtractor={(item, index) => index.toString()}
                renderItem={renderForm}
                ListFooterComponent={() => {
                  return (
                    <View>
                      <Button
                        style={{
                          // position: 'absolute',
                          // top: h(20),
                          // left: w(30),
                          width: w(60),
                          height: 45,
                          backgroundColor: Colors.ThemeColor,
                          marginVertical: h(2),
                        }}
                        onPress={() => {
                          onLogin();
                        }}>
                        Login
                      </Button>
                      <HStack justifyContent={'center'}>
                        <Text
                          style={{
                            fontFamily: FontFamily.regular,
                            fontSize: 12,
                            color: Colors.gray1,
                            marginLeft: -w(8),
                          }}>
                          Don't have an Account ?
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate('UserSelectionScreen');
                          }}>
                          <Text
                            style={{
                              fontFamily: FontFamily.headingFont,
                              color: Colors.ThemeColor,
                              marginLeft: 5,
                              fontSize: 12,
                              textDecorationLine: 'underline',
                            }}>
                            Sign up
                          </Text>
                        </TouchableOpacity>
                      </HStack>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        </View>
      </LinearGradient>
    </VStack>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  error: {
    fontSize: 12,
    color: 'red',
  },
});
