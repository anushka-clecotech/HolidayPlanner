import AsyncStorage from '@react-native-async-storage/async-storage';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
const test = async () => {
  var res = await AsyncStorage.getItem('userInfo');
  var result = JSON.parse(res);
  return result;
};
// const result = test();
export const Apicall = createApi({
  readucerPath: 'Apicall',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://192.168.1.21:3000/api/v1/',
    prepareHeaders: async (headers, {getState}) => {
      const response = await test();
      console.log(response, 'RRRRRRRRRRRRRRRRRR');
      if (response) {
        console.log(response, 'RRRRRRRRRRRRRRRRRR');
        headers.set('X-User-PhoneNumber', response.mobile_number);
        headers.set('X-User-Token', response.authentication_token);
        headers.set('Content-type', 'application/json');
      }

      return headers;
    },
  }),

  endpoints: builder => ({
    signupApi: builder.mutation({
      query: body => {
        console.log(body, 'SSSSSSSSSSSSSs');
        return {
          url: 'sign_up',
          method: 'POST',
          body: {
            user: body,
          },
        };
      },
    }),

    loginApi: builder.mutation({
      query: body => ({
        url: 'sign_in',
        method: 'POST',
        body: {
          user: body,
        },
      }),
    }),

    getAllTrips: builder.query({
      query: () => {
        return {
          url: `trips`,
          method: 'GET',
        };
      },
    }),

    tripDetailApi: builder.query({
      query: data => {
        console.log(data, 'FFFFFFFFFFFFFFFF');
        return {
          url: `trips/${data}`,
          method: 'GET',
        };
      },
    }),
    addTripApi: builder.mutation({
      query: body => {
        console.log(body, 'WWWWWWWWWWWWWWWww');
        return {
          url: 'trips',
          method: 'POST',
          body: {
            trip: body,
          },
        };
      },
    }),
    editTripApi: builder.mutation({
      query: body => {
        console.log(body, 'WWWWWWWWWWWWWWWww');
        return {
          url: `trips${body.id}`,
          method: 'POST',
          body: {
            trip: body,
          },
          headers: {
            'Content-type': 'application/json',
            'X-User-PhoneNumber': '8654231236',
            'X-User-Token': 'RUxWVkgwJzLT0w==',
          },
        };
      },
    }),

    getAllPost: builder.query({
      query: () => {
        console.log('TTTTTTTTT', test(), 'XXXXXXXXXXXX');

        return {
          url: `trips?page=1`,
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            'X-User-PhoneNumber': '9999600660',
            'X-User-Token': 'fWwA3lmk51Gmfw==',
          },
        };
      },
    }),

    getUserEventList: builder.query({
      query: data => {
        // console.log(data, 'FFFFFFFFFFFFFFFF');
        return {
          url: `trips?page=${1}`,
          method: 'GET',
        };
      },
    }),
    userProfile: builder.query({
      query: data => {
        console.log(data, 'TTTTTTTTT');

        return {
          url: 'user_profile',
          method: 'GET',
        };
      },
    }),
    logoutUser: builder.mutation({
      query: data => {
        console.log(data, 'DDDDDDDDDDDDDDDD');
        return {
          url: `sign_out`,
          method: 'DELETE',
        };
      },
    }),
  }),
});
export const {
  useSignupApiMutation,
  useLoginApiMutation,
  useLazyGetAllTripsQuery,
  useLazyTripDetailApiQuery,
  useAddTripApiMutation,
  useEditTripApiMutation,
  useLazyGetUserEventListQuery,
  useGetAllPostQuery,
  useLogoutUserMutation,
  useLazyUserProfileQuery,
  useOrganizerFormApiMutation,
} = Apicall;
