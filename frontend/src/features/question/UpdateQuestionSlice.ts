import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import questionService from "./services/question.service";
import { DisplayQuestion } from "./model/DisplayQuestion.interface";



interface UpdateQuestionState {
    updateQuestionIsLoading: boolean;
    updateQuestionIsSuccess: boolean;
    updateQuestionIsError: boolean;
}

const initialState: UpdateQuestionState = {
    updateQuestionIsLoading: false, 
    updateQuestionIsSuccess: false,
    updateQuestionIsError: false,
}


export const updateQuestion = createAsyncThunk (
    'question/update',
    async (question: DisplayQuestion, thunkAPI) => {
        const id = question.id
        try {
            return await questionService.updateQuestion(id, question)
        } catch(error) {
            return thunkAPI.rejectWithValue('Unable to update question!')
        }
    }
)

export const updateQuestionSlice = createSlice({
    name: 'updateQuestion',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        //GET QUESTIONS
            .addCase(updateQuestion.pending, (state) => {
                state.updateQuestionIsLoading = true
            })
            .addCase(updateQuestion.fulfilled, (state, action) => {
                state.updateQuestionIsLoading = false;
                state.updateQuestionIsSuccess = true;

            })
            .addCase(updateQuestion.rejected, (state) => {
                state.updateQuestionIsLoading = false;
                state.updateQuestionIsError = true;
            })

    }
})

export default updateQuestionSlice.reducer;