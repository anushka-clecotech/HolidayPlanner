import {createSlice} from '@reduxjs/toolkit';
import {Apicall} from '../../apiCall/apiList';
import {IconAsset} from '../../src/utils';
const initialState = {
  tripList: {},
  data: [
    {
      id: 1,
      trip_title: 'mno trip',
      img: IconAsset.trip1,
      days: ' 10',
      destination: 'delhi',
      start_date: '2023-04-30T00:00:00.000Z',
      end_date: '2023-05-30T00:00:00.000Z',
      total_seats: 5,
      accommodation: ' hotel',
      age_group: 0,
      manager_name: ' jai',
      manager_contact_number: ' 654658',
      text: null,
      price: 500,
      Place_from: ' indore',
      user_id: 25,
      Place_to: ' delhi',
      description: null,
    },
    {
      id: 2,
      trip_title: 'mno trip',
      img: IconAsset.trip1,
      days: ' 10',
      destination: 'delhi',
      start_date: '2023-04-30T00:00:00.000Z',
      end_date: '2023-05-30T00:00:00.000Z',
      total_seats: 5,
      accommodation: ' hotel',
      age_group: 0,
      manager_name: ' jai',
      manager_contact_number: ' 654658',
      text: null,
      price: 500,
      Place_from: ' indore',
      user_id: 25,
      Place_to: ' delhi',
      description: null,
    },
    {
      id: 3,
      trip_title: 'mno trip',
      img: IconAsset.trip1,
      days: ' 10',
      destination: 'delhi',
      start_date: '2023-04-30T00:00:00.000Z',
      end_date: '2023-05-30T00:00:00.000Z',
      total_seats: 5,
      accommodation: ' hotel',
      age_group: 0,
      manager_name: ' jai',
      manager_contact_number: ' 654658',
      text: null,
      price: 500,
      Place_from: ' indore',
      user_id: 25,
      Place_to: ' delhi',
      description: null,
    },
    {
      id: 4,
      trip_title: 'mno trip',
      img: IconAsset.trip1,
      days: ' 10',
      destination: 'delhi',
      start_date: '2023-04-30T00:00:00.000Z',
      end_date: '2023-05-30T00:00:00.000Z',
      total_seats: 5,
      accommodation: ' hotel',
      age_group: 0,
      manager_name: ' jai',
      manager_contact_number: ' 654658',
      text: null,
      price: 500,
      Place_from: ' indore',
      user_id: 25,
      Place_to: ' delhi',
      description: null,
    },
    {
      id: 5,
      trip_title: 'mno trip',
      img: IconAsset.trip1,
      days: ' 10',
      destination: 'delhi',
      start_date: '2023-04-30T00:00:00.000Z',
      end_date: '2023-05-30T00:00:00.000Z',
      total_seats: 5,
      accommodation: ' hotel',
      age_group: 0,
      manager_name: ' jai',
      manager_contact_number: ' 654658',
      text: null,
      price: 500,
      Place_from: ' indore',
      user_id: 25,
      Place_to: ' delhi',
      description: null,
    },
  ],

  sliderdata: [
    {
      img: require('../../images/trip1.jpeg'),
      title: 'A Summer Spent Seaside.',
    },
    {
      img: require('../../images/trip4.jpeg'),
      title: 'Trip Title',
    },
    {
      img: require('../../images/trip3.jpg'),
      title: 'Trip Title',
    },
    {
      img: require('../../images/trip1.jpeg'),
      title: 'Trip Title',
    },
    {
      img: require('../../images/trip4.jpeg'),
      title: 'Trip Title',
    },
  ],
  filterOptions: [
    {label: 'Sort by date', value: 'sortByDate'},
    {label: 'Upcoming', value: 'upcoming'},
    {label: 'Days', value: 'days'},
  ],
  isLoading: false,
  isLoadMore: false,
  listMode: 'refresh',
  isRefresh: false,
  offset: 1,
  hasMore: true,
};
const UserEventList = createSlice({
  name: 'userEventList',
  initialState,

  reducers: {
    onChangeOffsetMode: (state, {payload}) => {
      console.log(payload, 'PAYLOAD');
    },
    onShownModal: (state, {payload}) => {
      console.log(payload, 'PAYLOAD');
      state.data[payload.index].modalShown = payload.status;
      console.log(state.data[payload.index].modalShown, 'XXXXXXXXx');
    },
  },
  extraReducers: builder => {
    // ****************USER EVENT LIST
    builder.addMatcher(
      Apicall.endpoints.getAllTrips.matchPending,
      (state, {payload}) => {
        // state.isLoading = true;
        state.tripList = state.data;
        console.log('USER EVENT LIST matchPending');
      },
    );
    builder.addMatcher(
      Apicall.endpoints.getAllTrips.matchFulfilled,
      (state, {payload}) => {
        if (state.listMode === 'refresh') {
          state.tripList = payload.trips;
        } else if (state.listMode === 'loadmore') {
          state.isLoadMore = true;
          state.tripList = state.tripList.concat(payload.trips);
        } else {
          if (payload.trips.length > 0) {
            state.hasMore = true;
          } else {
            state.hasMore = false;
          }
          state.tripList = payload.trips;
        }
        state.isLoading = false;
        // state.tripList = payload.trips;
        // console.log(
        //   'tripList tripList',
        //   payload.trips,

        //   ' tripList tripList',
        // );
        console.log('USER EVENT LIST matchFulfilled');
      },
    );
    builder.addMatcher(
      Apicall.endpoints.getAllTrips.matchRejected,
      (state, {payload}) => {
        state.tripList = state.data;
        state.isLoading = false;
        console.log('USER EVENT LIST matchRejected', payload);
      },
    );

    // ***********ALL POST
    builder.addMatcher(
      Apicall.endpoints.getAllPost.matchPending,
      (state, {payload}) => {
        // state.isLoading = true;
        console.log('ALL POST matchPending');
      },
    );
    builder.addMatcher(
      Apicall.endpoints.getAllPost.matchFulfilled,
      (state, {payload}) => {
        state.isLoading = false;

        console.log(
          'ALL POST matchFulfilled',
          payload,
          'ALL POST matchFulfilled',
        );
      },
    );
    builder.addMatcher(
      Apicall.endpoints.getAllPost.matchRejected,
      (state, {payload}) => {
        state.isLoading = false;
        console.log('ALL POST matchRejected');
      },
    );
  },
});
export const {onChangeOffsetMode, onShownModal} = UserEventList.actions;
export default UserEventList.reducer;
