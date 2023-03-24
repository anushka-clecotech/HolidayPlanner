import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  BackHandler,
  Alert,
  TouchableOpacity,
  PermissionsAndroid,
  FlatList,
  ScrollView,
} from 'react-native';
import {Button, HStack, VStack} from 'native-base';
import {Colors, w, h, IconAsset, FontFamily} from '../utils';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import SoloIcon from '../../images/solo.svg';
import GroupIcon from '../../images/group.svg';
import Geolocation from '@react-native-community/geolocation';

import {useDispatch, useSelector} from 'react-redux';
import {CustomBTN, CustomInputField, LoaderComponent} from '../components';
import {isEmpty, validateEmail, validateMob} from '../utils/Validation';
import {onChangeOrganizerSignupArr} from '../../redux-store/slice/OrganizerSignupFormSlice';
import {onChangeUserSignupArr} from '../../redux-store/slice/UserSignupSlice';
import LinearGradient from 'react-native-linear-gradient';

const UserSelectionScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {user, isLoading} = useSelector(state => state.organizersignup);
  const [lactionStatus, setLocationStatus] = useState();
  const [userInfo, setUserInfo] = useState({
    latitude: '',
    longitude: '',
    userType: '',
  });

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        //subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
            // subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      // Geolocation.clearWatch(watchID);
    };
  }, []);
  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        setUserInfo({latitude: currentLatitude, longitude: currentLongitude});
        dispatch(
          onChangeOrganizerSignupArr({
            latitude: currentLatitude,
            longitude: currentLongitude,
          }),
        );
        dispatch(
          onChangeUserSignupArr({
            latitude: currentLatitude,
            longitude: currentLongitude,
          }),
        );
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };
  const AccountOption = props => {
    var {userType} = props;
    return (
      <View
        style={
          user.userType === userType
            ? styles.optionActive
            : styles.optionDeactive
        }>
        <TouchableOpacity
          style={
            user.userType === userType ? styles.btnActive : styles.btnDeactive
          }
          onPress={() => {
            setUserInfo({userType: userType});
            dispatch(onChangeOrganizerSignupArr({userType: userType}));
            dispatch(onChangeUserSignupArr({userType: userType}));
          }}>
          {userType === 'customer' ? (
            <SoloIcon width={150} height={120} style={styles.userTypeIcon1} />
          ) : (
            <GroupIcon width={150} height={120} style={styles.userTypeIcon} />
          )}
          <Text
            style={
              user.userType === userType
                ? styles.textActive
                : styles.textDeactive
            }>
            {userType === 'customer' ? 'User' : 'Organizer'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  // console.log(user.userType, 'PPPPPPPPPPPP', form);
  return isLoading ? (
    <LoaderComponent />
  ) : (
    <View style={styles.container}>
      <View
        style={{justifyContent: 'center', width: w(90), alignSelf: 'center'}}>
        <View style={styles.headBox}>
          <Text style={styles.headText}>Choose Account Type</Text>
        </View>
        <HStack my={h(1)} justifyContent={'space-evenly'}>
          {/* <HStack> */}
          <AccountOption userType={'customer'} />
          <AccountOption userType={'organizer'} />
        </HStack>

        <CustomBTN
          btnStyle={{backgroundColor: Colors.ThemeColor, width: w(90)}}
          btnText={{color: Colors.ThemeColor}}
          btn_name={'Next'}
          link={() => {
            if (user.userType === 'customer') {
              navigation.navigate('UserSignupFormScreen', {userInfo});
            } else if (user.userType === 'organizer') {
              navigation.navigate('OrganizerSignupFormScreen', {userInfo});
            } else {
              Alert.alert('Request', 'Please Choose Account Type');
            }
          }}
        />
      </View>
    </View>
  );
};

export default UserSelectionScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  headText: {
    // textAlignVertical: 'center',
    fontSize: 26,
    color: Colors.ThemeColor,
    // fontWeight: 'bold',
    fontFamily: FontFamily.headingFont,
    // marginLeft: w(4),
    // alignItems: 'center',
  },
  optionActive: {
    // justifyContent: 'space-around',
    borderWidth: 1,
    alignItems: 'center',
    borderColor: Colors.ThemeColor,
    borderRadius: 20,
    // marginHorizontal: 50,
  },
  optionDeactive: {
    // justifyContent: '',
    borderWidth: 1,
    alignItems: 'center',
    borderColor: Colors.gray,
    borderRadius: 20,
    // marginHorizontal: 50,
    // width: w(40),
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
