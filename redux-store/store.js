import {configureStore} from '@reduxjs/toolkit';
import usersingupreducer from './slice/UserSignupSlice';
import loginreducer from './slice/LoginSlice';
import userEventListreducer from './slice/UserEventListingSlice';
import organizerFormreducer from './slice/OrganizerDetailsFormSlice';
import userProfilereducer from './slice/UserProfileSlice';
import organizersignupreducer from './slice/OrganizerSignupFormSlice';
import eventDetailreducer from './slice/UserEventDeatilsSlice';
import addtripreducer from './slice/AddTripSlice';
import tripListreducer from './slice/EventListingSlice';
import {Apicall} from '../apiCall/apiList';

export const store = configureStore({
  reducer: {
    [Apicall.reducerPath]: Apicall.reducer,
    usersingup: usersingupreducer,
    login: loginreducer,
    userEventList: userEventListreducer,
    organizerForm: organizerFormreducer,
    userProfile: userProfilereducer,
    organizersignup: organizersignupreducer,
    eventDetail: eventDetailreducer,
    addtrip: addtripreducer,
    tripList: tripListreducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(Apicall.middleware),
});
