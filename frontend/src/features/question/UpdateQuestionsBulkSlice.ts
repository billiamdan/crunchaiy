import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import questionService from "./services/question.service";

interface AsyncStateForAddQuestion {
    updateQuestionsBulkIsLoading: boolean;
    updateQuestionsBulkIsSuccess: boolean;
    updateQuestionsBulkIsError: boolean;
}

const initialState: AsyncStateForAddQuestion = {
    updateQuestionsBulkIsLoading: false, 
    updateQuestionsBulkIsSuccess: false,
    updateQuestionsBulkIsError: false,
}

export const updateQuestionsBulk = createAsyncThunk (
    'question/bulk',
    async (questionBulkArray: any, thunkAPI) => {
        try {
            return await questionService.updateQuestionBulk(questionBulkArray)
            
        } catch(error) {
            return thunkAPI.rejectWithValue('Unable to update bulk of questions!')
        }
    }
)

export const updateQuestionsBulkSlice = createSlice({
    name: 'updateQuestionsBulk',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        // //ADD QUESTION

            .addCase(updateQuestionsBulk.pending, (state) => {
                state.updateQuestionsBulkIsLoading = true
            })
            .addCase(updateQuestionsBulk.fulfilled, (state) => {
                state.updateQuestionsBulkIsLoading = false;
                state.updateQuestionsBulkIsSuccess = true;
            })
            .addCase(updateQuestionsBulk.rejected, (state) => {
                state.updateQuestionsBulkIsLoading = false;
                state.updateQuestionsBulkIsError = true;
            })
    }
})

export default updateQuestionsBulkSlice.reducer;