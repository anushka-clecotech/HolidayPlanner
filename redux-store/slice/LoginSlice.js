import {createSlice} from '@reduxjs/toolkit';
import {Apicall} from '../../apiCall/apiList';
const initialState = {
  isLoading: false,
  loginArr: [
    {
      label: 'Username',
      value: 'tej@gmail.com',
      error: '',
      validation: 'username',
      Keyboard: 'email-address',
      length: 30,
      keyType: false,
      identifier: 'user',
    },

    {
      label: 'Password',
      value: '000000',
      error: '',
      validation: 'pass',
      length: 30,
      identifier: 'pass',
      keyType: true,
    },
  ],
};

const LogIn = createSlice({
  name: 'login',
  initialState,
  reducers: {
    onChangeLoginArr(state, {payload}) {
      console.log(payload, 'MMMMMMMMMMM');
      state.loginArr[payload.index].error = '';
      state.loginArr[payload.index].value = payload.value;
      console.log(state.loginArr, 'UUUUUUU');
    },
    onGetError: (state, {payload}) => {
      console.log(payload, 'AAAAAAAA');
      state.loginArr[payload.index].error = payload.error;
      // state.organizerArr[payload.index].error = payload.error;
      // console.log(state.organizerArr[payload.index].error, 'Error');
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      Apicall.endpoints.loginApi.matchPending,
      (state, {payload}) => {
        state.isLoading = true;
        console.log('loginApi matchPending');
      },
    );
    builder.addMatcher(
      Apicall.endpoints.loginApi.matchFulfilled,
      (state, {payload}) => {
        state.isLoading = false;

        console.log(
          'loginApi matchFulfilled',
          payload,
          'loginApi matchFulfilled',
        );
      },
    );
    builder.addMatcher(
      Apicall.endpoints.loginApi.matchRejected,
      (state, {payload}) => {
        state.isLoading = false;
        console.log('loginApi matchRejected');
      },
    );
  },
});
export const {onGetUser, onChangeLoginArr, onGetError} = LogIn.actions;
export default LogIn.reducer;
