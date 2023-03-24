import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  BackHandler,
  Alert,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  Text,
  ImageBackground,
} from 'react-native';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import {Colors, w, h, IconAsset, FontFamily} from '../../utils';
import {
  CustomBTN,
  CustomEventListing,
  CustomHeader,
  CustomInputField,
  EmptyComponent,
  LoaderComponent,
  ModalForm,
  SearchComponent,
} from '../../components';
import {HStack} from 'native-base';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  useLazyGetAllTripsQuery,
  useAddTripApiMutation,
  useEditTripApiMutation,
} from '../../../apiCall/apiList';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import EvilIconsIcon from 'react-native-vector-icons/dist/EvilIcons';
import EntypoIcon from 'react-native-vector-icons/dist/Entypo';
import {onChangeOffsetMode} from '../../../redux-store/slice/UserEventListingSlice';
import {
  onChangeAddTripArr,
  onGetError,
  onSetAddModalVisible,
} from '../../../redux-store/slice/AddTripSlice';
import {isEmpty, validateMob} from '../../utils/Validation';
import moment from 'moment';
import {
  onGetAllTrips,
  onGetSearchData,
} from '../../../redux-store/slice/EventListingSlice';
import RBSheet from 'react-native-raw-bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Animated from 'react-native-reanimated';

const EventListingScreen = () => {
  const refRBSheet = useRef();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    tripList,
    filterOptions,
    isLoading,
    isLoadMore,
    isRefresh,
    sliderdata,
    offset,
    hasMore,
  } = useSelector(state => state.tripList);
  const {addTripArr, isAddtripLoading, isAddtripModalVisible} = useSelector(
    state => state.addtrip,
  );

  const [addtripApi, addtripApiResponse] = useAddTripApiMutation();
  const [tripApi, tripApiRespone] = useLazyGetAllTripsQuery();

  console.log(tripList.length, 'IIIIIIIIIIII');
  const [search, setSearch] = useState('');
  const [user, setUser] = useState('');
  const [showSearch, setShowSearch] = useState(false);

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
  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    const res = await tripApi();
    // console.log(res, 'NNNNNNNNNNN');
    dispatch(onGetAllTrips(res));
    var userInfo = await AsyncStorage.getItem('userInfo');
    setUser(JSON.parse(userInfo));
  };
  const onCheckForm = () => {
    var check = 'true';
    const currentDate = new Date();
    addTripArr.forEach((element, index) => {
      console.log(element.value, 'VVVVVVVVVVVV');
      if (isEmpty(element.value)) {
        check = 'false';
        dispatch(
          onGetError({
            error: 'Please Provide ' + element.label,
            index,
          }),
        );
      }
      if (element.validation === 'mobile') {
        var testmob = validateMob(element.value);
        if (!testmob) {
          check = 'false';
          dispatch(
            onGetError({
              error: 'Invalid Mobile Number',
              index,
            }),
          );
        } else {
          check === 'true';
        }
      }
      if (element.validation === 'start_date') {
        // console.log(currentDate, 'CURRRRR');
        const start_date = moment(element.value).utc().format('MM-DD-YYYY');
        if (start_date < moment(currentDate).utc().format('MM-DD-YYYY')) {
          check = 'false';
          dispatch(
            onGetError({
              error: 'Invalid Start Date!!',
              index,
            }),
          );
        } else {
          check === 'true';
        }
      }
      if (element.validation === 'end_date') {
        var start_date = addTripArr[index - 1];
        console.log(currentDate.toISOString(), 'CCCCCCC');
        const end_date = moment(element.value).utc().format('MM-DD-YYYY');
        if (
          end_date < moment(start_date.value).utc().format('MM-DD-YYYY') ||
          end_date < moment(currentDate).utc().format('MM-DD-YYYY')
        ) {
          check = 'false';
          dispatch(
            onGetError({
              error: 'Invalid End Date!!',
              index,
            }),
          );
        } else {
          check === 'true';
        }
      }
    });
    if (check === 'true') {
      addTripApi();
    } else {
      Alert.alert('Invalid Data', 'Please Check The Fields');
    }
  };
  const addTripApi = async () => {
    const endDate = new Date(
      moment(addTripArr[4].value).utc().format('MM/DD/YYYY'),
    );
    const startDate = new Date(
      moment(addTripArr[3].value).utc().format('MM/DD/YYYY'),
    );

    const time_difference = endDate.getTime() - startDate.getTime();
    const days_difference = time_difference / (1000 * 60 * 60 * 24);

    var tripData = {
      trip_title: addTripArr[0].value,
      price: addTripArr[1].value,
      total_seats: addTripArr[2].value,
      start_date: addTripArr[3].value,
      end_date: addTripArr[4].value,
      accommodation: addTripArr[5].value,
      manager_name: addTripArr[6].value,
      manager_contact_number: addTripArr[7].value,
      Place_from: addTripArr[8].value,
      Place_to: addTripArr[9].value,
      description: addTripArr[10].value,
      age_group: '20-30',
      destination: addTripArr[9].value,
      days: days_difference,
      user_id: user.id,
      images: null,
      trip_media_files: [],
    };
    console.log(tripData, 'UUUUUUUUUUUU');
    const res = await addtripApi(tripData);
    console.log(res, 'RESULTTTTTTTTTTTTTTT');
    if (res.data) {
      if (res.data.status == 200) {
        console.log('RTRTRTRTRTRTRFVJHBJBJK');
        dispatch(onSetAddModalVisible(false));
        // setAddModalVisible(false);
        navigation.navigate('EventListingScreen');
      }
    } else if (res.error) {
      Alert.alert('Error', res.error.data.messages);
    }
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
    return (
      <TouchableOpacity
        onPress={() => {
          console.log('HHHHHHHh');
          navigation.navigate('EditTripScreen', index);
        }}>
        <View style={styles.tripBox}>
          <ImageBackground
            source={item.img}
            style={styles.tripImg}
            alt={'Trip Image'}>
            <View
              style={{
                backgroundColor: Colors.white,
                height: h(15),
                width: w(45),
                // marginTop: -20,
                justifyContent: 'center',
                // alignItems: 'center',
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                // borderRadius: 15,
                paddingLeft: 5,
                position: 'absolute',
                top: h(16),
              }}>
              <HStack>
                <Text style={styles.detailDiscription}>{item.trip_title}</Text>
              </HStack>
              <HStack>
                <View
                  style={{
                    flex: 1,
                    alignContent: 'center',
                  }}>
                  <HStack style={{alignItems: 'center'}} mt={1}>
                    <EntypoIcon
                      name="calendar"
                      style={{fontSize: 12, color: Colors.black}}
                    />
                    <Text style={styles.detailDuration}>
                      {moment(item.start_date).utc().format('DD/MM/YY')} -
                      {moment(item.end_date).utc().format('DD/MM/YY')}
                    </Text>

                    <Text style={styles.detailDuration}>{item.days} Days</Text>
                  </HStack>
                  <HStack style={{alignItems: 'center'}} my={1}>
                    <EntypoIcon
                      name="location"
                      style={{fontSize: 12, color: Colors.black}}
                    />
                    <Text style={styles.detailDuration}>
                      {item.destination}
                    </Text>
                  </HStack>

                  <HStack style={{alignItems: 'center'}}>
                    <Icon
                      name="rupee"
                      style={{
                        fontSize: 12,
                        color: Colors.black,
                        marginLeft: 5,
                      }}
                    />
                    <Text style={styles.detailDuration}>{item.price}</Text>
                  </HStack>
                </View>
              </HStack>
            </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  };

  return isLoading || isAddtripLoading ? (
    <LoaderComponent />
  ) : (
    <View style={styles.container}>
      <CustomHeader
        searchIcon={'search'}
        filterIcon={'filter'}
        addIcon={'plus'}
        showSearchBar={showSearch}
        search={search => {
          setShowSearch(search);
        }}
        filter={filter => {
          if (filter) {
            refRBSheet.current.open();
          }
        }}
        add={add => {
          dispatch(onSetAddModalVisible(add));
        }}
      />
      {showSearch ? (
        <SearchComponent
          onGetdata={value => {
            dispatch(onGetSearchData(value));
          }}
        />
      ) : null}
      <FlatList
        data={tripList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={onRender}
        numColumns={2}
        onEnd={onEndHandler}
        ListEmptyComponent={() => {
          return <EmptyComponent />;
        }}
        // onRefresh={onRefreshHandler}
        isLoadMore={hasMore}
        contentContainerStyle={{
          justifyContent: 'center',
          // alignSelf: 'center',
          // backgroundColor: 'red',
        }}
      />

      {isAddtripModalVisible ? (
        <ModalForm
          closeModal={value => dispatch(onSetAddModalVisible(value))}
          showModal={isAddtripModalVisible}
          form_name={'Add Trip'}
          data={addTripArr}
          onGetdata={({value, index}) => {
            dispatch(onChangeAddTripArr({value, index}));
          }}
          onClickSubmit={onCheckForm}
        />
      ) : null}
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
                <Text style={{fontFamily: FontFamily.regular, fontSize: 18}}>
                  {item.label}
                </Text>
              </View>
            );
          }}
        />
      </RBSheet>
    </View>
  );
};

export default EventListingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f5f5',
  },
  headerBox: {
    backgroundColor: Colors.ThemeColor,
    height: h(10),
    justifyContent: 'center',
    elevation: 20,
  },

  tripBox: {
    // marginHorizontal: w(2),
    marginVertical: h(2),
    // paddingHorizontal: w(2),
    // borderColor: Colors.ThemeColor,
    // borderWidth: 1,
    // borderRadius: w(5),
    // justifyContent: 'center',
    // backgroundColor: 'blue',
    alignItems: 'center',
    width: w(45),
    // height: h(60),
    justifyContent: 'space-between',
    width: w(50),
    // borderBottomRightRadius: 10,
    // borderBottomLeftRadius: 10,
  },
  tripImg: {
    height: h(30),
    width: w(45),
    // borderRadius: w(10),
    // marginTop: w(1),
    // borderTopRightRadius: 50,
    // borderTopLeftRadius: 50,
    // borderWidth: 2,
    // backgroundColor: 'red',
  },
  tripDuration: {
    fontSize: 15,
    color: Colors.black,
  },

  tripTitle: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: 20,
  },

  detailDiscription: {
    fontSize: 14,
    color: Colors.black,
    // fontWeight: 'bold',
    fontFamily: FontFamily.headingFont,
  },
  detailDuration: {
    fontSize: 11,
    color: Colors.black,
    marginLeft: w(1),
  },

  wrapperStyle: {backgroundColor: '#00000061', blur: true},
  containerStyle: {
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    paddingHorizontal: w(4),
    height: h(30),
  },
  draggableIcon: {
    backgroundColor: Colors.ThemeColor,
    width: w(10),
    // opacity: 0.1,
  },
});
