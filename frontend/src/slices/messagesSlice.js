import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    getMessages: (state, { payload }) => {
      state.messages = payload
    },
    addMessage: (state, { payload }) => {
      (state.messages) = [...state.messages, payload]
    }
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, { payload }) => {
      state.messages = state.messages.filter(({ channelId }) => channelId !== payload.id)
    })
  }
});

export const { addMessage, getMessages } = messagesSlice.actions;

export default messagesSlice.reducer;