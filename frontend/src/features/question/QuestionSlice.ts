import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { QuestionDocument } from "./model/Question";
import questionService from "./services/question.service";
import { NewQuestion } from "./model/NewQuestion";


interface AsyncState {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
}

interface QuestionState extends AsyncState {
    questions: QuestionDocument[];
}

const initialState: QuestionState = {
    questions: [],
    isLoading: false, 
    isSuccess: false,
    isError: false,

}



export const getQuestions = createAsyncThunk('question',
async () => {
    try {
        return await questionService.getQuestions();
    } catch (error) {
        console.log('Error: ', error)
    }
}
)

export const addQuestion = createAsyncThunk (
    'question',
    async (question: NewQuestion, thunkAPI) => {
        try {
            return await questionService.addQuestion(question)
        } catch(error) {
            return thunkAPI.rejectWithValue('Unable to add question!')
        }
    }
)

export const deleteQuestion = createAsyncThunk (
    'question',
    async (id: string, thunkAPI) => {
        try {
            return await questionService.deleteQuestion(id)
        } catch(error) {
            return thunkAPI.rejectWithValue('Unable to delete!')
        }
    }
) 

export const questionSlice = createSlice({
    name: 'question',
    initialState,
    reducers: {
        resetForm: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getQuestions.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getQuestions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.questions = action.payload?.data || []
            })
            .addCase(getQuestions.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.questions = []
            })
    }
})

export const { resetForm } = questionSlice.actions;

export default questionSlice.reducer;