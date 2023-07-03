import { createSlice } from "@reduxjs/toolkit";
import { Question } from "./model/Question";


interface QuestionsFormContextState {
    loadingStarted: boolean;
}

const initialState: Question = {
    number: '',
    question: '',
    firstAnswer: '',
    secondAnswer: '',
}



const questionsFormContextSlice = createSlice({
  name: 'modalcontext',
  initialState,
  reducers: {
    updateQuestion: (state) => {


    },
  },
});

export default questionsFormContextSlice.reducer;
export const { updateQuestion } = questionsFormContextSlice.actions;