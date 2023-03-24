import React, {useEffect} from 'react';
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
import {Colors, FontFamily, h, w} from '../../utils';
import {
  CustomBTN,
  CustomImageSlide,
  HeaderSection,
  LoaderComponent,
} from '../../components';
import {useLazyTripDetailApiQuery} from '../../../apiCall/apiList';
import moment from 'moment';
import EntypoIcon from 'react-native-vector-icons/dist/Entypo';
import AntDesignIcon from 'react-native-vector-icons/dist/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const UserEventDeatilsScreen = ({route}) => {
  //   console.log(route);
  const tripID = route?.params;
  const [tripDetailApi, tripResponse] = useLazyTripDetailApiQuery();
  // const tripID = 3;
  var {data} = useSelector(state => state.userEventList);
  const {isLoading, eventDetail, dummyDetails} = useSelector(
    state => state.eventDetail,
  );
  console.log(isLoading, 'LLLLLLLLLLLLLLL');
  const tripDetails = data.find(element => element.id == tripID);
  // console.log(tripDetails, 'BBBBBBB');
  const navigation = useNavigation();
  useEffect(() => {
    tripDetailApi(tripID);
  }, []);

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
  var startDate = moment(dummyDetails.start_date).utc().format('DD/MMM/YY');
  var endDate = moment(dummyDetails.end_date).utc().format('DD/MMM/YY');
  const destination = dummyDetails.Place_from;
  // const test = destination.toUpperCase();
  // console.log(test, 'PPPPPPPPPPPPP');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <HeaderSection />
        <CustomImageSlide
          imgList={images}
          thumbImgList={images}
          title={dummyDetails.trip_title}
        />

        <VStack
          style={{
            flex: 1,
            width: w(90),
            // justifyContent: 'center',
            // alignItems: 'center',
            alignSelf: 'center',
            marginTop: h(5),
          }}>
          <HStack
            justifyContent={'space-between'}
            alignItems={'center'}
            // style={{backgroundColor: 'red'}}
          >
            <Text
              style={{
                color: Colors.black,
                fontSize: 20,
                fontFamily: FontFamily.headingFont,
                // includeFontPadding: false,
                // backgroundColor: 'pink',
              }}>
              {dummyDetails.trip_title}
            </Text>
            <TouchableOpacity>
              <AntDesignIcon
                name="sharealt"
                // size="25"
                // color="blue"
                style={{fontSize: 20, color: Colors.ThemeColor}}
              />
            </TouchableOpacity>
          </HStack>
          <HStack mt={w(2)}>
            <EntypoIcon
              name="location"
              style={{
                fontSize: 15,
                marginRight: w(2),
              }}
            />
            <Text>{dummyDetails.distination}</Text>
          </HStack>
          <HStack mt={2}>
            <EntypoIcon
              name="calendar"
              style={{
                fontSize: 15,
                marginRight: w(2),
              }}
            />
            <Text>
              {startDate} - {endDate}
            </Text>
          </HStack>
          <HStack
            style={{
              // justifyContent: 'center',

              // alignSelf: 'center',
              marginTop: w(2),
            }}>
            <Text style={[styles.featuresText]}>Age : </Text>
            <Text style={[styles.featuresText]}> {dummyDetails.age_group}</Text>
            <VStack style={{flex: 1}}>
              <Text
                style={[
                  styles.featuresText,
                  {marginLeft: w(20), textAlign: 'right'},
                ]}>
                Total Seats : {dummyDetails.total_seats}
              </Text>
              <HStack alignSelf={'flex-end'} mt={w(1)}>
                <MaterialCommunityIcons
                  name={'seat'}
                  style={{
                    fontSize: 16,
                    color: Colors.ThemeColor,
                    marginRight: w(1),
                  }}
                />
                <Text
                  style={{
                    // marginLeft: w(30),
                    // textAlign: 'right',
                    fontSize: 14,
                    fontFamily: FontFamily.regular,
                    color: Colors.gray1,
                    includeFontPadding: false,
                  }}>
                  Seats Avail : {dummyDetails.avail_seat}
                </Text>
              </HStack>
            </VStack>
          </HStack>
          <VStack
            style={{
              // alignSelf: 'center',
              marginTop: w(2),
            }}>
            <Text style={[styles.featuresText]}>Discription:</Text>
            <Text style={[styles.discription]}>
              {dummyDetails.text} The lorem ipsum is a placeholder text used in
              publishing and graphic design. This filler text is a short
              paragraph that contains all the letters of the alphabet. The
              characters are spread out evenly so that the reader's attention is
              focused on the layout of the text instead of its content.
            </Text>
            <HStack style={{marginVertical: w(2), marginTop: w(4)}}>
              <Text
                style={[
                  styles.contactDetails,
                  {
                    fontFamily: FontFamily.semiBold,
                  },
                ]}>
                Manager Name :
              </Text>
              <Text
                style={[styles.contactDetails, {textTransform: 'capitalize'}]}>
                {dummyDetails.manager_name}
              </Text>
            </HStack>
            <HStack>
              <Text
                style={[
                  styles.contactDetails,
                  {fontFamily: FontFamily.semiBold},
                ]}>
                Manager Contact :
              </Text>
              <Text style={[styles.contactDetails]}>
                {dummyDetails.manager_contact_number}
              </Text>
            </HStack>
          </VStack>
        </VStack>
      </ScrollView>

      <HStack
        style={{
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <HStack
          style={{
            // backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
          }}
          justifyContent={'center'}>
          <Text style={styles.price}>₹ {dummyDetails.price}</Text>
          <Text
            style={{
              color: Colors.gray1,
              fontFamily: FontFamily.regular,
              fontSize: 14,
              marginTop: 5,
            }}>
            /person
          </Text>
        </HStack>
        <Button style={styles.bookBTN}>
          <Text style={styles.bookBTNText}>Book Trip</Text>
        </Button>
      </HStack>
    </SafeAreaView>
  );
};

export default UserEventDeatilsScreen;

const styles = StyleSheet.create({
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
    fontFamily: FontFamily.semiBold,
    fontSize: 20,
    // marginLeft: w(3),
    // marginBottom: h(2),
    color: Colors.ThemeColor,
  },
  clock: {
    height: 28,
    width: 18,
  },
  startPlace: {
    fontFamily: FontFamily.regular,
    // marginLeft: w(4),
    fontSize: 15,
    color: Colors.black,
    // marginLeft: w(3),
  },
  endPlace: {
    fontFamily: FontFamily.regular,
    textAlign: 'right',
    // marginLeft: w(4),
    fontSize: 15,
    color: Colors.black,
    // marginLeft: w(3),
  },
  featuresText: {
    fontSize: 18,
    fontFamily: FontFamily.semiBold,
    color: Colors.black,
  },
  detailHead: {
    fontFamily: FontFamily.semiBold,
    fontSize: 17,
    marginLeft: w(3),
    marginTop: w(5),
    color: Colors.black,
  },
  discription: {
    fontFamily: FontFamily.italic,
    // marginLeft: w(3),
    marginTop: w(2),
    fontSize: 12,
    color: Colors.gray1,
    letterSpacing: 1,
  },
  contactDetails: {
    fontFamily: FontFamily.regular,
    // margin: w(3),
    fontSize: 17,
    color: Colors.black,
  },
  bookBTN: {
    backgroundColor: Colors.ThemeColor,
    height: h(8),
    width: w(45),
    justifyContent: 'center',
    alignSelf: 'flex-end',
    // borderRadius: w(10),
    marginVertical: w(2),
    marginHorizontal: w(2),
    elevation: 10,
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
