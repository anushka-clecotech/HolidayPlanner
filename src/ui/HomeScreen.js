import {useNavigation} from '@react-navigation/native';
import {Button, HStack, VStack} from 'native-base';
import React, {Component} from 'react';
import {
  Animated,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Easing,
} from 'react-native';
import {useSelector} from 'react-redux';
import {h, IconAsset, w} from '../utils';

export default function HomeScreen() {
  var {data} = useSelector(state => state.userEventList);
  // const data = Array.from({length: 30});
  const HEADER_MAX_HEIGHT = h(50);
  const HEADER_MIN_HEIGHT = h(20);
  const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
  const scrollY = new Animated.Value(0);
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],

    extrapolate: 'clamp',
  });
  const tripID = 1;
  const tripDetails = data.find(element => element.id == tripID);
  //   console.log(tripDetails, 'BBBBBBB');
  const navigation = useNavigation();
  return (
    <View style={styles.fill}>
      <Animated.View style={[styles.header, {height: headerHeight}]}>
        <Animated.Image
          style={[
            {
              width: w(100),
              height: HEADER_MAX_HEIGHT,
            },
            {
              height: headerHeight,
            },
          ]}
          source={IconAsset.trip1}
          resizeMode={'cover'}
        />
        {/* <Text style={styles.title}>Title</Text> */}
      </Animated.View>
      <ScrollView
        style={styles.fill}
        onScroll={Animated.event([
          {nativeEvent: {contentOffset: {y: scrollY}}},
        ])}>
        {/* <View style={{marginTop: HEADER_MAX_HEIGHT}}>
          {data.map((_, i) => (
            <View key={i} style={styles.row}>
              <Text>{i}</Text>
            </View>
          ))}
        </View> */}
        {/* <View ml={1}>
          <Text style={styles.place}>{tripDetails.place}</Text>
          <Text style={styles.price}>₹ {tripDetails.price}/person</Text>
          <HStack style={{marginLeft: w(3)}}>
            <Image source={IconAsset.durationIcon} style={styles.clock} />
            <Text style={styles.duration}>Days: {tripDetails.duration}</Text>
          </HStack>
          <Text style={styles.detailHead}>Overview</Text>
          <Text style={styles.discription}>{tripDetails.discription}</Text>
         <Text style={styles.contact}>
          Contact for More Details: {tripDetails.contact}
          </Text> 

          <Text style={styles.detailHead}>Gellary</Text>
          <View style={{marginLeft: w(2)}}>
            <FlatList
              data={data}
              horizontal
              pagingEnabled={true}
              keyExtractor={(item, index) => {
                index.toString();
              }}
              renderItem={({item, index}) => {
                return (
                  <View style={{overflow: 'hidden'}}>
                    <Image source={item.img} style={styles.galleryImg} />
                  </View>
                );
              }}
            />
          </View>
        </View> */}
        {/* <Button style={styles.bookBTN}>
          <Text style={styles.bookBTNText}>Book Trip</Text>
        </Button> */}
        <Text>
          AAAAAAA SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA
          SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA
          SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA
          SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA
          SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA
          SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA
          SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA
          SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA
          SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA
          SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA
          SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA
          SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA
          SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA
          SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA
          SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA
          SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA
          SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA
          SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA
          SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA
          SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA
          SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA
          SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA
          SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA
          SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA
          SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA
          SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA
          SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA
          SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA SSSSSSSSSSSAAAAAAA
          SSSSSSSSSSSAAAAAAA SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA SSSSSSSSSSS
          AAAAAAA SSSSSSSSSSS AAAAAAA SSSSSSSSSSSAAAAAAA SSSSSSSSSSSAAAAAAA
          SSSSSSSSSSSAAAAAAA SSSSSSSSSSSAAAAAAA SSSSSSSSSSSAAAAAAA
          SSSSSSSSSSSAAAAAAA SSSSSSSSSSSAAAAAAA SSSSSSSSSSSAAAAAAA
          SSSSSSSSSSSAAAAAAA SSSSSSSSSSSAAAAAAA SSSSSSSSSSSAAAAAAA
          SSSSSSSSSSSAAAAAAA SSSSSSSSSSSAAAAAAA SSSSSSSSSSS AAAAAAA SSSSSSSSSSS
          AAAAAAA SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA SSSSSSSSSSS AAAAAAA
          SSSSSSSSSSSAAAAAAA SSSSSSSSSSSAAAAAAA SSSSSSSSSSS AAAAAAA
          SSSSSSSSSSSAAAAAAA SSSSSSSSSSS
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    backgroundColor: 'red',
    overflow: 'hidden',
  },
  // bar: {
  //   marginTop: 28,
  //   height: 32,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  title: {
    // backgroundColor: 'transparent',
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    alignSelf: 'center',
  },
  // scrollViewContent: {
  //   marginTop: HEADER_MAX_HEIGHT,
  // },
  // backgroundImage: {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   width: null,
  //   height: HEADER_MAX_HEIGHT,
  //   resizeMode: 'cover',
  // },

  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  detailImg: {
    width: w(100),
    height: h(50),
  },
  imgBox: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backBtnView: {
    margin: 20,
    backgroundColor: 'white',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 30,
    opacity: 0.5,
  },
  backBTN: {
    height: 20,
    width: 20,
    tintColor: Colors.black,
    alignSelf: 'center',
  },
  title: {
    fontSize: 30,
    color: Colors.white,
    margin: w(10),
    fontFamily: FontFamily.headingFont,
  },
  place: {
    fontFamily: FontFamily.semiBold,
    fontSize: 25,
    margin: w(1),
    color: Colors.black,
  },
  price: {
    fontFamily: FontFamily.regular_head,
    fontSize: 20,
    marginLeft: w(3),
    marginBottom: h(2),
    color: Colors.black,
  },
  clock: {
    height: 28,
    width: 18,
  },
  duration: {
    fontFamily: FontFamily.regular,
    marginLeft: w(4),
    fontSize: 15,
    color: Colors.gray2,
    // marginLeft: w(3),
  },
  detailHead: {
    fontFamily: FontFamily.semiBold,
    fontSize: 20,
    marginLeft: w(3),
    marginTop: w(5),
    color: Colors.black,
  },
  discription: {
    fontFamily: FontFamily.italic,
    marginLeft: w(3),
    marginTop: w(2),
    fontSize: 14,
    color: Colors.gray1,
    letterSpacing: 1,
  },
  contact: {
    fontFamily: FontFamily.regular,
    margin: w(3),
    fontSize: 15,
    color: Colors.black,
  },
  bookBTN: {
    backgroundColor: Colors.ThemeColor,
    height: h(8),
    width: w(90),
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: w(10),
    marginVertical: w(2),
  },
  bookBTNText: {
    color: Colors.white,
    fontSize: 18,
    textAlign: 'center',
    fontFamily: FontFamily.semiBold,
  },
  galleryImg: {
    height: w(48),
    width: w(48),
    marginHorizontal: w(1),
    borderRadius: w(8),
    marginVertical: w(5),
    overflow: 'hidden',
  },
});
