import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpen: false,
    title: null,
    content: null,
  },
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.title = action.payload.title;
      state.content = action.payload.content;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.title = null;
      state.content = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
