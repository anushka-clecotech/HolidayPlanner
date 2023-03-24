import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HStack, NativeBaseProvider, VStack} from 'native-base';
import {Provider} from 'react-redux';
import {store} from './redux-store/store';
import {Image, StyleSheet, Text, View, LogBox} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {
  SplashScreen,
  UserSelectionScreen,
  HomeScreen,
  UserEventListingScreen,
  EventListingScreen,
  UserProfileScreen,
  UserEventDetailsScreen,
  LoginScreen,
  OrganizerProfileScreen,
  EventDetailsScreen,
  UserSignupFormScreen,
  OrganizerSignupFormScreen,
  EditTripScreen,
} from './src/ui';
import {Colors, IconAsset, w} from './src/utils';
import {CustomBottomTab} from './src/components';
const Stack = createNativeStackNavigator();
const Bottom = createBottomTabNavigator();
LogBox.ignoreAllLogs();
// const ActiveTab = props => {
//   // console.log('PPPPPPP');
//   var {tabIcon, tabName} = props;
//   return (
//     <HStack
//       style={{
//         backgroundColor: Colors.lightOrange,
//         padding: 10,
//         borderRadius: 30,
//       }}>
//       <Image
//         source={tabIcon}
//         style={{height: 30, width: 30, tintColor: Colors.ThemeColor}}
//       />
//       <Text
//         style={{
//           fontSize: 15,
//           marginLeft: 10,
//           color: Colors.ThemeColor,
//           marginTop: 5,
//         }}>
//         {tabName}
//       </Text>
//     </HStack>
//   );
// };
// const DeactiveTab = props => {
//   console.log('PPPPPPP');
//   var {tabIcon, tabName} = props;

//   return (
//     <HStack>
//       <Image
//         source={tabIcon}
//         style={{height: 30, width: 30, tintColor: Colors.ThemeColor}}
//       />
//     </HStack>
//   );
// };

// const CustomTab = props => {
//   var {info, tabIcon, tabName} = props;
//   return (
//     <VStack style={{backgroundColor: 'red'}}>
//       <HStack style={info.focused ? styles.activeTab : styles.deActiveTab}>
//         <Image
//           source={tabIcon}
//           style={info.focused ? styles.activeTabImg : styles.deActiveTabImg}
//         />
//       </HStack>
//     </VStack>
//   );
// };
const UserBottomNavigator = () => {
  return (
    <Bottom.Navigator
      tabBar={props => <CustomBottomTab {...props} />}
      screenOptions={({route}) => ({
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Bottom.Screen
        name="Home"
        component={UserEventListingScreen}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
        }}
      />
      <Bottom.Screen
        name="Chat"
        component={HomeScreen}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
        }}
      />
      <Bottom.Screen
        name="Profile"
        component={UserProfileScreen}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
        }}
      />
    </Bottom.Navigator>
  );
};
const OrganizerBottomNavigator = () => {
  return (
    <Bottom.Navigator
      tabBar={props => <CustomBottomTab {...props} />}
      screenOptions={({route}) => ({
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Bottom.Screen
        name="Home"
        component={EventListingScreen}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
        }}
      />
      <Bottom.Screen
        name="Chat"
        component={HomeScreen}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
        }}
      />
      <Bottom.Screen
        name="Profile"
        component={OrganizerProfileScreen}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
        }}
      />
    </Bottom.Navigator>
  );
};
const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NativeBaseProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen">
              <Stack.Screen
                name="SplashScreen"
                component={SplashScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="UserSelectionScreen"
                component={UserSelectionScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="EventListingScreen"
                component={EventListingScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="UserBottomTab"
                component={UserBottomNavigator}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="OrganizerBottomTab"
                component={OrganizerBottomNavigator}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="UserEventDetailsScreen"
                component={UserEventDetailsScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="EventDetailsScreen"
                component={EventDetailsScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="UserSignupFormScreen"
                component={UserSignupFormScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="OrganizerSignupFormScreen"
                component={OrganizerSignupFormScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="EditTripScreen"
                component={EditTripScreen}
                options={{headerShown: false}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
      </PaperProvider>
    </Provider>
  );
};

export default App;
const styles = StyleSheet.create({
  activeTab: {
    padding: 8,
    borderRadius: 40,
  },
  activeTabImg: {
    height: 30,
    width: 30,
    tintColor: Colors.ThemeColor,
  },
  deActiveTab: {
    padding: 5,
  },
  deActiveTabImg: {
    height: 30,
    width: 30,
    tintColor: Colors.gray,
  },
});
