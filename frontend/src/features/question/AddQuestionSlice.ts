import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import questionService from "./services/question.service";
import { NewQuestion } from "./model/NewQuestion";
import { DisplayQuestion } from "./model/DisplayQuestion.interface";



interface AsyncStateForAddQuestion {
    addQuestionIsLoading: boolean;
    addQuestionIsSuccess: boolean;
    addQuestionIsError: boolean;
}

const initialState: AsyncStateForAddQuestion = {
    addQuestionIsLoading: false, 
    addQuestionIsSuccess: false,
    addQuestionIsError: false,
}

export const addQuestion = createAsyncThunk (
    'question/add',
    async (question: NewQuestion, thunkAPI) => {
        try {
            return await questionService.addQuestion(question)
        } catch(error) {
            return thunkAPI.rejectWithValue('Unable to add question!')
        }
    }
)

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


export const addQuestionSlice = createSlice({
    name: 'addQuestion',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        // ADD QUESTION
            .addCase(addQuestion.pending, (state) => {
                state.addQuestionIsLoading = true
            })
            .addCase(addQuestion.fulfilled, (state) => {
                state.addQuestionIsLoading = false;
                state.addQuestionIsSuccess = true;
            })
            .addCase(addQuestion.rejected, (state) => {
                state.addQuestionIsLoading = false;
                state.addQuestionIsError = true;
            })
    }
})

export default addQuestionSlice.reducer;