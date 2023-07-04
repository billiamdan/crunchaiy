import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { QuestionDocument } from "./model/Question";
import questionService from "./services/question.service";
import { NewQuestion } from "./model/NewQuestion";
import { DisplayQuestion } from "./model/DisplayQuestion.interface";


interface AsyncState {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
}

interface QuestionsState extends AsyncState {
    questions: QuestionDocument[];
}

const initialState: QuestionsState = {
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

export const updateQuestion = createAsyncThunk (
    'question',
    async (question: DisplayQuestion, thunkAPI) => {
        const id = question.id
        try {
            return await questionService.updateQuestion(id, question)
        } catch(error) {
            return thunkAPI.rejectWithValue('Unable to update question!')
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
        //GET QUESTIONS
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

        //ADD QUESTION

            // .addCase(addQuestion.pending, (state) => {
            //     state.isLoading = true
            // })
            // .addCase(addQuestion.fulfilled, (state, action) => {
            //     state.isLoading = false;
            //     state.isSuccess = true;
            // })
            // .addCase(addQuestion.rejected, (state) => {
            //     state.isLoading = false;
            //     state.isError = true;
            // })
        //EDIT QUESTION

        //DELETE QUESTION
            // .addCase(deleteQuestion.pending, (state) => {
            //     state.isLoading = true
            // })
            // .addCase(deleteQuestion.fulfilled, (state, action) => {
            //     state.isLoading = false;
            //     state.isSuccess = true;
            // })
            // .addCase(deleteQuestion.rejected, (state) => {
            //     state.isLoading = false;
            //     state.isError = true;
            // })


    }
})

export const { resetForm } = questionSlice.actions;

export default questionSlice.reducer;