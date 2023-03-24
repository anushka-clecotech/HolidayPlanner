import {createSlice} from '@reduxjs/toolkit';
import {Apicall} from '../../apiCall/apiList';
const initialState = {
  isLoading: false,
  eventDetail: {},
  dummyDetails: {
    trip_title: 'Destination Vacation',
    start_date: '2023-04-30T00:00:00.000Z',
    end_date: '2023-04-30T00:00:00.000Z',
    price: '20000',
    distination: 'Indore to Ladak',
    age_group: '20-50',
    text: 'Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.',
    total_seats: '200',
    avail_seat: '20',
    manager_name: 'priti',
    manager_contact_number: '9874563210',
  },
};

const userEventDetailApi = createSlice({
  name: 'eventDetail',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(
      Apicall.endpoints.tripDetailApi.matchPending,
      (state, {payload}) => {
        state.isLoading = true;
        console.log(
          'tripDetailApi matchPending',
          payload,
          'tripDetailApi matchPending',
        );
      },
    );
    builder.addMatcher(
      Apicall.endpoints.tripDetailApi.matchFulfilled,
      (state, {payload}) => {
        state.isLoading = false;
        state.eventDetail = payload.trip;
        console.log(
          'tripDetailApi matchFulfilled',
          state.eventDetail,
          'tripDetailApi matchFulfilled',
        );
      },
    );
    builder.addMatcher(
      Apicall.endpoints.tripDetailApi.matchRejected,
      (state, {payload}) => {
        state.isLoading = false;
        console.log(
          'tripDetailApi matchRejected',
          payload,
          'tripDetailApi matchRejected',
        );
      },
    );
  },
});
export const {onGetUserProfile} = userEventDetailApi.actions;
export default userEventDetailApi.reducer;
