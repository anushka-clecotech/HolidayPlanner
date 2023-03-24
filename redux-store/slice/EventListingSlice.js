import {createSlice} from '@reduxjs/toolkit';
import {Apicall} from '../../apiCall/apiList';
import {IconAsset} from '../../src/utils';
const initialState = {
  isLoading: false,

  tripList: [],
  filterOptions: [
    {label: 'Sort by date', value: 'sortByDate'},
    {label: 'Upcoming', value: 'upcoming'},
    {label: 'Days', value: 'days'},
  ],
};

const TripList = createSlice({
  name: 'tripList',
  initialState,
  reducers: {
    onGetAllTrips: (state, {payload}) => {
      // console.log(payload, 'MMMMMMMMMMM');
    },
    onGetSearchData: (state, {payload}) => {
      console.log(payload, 'VVVVVVVVVVVVV');
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      Apicall.endpoints.getAllTrips.matchPending,
      (state, {payload}) => {
        state.isLoading = true;
        console.log('getAllTrips matchPending');
      },
    );
    builder.addMatcher(
      Apicall.endpoints.getAllTrips.matchFulfilled,
      (state, {payload}) => {
        state.isLoading = false;
        state.tripList = payload.trips;
        console.log('getAllTrips  matchFulfilled');
      },
    );
    builder.addMatcher(
      Apicall.endpoints.getAllTrips.matchRejected,
      (state, {payload}) => {
        state.isLoading = false;
        console.log('getAllTrips matchRejected');
      },
    );
  },
});
export const {onGetAllTrips, onGetSearchData} = TripList.actions;
export default TripList.reducer;
