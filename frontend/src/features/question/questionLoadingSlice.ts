import { createSlice } from "@reduxjs/toolkit";


interface QuestionsLoadingState {
    loadingStarted: boolean;
}

const initialState: QuestionsLoadingState = {
    loadingStarted: false,
};

const questionsLoadingSlice = createSlice({
  name: 'questionsLoading',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loadingStarted = true;
    },
    stopLoading: (state) => {
      state.loadingStarted = false;
    },
  },
});

export default questionsLoadingSlice.reducer;
export const { startLoading, stopLoading } = questionsLoadingSlice.actions;