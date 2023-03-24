import {createSlice} from '@reduxjs/toolkit';
import {Apicall} from '../../apiCall/apiList';
const initialState = {
  user: {
    userType: 'customer',
    latitude: '',
    longitude: '',
  },
  isLoading: false,
  userArr: [
    {
      label: 'Name',
      value: 'tej',
      error: '',
      keyboard: 'default',
      length: 20,
      identifier: 'name',
      keyType: false,
    },
    {
      label: 'Email',
      value: 'tej@gmail.com',
      error: '',
      validation: 'email',
      keyboard: 'email-address',
      length: 30,
      keyType: false,
      identifier: 'email',
    },
    {
      label: 'Contact Number',
      value: '9875645869',
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
      value: 'dgvrfbhtgj',
      error: '',
      keyboard: 'default',
      length: 100,
      identifier: 'add',
      keyType: false,
      keyboard: 'default',
    },
    // {
    //   label: 'Image',
    //   value: '',
    //   error: '',
    //   identifier: 'image',
    // },
  ],
};

const UserSignup = createSlice({
  name: 'usersingup',
  initialState,
  reducers: {
    onChangeUserSignupArr(state, {payload}) {
      console.log(payload, 'MMMMMMMMMMM');
      if (payload.userType) {
        state.user.userType = payload.userType;
      } else if (payload.latitude && payload.longitude) {
        state.user.latitude = payload.latitude;
        state.user.longitude = payload.longitude;
      } else if (payload.organizerArr) {
        state.organizerArr[payload.index].error = '';
        state.organizerArr[payload.index].value = payload.value;
      } else {
        state.userArr[payload.index].error = '';
        state.userArr[payload.index].value = payload.value;
      }
      // console.log(state.userArr, 'Value');
    },
    onGetError: (state, {payload}) => {
      // console.log(payload, 'EEEEEEEEEE');
      state.userArr[payload.index].error = payload.error;
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
        console.log('matchRejected', payload);
      },
    );
  },
});
export const {onChangeUserSignupArr, onGetError} = UserSignup.actions;
export default UserSignup.reducer;
