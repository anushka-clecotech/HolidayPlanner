import React, {useRef, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Button, HStack, ScrollView, VStack} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors, FontFamily, h, IconAsset, w} from '../../utils';
import {useTripDetailApiQuery} from '../../../apiCall/apiList';
import {CustomImageSlide} from '../../components';

const EventDetailsScreen = ({route}) => {
  console.log(route, 'RRRRRRRRRRR');
  // const tripID = route?.params;
  // const response = useTripDetailApiQuery();
  const tripID = 3;
  var {data} = useSelector(state => state.userEventList);
  const tripDetails = data.find(element => element.id == tripID);
  // console.log(response, 'hhhhhhhhhhhhhhhhhh');
  const navigation = useNavigation();
  const IMG_SIZE = 80;
  const SPACING = 10;
  const images = [
    {
      img: IconAsset.trip1,
    },
    {
      img: IconAsset.trip2,
    },
    {
      img: IconAsset.trip3,
    },
    {
      img: IconAsset.trip4,
    },
    {
      img: IconAsset.trip5,
    },
    {
      img: IconAsset.trip1,
    },
    {
      img: IconAsset.trip2,
    },
    {
      img: IconAsset.trip3,
    },
    {
      img: IconAsset.trip4,
    },
    {
      img: IconAsset.trip5,
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const topRef = useRef();
  const thumbRef = useRef();
  const scrollToActiveIndex = index => {
    setActiveIndex(index);

    topRef?.current?.scrollToOffset({
      offset: index * w(100),
      animated: true,
    });
    if (index * (IMG_SIZE + SPACING) - IMG_SIZE / 2 > w(100) / 2) {
      thumbRef?.current?.scrollToOffset({
        offset: index * (IMG_SIZE + SPACING) - w(100) / 2 + IMG_SIZE / 2,
        animated: true,
      });
    }
  };
  const [test, setTest] = useState(false);
  const onScrollHandler = e => {
    const currentOffset = e.nativeEvent.contentOffset.y;
    console.log(currentOffset, 'TTTTTTTTTTTT');
    if (currentOffset > 300) {
      setTest(true);
    }

    if (currentOffset < 300) {
      setTest(false);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView onScroll={onScrollHandler}>
        <CustomImageSlide
          imgList={images}
          thumbImgList={images}
          title={tripDetails.title}
        />
        <VStack ml={1} mt={h(1)}>
          <Text style={styles.place}>{tripDetails.place}</Text>
          <Text style={styles.price}>₹ {tripDetails.price}/person</Text>
          <HStack style={{marginLeft: w(3)}}>
            <Image source={IconAsset.durationIcon} style={styles.clock} />
            <Text style={styles.duration}>Days: {tripDetails.duration}</Text>
          </HStack>
          <Text style={styles.detailHead}>Overview</Text>
          <Text style={styles.discription}>{tripDetails.discription}</Text>
          <Text style={styles.detailHead}>Gallery</Text>
          {/* <View style={{}}> */}
          {/* <FlatList
            data={data}
            horizontal
            contentContainerStyle={{marginHorizontal: w(1)}}
            pagingEnabled={true}
            // keyExtractor={(item, index) => {
            //   index.toString();
            // }}
            renderItem={({item, index}) => {
              return (
                <View style={{overflow: 'hidden'}}>
                  <Image source={item.img} style={styles.galleryImg} />
                </View>
              );
            }}
          /> */}
          {/* </View> */}
        </VStack>
      </ScrollView>
      {test ? (
        <Button style={styles.bookBTN}>
          <Text style={styles.bookBTNText}>Book Trip</Text>
        </Button>
      ) : null}
    </View>
  );
};

export default EventDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  backBtnView: {
    // margin: 20,
    backgroundColor: 'white',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 30,
    // opacity: 0.5,
    // flex: 1,
  },
  backBTN: {
    height: 20,
    width: 20,
    tintColor: Colors.black,
    alignSelf: 'center',
  },

  detailImg: {
    width: w(100),
    height: h(50),
  },
  imgBox: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  title: {
    fontSize: 30,
    color: Colors.white,
    // margin: w(10),
    fontFamily: FontFamily.headingFont,
    textAlignVertical: 'center',
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
    // position: 'absolute',
    // bottom: 20,
    backgroundColor: Colors.ThemeColor,
    height: h(8),
    width: w(100),
    justifyContent: 'center',
    alignSelf: 'center',
    // borderRadius: w(10),
    // marginVertical: w(2),
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
    marginRight: w(1),
    borderRadius: w(5),
    marginVertical: w(3),
    overflow: 'hidden',
  },
});
