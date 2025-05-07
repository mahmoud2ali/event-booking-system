import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  events: [], 
  singleEvent: null,
  loading: false,
  isCreated: false,
  isUpdated: false,
}

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        setEvents: (state, action) => {
            state.events = action.payload;
        },
        setSingleEvent: (state, action) => {
            state.singleEvent = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setIsCreated: (state, action) => {
            state.isCreated = action.payload;
        },
        setIsUpdated: (state, action) => {
            state.isUpdated = action.payload;
        },
        bookdEvent: (state, action) => {
            state.events = state.events.map((event) =>
                event._id === action.payload._id ? action.payload : event
            );
        }
    }
});

const eventReducer = eventSlice.reducer;
const eventActions = eventSlice.actions;

export {eventReducer, eventActions};