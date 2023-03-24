import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  organizerArr: [
    {
      label: 'Organizer Name',
      value: '',
      error: '',
      keyboard: 'default',
      length: 20,
      identifier: 'name',
      keyType: false,
    },
    {
      label: 'Organizer Email',
      value: '',
      error: '',
      validation: 'email',
      keyboard: 'email-address',
      length: 30,
      keyType: false,
      identifier: 'email',
    },
    {
      label: 'Organizer Contact Number',
      value: '',
      error: '',
      validation: 'mobile',
      keyboard: 'phone-pad',
      length: 10,
      keyType: false,
      identifier: 'mobile',
    },
    {
      label: 'Gender',
      value: '',
      error: '',
      keyboard: 'default',
      length: 10,
      identifier: 'gender',
      keyType: false,
    },
    {
      label: 'Age',
      value: '',
      error: '',
      validation: 'age',
      keyboard: 'number-pad',
      length: 2,
      keyType: false,
      identifier: 'age',
    },
    {
      label: 'Password',
      value: '',
      error: '',
      validation: 'pass',
      length: 30,
      identifier: 'pass',
      keyType: true,
      keyboard: 'default',
    },
    {
      label: 'Confirm Password',
      value: '',
      error: '',
      validation: 'cpass',
      length: 30,
      keyType: true,
      identifier: 'cpass',
      keyboard: 'default',
    },
    {
      label: 'Address',
      value: '',
      error: '',
      keyboard: 'default',
      length: 100,
      identifier: 'add',
      keyType: false,
      keyboard: 'default',
    },
    {
      label: 'Organization Name',
      value: '',
      error: '',
      keyboard: 'default',
      length: 20,
      identifier: 'O_name',
      keyType: false,
    },
    {
      label: 'Organization Contact Number',
      value: '',
      error: '',
      keyboard: 'phone-pad',
      length: 10,
      identifier: 'add',
      keyType: false,
      validation: 'mobile',
    },
    {
      label: 'Organization Registration Year',
      value: '',
      error: '',
      keyboard: 'numeric',
      length: 4,
      identifier: 'reg',
      keyType: false,
      validation: 'year',
    },
    {
      label: 'Total Number of Members',
      value: '',
      error: '',
      keyboard: 'numeric',
      length: 4,
      identifier: 'members',
      keyType: false,
    },
  ],
  isLoading: false,
};
const OrganizerDetailsForm = createSlice({
  name: 'organizerForm',
  initialState,
  reducers: {
    onChangeOrganizerArr(state, {payload}) {
      // console.log(payload, 'PPPPPPPPPP');
      state.organizerArr[payload.index].error = '';
      state.organizerArr[payload.index].value = payload.value;
      console.log(state.organizerArr[payload.index].value, 'Value');
    },
    onGetError: (state, {payload}) => {
      // console.log(payload, 'EEEEEEEEEE');
      state.organizerArr[payload.index].error = payload.error;
      console.log(state.organizerArr[payload.index].error, 'Error');
    },
  },
  // extraReducers: builder => {
  //   builder.addMatcher(
  //     Apicall.endpoints.signupApi.matchFulfilled,
  //     (state, {payload}) => {
  //       state.isLoading = false;

  //       console.log('matchFulfilled');
  //     },
  //   );
  //   builder.addMatcher(
  //     Apicall.endpoints.signupApi.matchPending,
  //     (state, {payload}) => {
  //       state.isLoading = true;
  //       console.log('matchPending');
  //     },
  //   );
  //   builder.addMatcher(
  //     Apicall.endpoints.signupApi.matchRejected,
  //     (state, {payload}) => {
  //       state.isLoading = false;
  //       console.log('matchRejected');
  //     },
  //   );
  // },
});
export const {onChangeOrganizerArr, onGetError} = OrganizerDetailsForm.actions;
export default OrganizerDetailsForm.reducer;
