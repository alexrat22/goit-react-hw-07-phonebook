import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

const initialState = {
  contacts: [],
  isLoading: false,
  error: null,
};

const contactsPending = state => {
  state.isLoading = true;
};

const contactsRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialState,

  extraReducers: {
    [fetchContacts.pending]: contactsPending,
    [addContact.pending]: contactsPending,
    [deleteContact.pending]: contactsPending,

    [fetchContacts.fulfilled](state, action) {
      state.contacts = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    [addContact.fulfilled](state, action) {
      state.contacts.push(action.payload);
      state.isLoading = false;
      state.error = null;
    },
    [deleteContact.fulfilled](state, action) {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload.id
      );
      state.isLoading = false;
      state.error = null;
    },

    [fetchContacts.rejected]: contactsRejected,
    [addContact.rejected]: contactsRejected,
    [deleteContact.rejected]: contactsRejected,
  },
});

export const contactsReducer = contactsSlice.reducer;
