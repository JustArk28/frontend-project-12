import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    getChannels: (state, { payload } ) => {
        state.channels = payload
    },
    addChannel: (state, { payload }) => {
      state.channels = [...state.channels, payload]
    },
    editChannelName: (state, { payload }) => {
      state.channels = state.channels.map(({id, name, removable}) => id === payload.id 
        ? { id, name: payload.name, removable } 
        : { id, name, removable }) 
    },
    removeChannel: (state, { payload }) => {
      state.channels = state.channels.filter(({id}) => id !== payload.id)
    },    
  },
});

export const { addChannel, getChannels, editChannelName, removeChannel } = channelsSlice.actions;

export default channelsSlice.reducer;