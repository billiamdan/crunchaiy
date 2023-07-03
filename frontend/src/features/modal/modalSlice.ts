import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";


interface ModalState {
  isOpen: boolean;
  content?: ReactNode;
}

const initialState: ModalState = {
  isOpen: false,
  content: undefined,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ReactNode>) => {
      state.isOpen = true;
      state.content = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.content = undefined;
    },
  },
});

export default modalSlice.reducer;
export const { openModal, closeModal } = modalSlice.actions;

