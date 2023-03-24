import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, HStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors, FontFamily, h, IconAsset, w} from '../utils';
import {useLogoutUserMutation} from '../../apiCall/apiList';
import {useNavigation} from '@react-navigation/native';
import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
} from 'react-native-fontawesome';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const CustomHeader = ({
  add,
  search,
  filter,
  showSearchBar,
  searchIcon,
  filterIcon,
  addIcon,
}) => {
  // const [userData, setUserData] = useState('');
  // const [logoutApi, logoutApiResult] = useLogoutUserMutation();
  // const [showSearch, setShowSearch] = useState(false);

  // useEffect(() => {
  //   getData();
  // }, []);
  // const getData = async () => {
  //   const result = await AsyncStorage.getItem('userInfo');
  //   const user = JSON.parse(result);
  //   setUserData(user);
  // };
  // const logoutuser = async () => {
  //   console.log('WWWWWWWWWWWWWWWWWw');
  //   const result = await logoutApi(userData);
  //   if (result) {
  //     const respone = await AsyncStorage.removeItem('userInfo');
  //     console.log((respone, 'respone'));
  //     navigation.navigate('SplashScreen');
  //   }
  //   console.log((result, 'USER HAS BEEN LOGGED OUT'));
  //   logoutApiResult('IIIIIIIIIIIIIII');
  // };
  // const HeaderOptions = props => {
  //   var {icon} = props;
  //   return (
  //     <TouchableOpacity
  //       onPress={() => {
  //         setShowSearch(!showSearch);
  //       }}
  //       style={{marginHorizontal: w(2), height: 30, width: 30}}>
  //       <Icon name={icon} style={{fontSize: 30, color: Colors.white}} />
  //     </TouchableOpacity>
  //   );
  // };
  return (
    <View style={styles.headerBox}>
      <HStack style={{justifyContent: 'space-between', marginHorizontal: w(2)}}>
        <Image source={IconAsset.appLogo} style={{height: 45, width: 45}} />
        <HStack style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              search(!showSearchBar);
              // search(showSearch);
            }}
            style={{marginHorizontal: w(2), height: 30, width: 30}}>
            <Icon
              name={searchIcon}
              style={{fontSize: 25, color: Colors.white}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              filter(true);
            }}
            style={{marginHorizontal: w(2), height: 30, width: 30}}>
            <Icon
              name={filterIcon}
              style={{fontSize: 25, color: Colors.white}}
            />
          </TouchableOpacity>
          {addIcon ? (
            <TouchableOpacity
              onPress={() => {
                add(true);
              }}
              style={{marginHorizontal: w(2), height: 30, width: 30}}>
              <Icon
                name={addIcon}
                style={{fontSize: 30, color: Colors.white}}
              />
            </TouchableOpacity>
          ) : null}
          {/* <HeaderOptions icon={'plus'} />
          <HeaderOptions icon={'search'} />
          <HeaderOptions icon={'filter'} /> */}
        </HStack>
      </HStack>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  headerBox: {
    backgroundColor: Colors.ThemeColor,
    height: h(8),
    justifyContent: 'center',
    elevation: 20,
  },
  // headerText: {
  //   textAlign: 'center',
  //   color: Colors.white,
  //   fontSize: 20,
  //   fontFamily: FontFamily.headingFont,
  //   alignSelf: 'center',
  // },
});
