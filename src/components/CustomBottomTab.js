import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {HStack} from 'native-base';
import {Colors, h, IconAsset, w} from '../utils';
function CustomBottomTab({state, descriptors, navigation}) {
  return (
    <HStack style={styles.bottomTab}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {route.name === 'Chat' ? (
                <View
                  style={{
                    backgroundColor: Colors.ThemeColor,
                    padding: w(3),
                    borderRadius: w(10),
                    marginTop: -w(7),
                  }}>
                  <Image
                    source={IconAsset.chatIcon}
                    style={
                      isFocused ? styles.activeTabImg : styles.deActiveTabImg
                    }
                    resizeMode="contain"
                  />
                </View>
              ) : (
                <Image
                  source={
                    route.name === 'Home'
                      ? IconAsset.homeIcon
                      : IconAsset.profileIcon
                  }
                  style={
                    isFocused ? styles.activeTabImg : styles.deActiveTabImg
                  }
                  resizeMode="contain"
                />
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </HStack>
  );
}
export default CustomBottomTab;

const styles = StyleSheet.create({
  bottomTab: {
    padding: h(1),
    justifyContent: 'space-evenly',
    backgroundColor: Colors.ThemeColor,
  },
  img: {
    // padding: 20,
    // height: 15,
    // width: 20,
    // tintColor: Colors.white,
  },
  activeTabImg: {
    height: h(4),
    width: h(4),
    tintColor: Colors.white,
  },
  deActiveTabImg: {
    height: h(4),
    width: h(4),
    tintColor: Colors.lightBlue,
  },
});
