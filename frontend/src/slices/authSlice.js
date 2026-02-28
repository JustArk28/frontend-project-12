import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: null,
  token: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, { payload: { username, token } }) => {
      state.username = username
      state.token = token
    },
    logOut: (state) => {
      state.username = null
      state.token = null
    },
  },
})

export const { logIn, logOut } = authSlice.actions

export default authSlice.reducer
