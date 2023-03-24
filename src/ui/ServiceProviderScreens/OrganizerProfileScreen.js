import AsyncStorage from '@react-native-async-storage/async-storage';
import {HStack, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useLazyUserProfileQuery} from '../../../apiCall/apiList';
import {onGetUserProfile} from '../../../redux-store/slice/UserProfileSlice';
import {
  CustomHeader,
  LoaderComponent,
  ProfileOptionList,
} from '../../components';
import {Colors, FontFamily, h, IconAsset, w} from '../../utils';

const UserProfileScreen = () => {
  const [getUserProfile, userResponse] = useLazyUserProfileQuery();
  const [userData, setUserData] = useState('');
  const dispatch = useDispatch();
  const {userProfileData, isLoading} = useSelector(state => state.userProfile);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const value = await AsyncStorage.getItem('userInfo');
    const result = JSON.parse(value);
    // console.log(result, 'BBBBBBBBBBBBBBB');
    if (value != null) {
      const userProfileResponse = await getUserProfile(result);
      // console.log(userProfileResponse, 'OOOOOOOOOO');
      // console.log(userResponse, 'YYYYYYYYYY');
      setUserData(userProfileResponse);
    }
    // if (userProfileResponse.data) {
    //   if (userProfileResponse.data.status == 200) {
    //     dispatch(onGetUserProfile(userProfileResponse.data));
    //   }
    // }
  };
  const logoutuser = async () => {
    console.log('AFTER API WORK NEED TO ADD USERDATA FOR LOGOUT');
    // const result = await logoutApi(userData);
    // if (result) {
    //   const respone = await AsyncStorage.removeItem('userInfo');
    //   console.log((respone, 'respone'));
    //   navigation.navigate('SplashScreen');
    // }
    // console.log((result, 'USER HAS BEEN LOGGED OUT'));
    // logoutApiResult('IIIIIIIIIIIIIII');
  };
  console.log(userProfileData.name, 'WWWWWWWWWWWWWWWW');
  return isLoading ? (
    <LoaderComponent />
  ) : (
    <View style={styles.container}>
      {/* <CustomHeader headerName={'Profile'} /> */}
      <ImageBackground
        source={IconAsset.profileBack1}
        style={styles.profileHeadBack}>
        {/* <VStack style={{justifyContent: 'flex-end'}}> */}
        <HStack style={styles.profileView}>
          <Image source={IconAsset.girlProfile} style={styles.profileIcon} />
          <VStack style={{marginLeft: w(5)}}>
            <Text style={styles.profileName}>Hello</Text>
            <Text style={styles.profileName}>{userProfileData.name}</Text>
            <Text style={styles.profileText}>
              Email : {userProfileData.email}
            </Text>
            <Text style={styles.profileText}>
              Contact : {userProfileData.mobile_number}
            </Text>
            {/* <Text style={styles.profileText}>
              Address : {userData.data.user.address}
            </Text>  */}
          </VStack>
        </HStack>
        {/* </VStack> */}
      </ImageBackground>
      <View style={styles.profileBody}>
        <ProfileOptionList
          optionName={'Your Favorites Trips'}
          optionIcon={IconAsset.heartIcon}
          styleText={{color: Colors.black}}
        />
        <ProfileOptionList
          // optionStyle={{position: 'absolute'}}
          optionName={'LogOut'}
          optionIcon={IconAsset.logoutIcon}
          styleText={{color: Colors.red}}
          link={() =>
            Alert.alert(
              '',
              'Are you sure you want to logout ?',
              [
                {
                  text: 'No',
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: () => {
                    logoutuser();
                  },
                },
              ],
              {
                cancelable: true,
              },
            )
          }
        />
      </View>
    </View>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  profileHeadBack: {
    flex: 4,
    // backgroundColor: 'pink',
    // justifyContent: 'center',
    // alignItems: 'center',
    // height: 500,
    width: w(100),
    paddingTop: h(1),
    // opacity: 0.8,
  },
  profileView: {
    marginTop: h(5),
    marginBottom: -h(8),
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    // alignItems: 'baseline',
  },
  profileIcon: {
    height: 100,
    width: 100,
    borderWidth: 1,
    borderColor: Colors.black,
    borderRadius: 50,
  },
  profileBody: {
    flex: 8,
    // backgroundColor: 'red',
  },
  profileName: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: FontFamily.extraBold,
  },
  profileText: {
    color: Colors.white,
    fontSize: 12,
    fontFamily: FontFamily.regular,
  },
});
