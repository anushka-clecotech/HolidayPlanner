import React, {useCallback, useEffect, useRef, useState} from 'react';
import Carousel from 'react-native-snap-carousel';
import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  BackHandler,
  Alert,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Colors, w, h, IconAsset, FontFamily} from '../../utils';
import {
  CustomEventListing,
  CustomHeader,
  LoaderComponent,
} from '../../components';
import {VStack, HStack, Button} from 'native-base';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useLazyGetAllTripsQuery} from '../../../apiCall/apiList';
import {onChangeOffsetMode} from '../../../redux-store/slice/UserEventListingSlice';
import moment from 'moment';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/dist/Entypo';

import {TextInput} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

const UserEventListingScreen = () => {
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const dispatch = useDispatch();
  const [searchList, setSearchList] = useState('');
  const [triggerList, Response] = useLazyGetAllTripsQuery();
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  // console.log(filterOptions, 'uuuuuuuuuuu');
  useEffect(() => {
    setFilteredDataSource(data);
    setMasterDataSource(data);
  }, []);
  const searchFilterFunction = text => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearchList(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearchList(text);
    }
  };
  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        Alert.alert('Hold on!', 'Are you sure you want to exit?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ]);
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', backAction);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', backAction);
      };
    }, []),
  );
  const {
    data,
    isLoading,
    isLoadMore,
    isRefresh,
    sliderdata,
    offset,
    hasMore,
    tripList,
    filterOptions,
  } = useSelector(state => state.userEventList);

  useEffect(() => {
    console.log('jkshfcjkdshfcjk');
    const result = triggerList();
    console.log(result, 'OOOOOOOOOOO');
  }, []);

  const _renderItem = ({item, index}) => {
    return (
      <View key={index} style={styles.sliderBox}>
        <ImageBackground
          source={item.img}
          style={styles.sliderImg}
          imageStyle={{borderRadius: 20}}>
          <Text style={styles.sliderDuration}>{item.duration}</Text>
          <VStack style={styles.sliderImgView}>
            <Text style={styles.sliderTitle}>{item.title}</Text>
          </VStack>
        </ImageBackground>
      </View>
    );
  };
  const onEndHandler = () => {
    dispatch(
      onChangeOffsetMode({
        offset: offset + 1,
        listMode: 'loadmore',
      }),
    );
  };
  const onRefreshHandler = () => {
    dispatch(
      onChangeOffsetMode({
        offset: 1,
        listMode: 'refresh',
      }),
    );
  };
  const onRender = ({item, index}) => {
    // console.log(item, 'OOOOOOOOOOO');

    var startDate = moment(item.start_date).utc().format('DD/MMM/YY');
    var endDate = moment(item.end_date).utc().format('DD/MMM/YY');
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('UserEventDetailsScreen', item.id);
        }}>
        <View style={styles.tripBox}>
          <VStack>
            <Image
              source={item.img}
              style={styles.tripImg}
              alt={'Trip Image'}
            />
            <VStack my={3}>
              <HStack justifyContent={'space-between'}>
                <View>
                  <Text style={styles.detailTitle}>{item.trip_title}</Text>

                  <HStack alignItems={'center'} my={2}>
                    <EntypoIcon
                      name="location"
                      style={{
                        fontSize: 12,
                        color: Colors.darkGray,
                      }}
                    />
                    <Text
                      style={[
                        styles.detailTags,
                        {textTransform: 'capitalize'},
                      ]}>
                      {item.destination}
                    </Text>
                  </HStack>
                </View>
                <View style={{marginTop: h(2)}}>
                  <HStack alignItems={'center'}>
                    <Icon
                      name="rupee"
                      style={{
                        fontSize: 14,
                        color: Colors.ThemeColor,
                        // backgroundColor: 'purple',
                        // marginLeft: 5,
                        // alignSelf: 'center',
                      }}
                    />
                    <Text style={styles.priceTag}>{item.price}</Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: FontFamily.regular,
                        color: Colors.gray,
                      }}>
                      /person
                    </Text>
                  </HStack>
                </View>
              </HStack>
              <HStack alignItems={'center'}>
                <EntypoIcon
                  name="calendar"
                  style={{
                    fontSize: 12,
                    color: Colors.darkGray,
                  }}
                />
                <Text style={styles.detailTags}>
                  {startDate} - {endDate}
                </Text>
              </HStack>
            </VStack>
          </VStack>
        </View>
      </TouchableOpacity>
    );
  };
  const sliderView = () => {
    return (
      <View style={{justifyContent: 'center', alignContent: 'center', flex: 1}}>
        <Carousel
          layout={'default'}
          firstItem={1}
          data={sliderdata}
          renderItem={_renderItem}
          sliderWidth={w(100)}
          itemWidth={w(80)}
          inactiveSlideOpacity={0.3}
          inactiveSlideShift={1}
          autoplay={true}
          lockScrollWhileSnapping={true}
          autoplayInterval={3000}
          autoplayDelay={3000}
          loop={true}
          enableSnap={true}
        />
        <VStack px={3}>
          <Text style={styles.planHeading}>Plans</Text>
        </VStack>
      </View>
    );
  };
  const [showSearch, setShowSearch] = useState(false);
  return isLoading ? (
    <LoaderComponent />
  ) : (
    <View style={styles.container}>
      <CustomHeader
        searchIcon={'search'}
        filterIcon={'filter'}
        showSearchBar={showSearch}
        search={search => {
          console.log(search, 'SSSSSSSSsss');
          setShowSearch(search);
        }}
        filter={filter => {
          if (filter) {
            console.log(filter, 'FFFFFFFFFFFFFF');
            refRBSheet.current.open();
          }
        }}
      />

      {showSearch ? (
        <SearchComponent
          onGetdata={value => {
            // dispatch(onGetSearchData(value));
          }}
        />
      ) : // <View
      //   style={{
      //     backgroundColor: Colors.white,
      //     justifyContent: 'space-around',
      //     borderWidth: 1,
      //     borderColor: Colors.ThemeColor,
      //     margin: 5,
      //     paddingHorizontal: 5,
      //   }}>
      //   <TextInput
      //     onChangeText={text => searchFilterFunction(text)}
      //     value={searchList}
      //     // underlineColorAndroid="transparent"
      //     placeholder="Search Here"
      //     placeholderTextColor={Colors.gray1}
      //   />
      // </View>
      null}
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: styles.wrapperStyle,
          container: styles.containerStyle,
          draggableIcon: styles.draggableIcon,
        }}>
        <FlatList
          data={filterOptions}
          closeOnPressMask={true}
          renderItem={({item, index}) => {
            console.log(item, 'III');
            return (
              <View style={{marginVertical: h(1)}}>
                <Text
                  style={{
                    fontFamily: FontFamily.regular,
                    fontSize: 18,
                    color: Colors.black,
                    marginHorizontal: w(2),
                  }}>
                  {item.label}
                </Text>
              </View>
            );
          }}
        />
      </RBSheet>
      <CustomEventListing
        listHeader={sliderView}
        listData={filteredDataSource}
        renderItem={onRender}
        onEnd={onEndHandler}
        onRefresh={onRefreshHandler}
        isLoadMore={hasMore}
      />
    </View>
  );
};

export default UserEventListingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  sliderBox: {
    flex: 1,
    paddingVertical: w(5),
  },
  sliderImg: {
    height: h(20),
    width: w(80),
    alignSelf: 'center',
    elevation: 20,
  },
  sliderDuration: {
    margin: w(2),
    color: Colors.white,
  },
  sliderImgView: {
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
  },
  sliderTitle: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 18,
  },
  planHeading: {
    fontSize: 20,
    color: Colors.black,
    // textDecorationLine: 'underline',
  },
  tripBox: {
    marginHorizontal: w(1),
    marginVertical: h(1),
    backgroundColor: Colors.white,
    borderRadius: w(5),
    justifyContent: 'center',
    alignItems: 'center',
    width: w(95),
    // height: h(45),
    paddingVertical: h(1),
    alignSelf: 'center',
  },

  tripImg: {
    height: w(45),
    width: w(90),
    borderRadius: w(3),
  },

  detailTitle: {
    fontSize: 20,
    color: Colors.black,
    // fontWeight: 'bold',
    fontFamily: FontFamily.headingFont,
  },
  priceTag: {
    fontSize: 20,
    color: Colors.ThemeColor,
    marginLeft: w(1),
    // alignSelf: 'center',
    // marginTop: -2,
    fontFamily: FontFamily.regular_head,
    // backgroundColor: 'yellow',
    includeFontPadding: false,
    // lineHeight: 40,
  },
  detailTags: {
    fontSize: 14,
    color: Colors.darkGray,
    marginLeft: w(1),
    // alignSelf: 'center',
    // marginTop: -2,
    fontFamily: FontFamily.regular_head,
    // backgroundColor: 'yellow',
    includeFontPadding: false,
    // lineHeight: 40,
  },
  bookBTN: {
    backgroundColor: Colors.ThemeColor,
    // justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    height: 50,
    width: w(35),
    // marginHorizontal: w(3),
    borderRadius: w(3),
  },
  headerBox: {
    backgroundColor: Colors.ThemeColor,
    height: h(8),
    justifyContent: 'center',
    elevation: 20,
  },
});
