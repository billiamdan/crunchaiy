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
      console.log("state.questionsLoading")
      console.log(state.questionsIsLoading)
    },
    stopLoading: (state) => {
      state.questionsIsLoading = false;
    },
  },
});

export default questionsLoadingSlice.reducer;
export const { startLoading, stopLoading } = questionsLoadingSlice.actions;