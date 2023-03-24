import {createSlice} from '@reduxjs/toolkit';
import {Apicall} from '../../apiCall/apiList';
import {IconAsset} from '../../src/utils';
const initialState = {
  isAddtripLoading: false,
  isAddtripModalVisible: false,
  isEdittripModalVisible: false,
  addTripArr: [
    {
      label: 'Trip Title',
      value: 'fdgdgh',
      error: '',
      keyboard: 'default',
      length: 30,
      identifier: 'name',
    },
    {
      label: 'Price',
      value: '8520',
      error: '',
      validation: 'price',
      keyboard: 'number-pad',
      length: 7,
      identifier: 'price',
    },
    {
      label: 'Total Seats ',
      value: '100',
      error: '',
      validation: 'seat',
      keyboard: 'number-pad',
      length: 4,
      identifier: 'seat',
    },
    {
      label: 'Trip Start Date ',
      value: '2023-04-30T00:00:00.000Z',
      error: '',
      validation: 'start_date',
      keyboard: 'number-pad',
      length: 20,

      identifier: 'date',
    },
    {
      label: 'Trip End Date ',
      value: '2023-05-30T00:00:00.000Z',
      error: '',
      validation: 'end_date',
      keyboard: 'number-pad',
      length: 20,

      identifier: 'date',
    },
    {
      label: 'Accomodation',
      value: 'sdvbgfdbht',
      error: '',
      validation: 'accomodation',
      keyboard: 'default',
      length: 10,

      identifier: 'accomodation',
    },
    {
      label: 'Trip Manager Name',
      value: 'sgdbfdbh',
      error: '',
      keyboard: 'default',
      length: 10,
      identifier: 'manager_name',
    },
    {
      label: 'Trip Manager Contact Number',
      value: '9874563210',
      error: '',
      validation: 'mobile',
      keyboard: 'phone-pad',
      length: 10,
      identifier: 'mobile',
    },
    {
      label: 'Trip starts from',
      value: 'gbrhdbfdt',
      error: '',
      validation: 'start_place',
      length: 30,
      identifier: 'start_place',
      keyboard: 'default',
    },
    {
      label: 'Destination ',
      value: 'frhgrfrt',
      error: '',
      validation: 'end_place',
      length: 30,
      identifier: 'end_place',
      keyboard: 'default',
    },
    {
      label: 'Discription',
      value: 'grdhgtdh',
      error: '',
      keyboard: 'default',
      length: 100,
      identifier: 'discription',
      keyboard: 'default',
    },
  ],
};

const AddTrip = createSlice({
  name: 'addtrip',
  initialState,
  reducers: {
    onChangeAddTripArr: (state, {payload}) => {
      console.log(payload, 'PPPP');
      state.addTripArr[payload.index].error = '';
      state.addTripArr[payload.index].value = payload.value.toString();
      console.log(state.addTripArr[payload.index].value, 'TTTTTTTTTTTTTTTT');
    },
    onGetError: (state, {payload}) => {
      state.addTripArr[payload.index].error = payload.error;
    },
    onSetAddModalVisible: (state, {payload}) => {
      console.log(payload, 'OOOOOOOO');

      state.isAddtripModalVisible = payload;
      console.log(state.isAddtripModalVisible, 'AAAAAAAAA');
    },
    onSetEditModalVisible: (state, {payload}) => {
      console.log(payload, 'RRRRRRRR');

      state.isEdittripModalVisible = payload;
      console.log(state.isEdittripModalVisible, 'CCCCCCCCcc');
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      Apicall.endpoints.addTripApi.matchPending,
      (state, {payload}) => {
        state.isAddtripLoading = true;
        console.log('addTripApi matchPending');
      },
    );
    builder.addMatcher(
      Apicall.endpoints.addTripApi.matchFulfilled,
      (state, {payload}) => {
        state.isAddtripLoading = false;
        state.userProfileData = payload.user;
        console.log(
          state.userProfileData,
          'userProfileDatauserProfileDatauserProfileDatauserProfileData',
        );
      },
    );
    builder.addMatcher(
      Apicall.endpoints.addTripApi.matchRejected,
      (state, {payload}) => {
        state.isAddtripLoading = false;
        console.log('addTripApi matchRejected');
      },
    );
  },
});
export const {
  onChangeAddTripArr,
  onGetError,
  onSetAddModalVisible,
  onSetEditModalVisible,
} = AddTrip.actions;
export default AddTrip.reducer;
