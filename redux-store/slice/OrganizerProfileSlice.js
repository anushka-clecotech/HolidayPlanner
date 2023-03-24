import {createSlice} from '@reduxjs/toolkit';
import {Apicall} from '../../apiCall/apiList';
import {IconAsset} from '../../src/utils';
const initialState = {
  isLoading: false,
  user: {
    name: 'anushka sahu',
    email: 'anu@gmail.com',
    mobile_number: '9874563210',
    address: '412, indore',
    img: IconAsset.profileIcon1,
  },
  userProfileData: {},
};

const UserProfile = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    onGetUserProfile(state, {payload}) {
      console.log(payload, 'MMMMMMMMMMM');
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      Apicall.endpoints.userProfile.matchPending,
      (state, {payload}) => {
        state.isLoading = true;
        console.log('userProfile matchPending');
      },
    );
    builder.addMatcher(
      Apicall.endpoints.userProfile.matchFulfilled,
      (state, {payload}) => {
        state.isLoading = false;
        state.userProfileData = payload.user;
        console.log(
          state.userProfileData,
          'userProfileDatauserProfileDatauserProfileDatauserProfileData',
        );
      },
    );
    builder.addMatcher(
      Apicall.endpoints.userProfile.matchRejected,
      (state, {payload}) => {
        state.isLoading = false;
        console.log('userProfile matchRejected');
      },
    );
  },
});
export const {onGetUserProfile} = UserProfile.actions;
export default UserProfile.reducer;
