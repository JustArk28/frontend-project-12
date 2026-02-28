import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice.js'
import channelsReduser from './channelsSlice.js'
import messagesReduser from './messagesSlice.js'

export default configureStore({
  reducer: {
    authStore: authReducer,
    channelsStore: channelsReduser,
    messagesStore: messagesReduser,
  },
})
