import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuestionDocument } from "../question/model/Question";


interface ModalState {
  isOpen: boolean;
  question?: QuestionDocument;
}

const initialState: ModalState = {
  isOpen: false,
  question: undefined,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<QuestionDocument>) => {
      state.isOpen = true;
      state.question = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.question = undefined;
    },
  },
});

export default modalSlice.reducer;
export const { openModal, closeModal } = modalSlice.actions;

