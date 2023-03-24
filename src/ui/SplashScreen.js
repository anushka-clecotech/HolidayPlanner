import React, {useCallback, useEffect, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {Colors, IconAsset, w, h} from '../utils';
import {Button, HStack, VStack} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

const SplashScreen = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState('');

  useEffect(() => {
    // getData();
    setTimeout(() => {
      getData();
    }, 2000);
  }, []);
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('userInfo');
      const userData = JSON.parse(value);
      if (userData !== null) {
        console.log(userData, 'RESULT');
        if (userData.user_type === 'organizer') {
          navigation.navigate('OrganizerBottomTab');
        } else {
          navigation.navigate('UserBottomTab');
        }
      } else {
        navigation.navigate('LoginScreen');
      }
    } catch (e) {
      console.log(e, 'EEEEEEEEEEEEEE');
    }
  };

  return (
    <VStack style={styles.container}>
      <LinearGradient
        colors={['#100245', '#3c15d6', '#4d44fc']}
        style={styles.linearGradient}>
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Image source={IconAsset.appLogo} style={{height: 200, width: 200}} />
        </View>
      </LinearGradient>
    </VStack>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {flex: 1},

  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
