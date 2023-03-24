import {createSlice} from '@reduxjs/toolkit';
import {Apicall} from '../../apiCall/apiList';
const initialState = {
  user: {
    userType: '',
    latitude: '',
    longitude: '',
  },
  isLoading: false,
  organizerArr: [
    {
      label: 'Name',
      value: 'testing',
      error: '',
      keyboard: 'default',
      length: 20,
      identifier: 'name',
      keyType: false,
    },
    {
      label: 'Email',
      value: 'testing1@gmail.com',
      error: '',
      validation: 'email',
      keyboard: 'email-address',
      length: 30,
      keyType: false,
      identifier: 'email',
    },
    {
      label: 'Contact Number',
      value: '9877896540',
      error: '',
      validation: 'mobile',
      keyboard: 'phone-pad',
      length: 10,
      keyType: false,
      identifier: 'mobile',
    },
    {
      label: 'Gender',
      value: 'Male',
      error: '',
      keyboard: 'default',
      length: 10,
      identifier: 'gender',
      keyType: false,
    },
    {
      label: 'Age',
      value: '25',
      error: '',
      validation: 'age',
      keyboard: 'number-pad',
      length: 2,
      keyType: false,
      identifier: 'age',
    },
    {
      label: 'Password',
      value: '000000',
      error: '',
      validation: 'pass',
      length: 30,
      identifier: 'pass',
      keyType: true,
      keyboard: 'default',
    },
    {
      label: 'Confirm Password',
      value: '000000',
      error: '',
      validation: 'cpass',
      length: 30,
      keyType: true,
      identifier: 'cpass',
      keyboard: 'default',
    },
    {
      label: 'Address',
      value: 'feregbrtjhyt',
      error: '',
      keyboard: 'default',
      length: 100,
      identifier: 'add',
      keyType: false,
      keyboard: 'default',
    },
    {
      label: 'Organization Name',
      value: 'FDGVrg',
      error: '',
      keyboard: 'default',
      length: 20,
      identifier: 'O_name',
      keyType: false,
    },
    {
      label: 'Organization Contact Number',
      value: '9854712365',
      error: '',
      keyboard: 'phone-pad',
      length: 10,
      identifier: 'add',
      keyType: false,
      validation: 'mobile',
    },
    {
      label: 'Organization Registration Year',
      value: '2010',
      error: '',
      keyboard: 'numeric',
      length: 4,
      identifier: 'reg',
      keyType: false,
      validation: 'year',
    },
    {
      label: 'Total Number of Members',
      value: '100',
      error: '',
      keyboard: 'numeric',
      length: 4,
      identifier: 'members',
      keyType: false,
    },
  ],
};

const OrganizerSignup = createSlice({
  name: 'organizersignup',
  initialState,
  reducers: {
    onChangeOrganizerSignupArr(state, {payload}) {
      console.log(payload, 'QQQQQQQQQQ');
      if (payload.userType) {
        state.user.userType = payload.userType;
      } else if (payload.latitude && payload.longitude) {
        state.user.latitude = payload.latitude;
        state.user.longitude = payload.longitude;
      } else {
        state.organizerArr[payload.index].error = '';
        state.organizerArr[payload.index].value = payload.value;
        console.log(state.organizerArr[payload.index].value, 'Value');
      }
    },
    onGetError: (state, {payload}) => {
      // console.log(payload, 'EEEEEEEEEE');
      state.organizerArr[payload.index].error = payload.error;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      Apicall.endpoints.signupApi.matchFulfilled,
      (state, {payload}) => {
        state.isLoading = false;
        console.log('matchFulfilled');
      },
    );
    builder.addMatcher(
      Apicall.endpoints.signupApi.matchPending,
      (state, {payload}) => {
        state.isLoading = true;
        console.log('matchPending');
      },
    );
    builder.addMatcher(
      Apicall.endpoints.signupApi.matchRejected,
      (state, {payload}) => {
        state.isLoading = false;
        console.log('matchRejected');
      },
    );
  },
});
export const {onChangeOrganizerSignupArr, onGetError} = OrganizerSignup.actions;
export default OrganizerSignup.reducer;
