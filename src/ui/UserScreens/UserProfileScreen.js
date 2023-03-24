import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {HStack, ScrollView, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  useLazyUserProfileQuery,
  useLogoutUserMutation,
} from '../../../apiCall/apiList';
import {onGetUserProfile} from '../../../redux-store/slice/UserProfileSlice';
import {
  CustomBTN,
  CustomHeader,
  LoaderComponent,
  ProfileOptionList,
  UserProfileOptions,
} from '../../components';
import {Colors, FontFamily, h, IconAsset, w} from '../../utils';
import LinearGradient from 'react-native-linear-gradient';

const UserProfileScreen = () => {
  const [getUserProfile, userResponse] = useLazyUserProfileQuery();
  const [logoutApiCall, logoutApiResponse] = useLogoutUserMutation();
  const [userData, setUserData] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {userProfileData, isLoading} = useSelector(state => state.userProfile);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const userProfileResponse = await getUserProfile();
    console.log(userProfileResponse, 'USER PROFILE');
  };
  const logoutuser = async () => {
    const result = await logoutApiCall();
    console.log(result, 'USER HAS BEEN LOGGED OUT');
    console.log(logoutApiResponse, 'RRRRRRRRRRR');
    if (result.data.is_success) {
      const respone = await AsyncStorage.removeItem('userInfo');
      console.log((respone, 'respone'));
      navigation.navigate('LoginScreen');
    } else if (result.error) {
      console.log(result.error.data.messages);
      Alert('Error', result.error.data.messages);
    }
  };
  return isLoading ? (
    <LoaderComponent />
  ) : (
    <View style={styles.container}>
      <View style={{flex: 4}}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#100245', '#220abf', '#4d44fc']}
          style={styles.linearGradient}>
          <VStack
            style={{
              alignSelf: 'center',
              position: 'absolute',
              bottom: w(20),
              // left: 1,
            }}>
            <HStack
              style={{
                // position: 'absolute',
                alignSelf: 'center',
                // marginTop: w(20),
                // marginLeft: -w(2),
              }}>
              <View>
                <Image
                  source={IconAsset.girlProfile}
                  style={{
                    height: w(30),
                    width: w(30),
                    borderRadius: w(15),

                    // alignSelf: 'flex-start',
                  }}
                />
              </View>
              <VStack ml={5} mt={w(2)} style={{width: w(50)}}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: 20,
                    fontFamily: FontFamily.headingFont,
                    textTransform: 'capitalize',
                  }}>
                  {userProfileData.name} Singh Thakur
                </Text>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: 16,
                    fontFamily: FontFamily.regular,
                  }}>
                  {userProfileData.email}
                </Text>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: 16,
                    fontFamily: FontFamily.regular,
                  }}>
                  {userProfileData.mobile_number}
                </Text>
              </VStack>
            </HStack>
          </VStack>
        </LinearGradient>
      </View>
      <View style={{flex: 5}}>
        <ScrollView>
          <View
            style={{
              // backgroundColor: 'yellow',
              alignSelf: 'center',
              flex: 1,
              width: w(85),
            }}>
            <UserProfileOptions
              optionIcon={'account-details'}
              optionName={'My Details'}
            />
            <UserProfileOptions
              optionIcon={'bag-suitcase-outline'}
              optionName={'Booked Plans'}
            />
            <UserProfileOptions optionIcon={'history'} optionName={'History'} />
            <UserProfileOptions
              optionIcon={'favorite'}
              optionName={'Favorite Plans'}
            />

            <UserProfileOptions
              optionIcon={'help-circle-outline'}
              optionName={'Help'}
            />
            <UserProfileOptions
              optionIcon={'information-outline'}
              optionName={'About'}
            />
            <UserProfileOptions
              optionIcon={'logout'}
              optionName={'Log Out'}
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
            {/* <CustomBTN btn_name={'Log Out'} /> */}
          </View>
        </ScrollView>
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
  linearGradient: {
    width: w(140),
    height: w(85),
    backgroundColor: Colors.ThemeColor,
    borderBottomRightRadius: w(70),
    borderBottomLeftRadius: w(70),
    elevation: 20,
    marginTop: -w(30),
    alignSelf: 'center',
    // flex: 1,
  },
});
