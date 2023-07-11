import { createSlice } from "@reduxjs/toolkit";

interface QuestionsLoadingState {
  questionsIsLoading: boolean;
}

const initialState: QuestionsLoadingState = {
  questionsIsLoading: false,
};

const questionsLoadingSlice = createSlice({
  name: 'questionsLoading',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.questionsIsLoading = true;
    },
    stopLoading: (state) => {
      state.questionsIsLoading = false;
    },
  },
});

export default questionsLoadingSlice.reducer;
export const { startLoading, stopLoading } = questionsLoadingSlice.actions;