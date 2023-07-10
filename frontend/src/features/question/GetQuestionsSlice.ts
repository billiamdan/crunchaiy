import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { QuestionDocument } from "./model/Question";
import questionService from "./services/question.service";
import { NewQuestion } from "./model/NewQuestion";
import { DisplayQuestion } from "./model/DisplayQuestion.interface";
import { UpdateQuestionNumber } from "./model/UpdateQuestionNumber.interface";


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

export const deleteQuestion = createAsyncThunk (
    'question/delete',
    async (id: string, thunkAPI) => {
        try {
            return await questionService.deleteQuestion(id)
        } catch(error) {
            return thunkAPI.rejectWithValue('Unable to delete!')
        }
    }
)



export const questionSlice = createSlice({
    name: 'getQuestion',
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

        // // //ADD QUESTION

        //     .addCase(addQuestion.pending, (state) => {
        //         state.isLoading = true
        //     })
        //     .addCase(addQuestion.fulfilled, (state) => {
        //         state.isLoading = false;
        //         state.isSuccess = true;
        //     })
        //     .addCase(addQuestion.rejected, (state) => {
        //         state.isLoading = false;
        //         state.isError = true;
        //     })
        // // //EDIT QUESTION
        //     .addCase(updateQuestion.pending, (state) => {
        //         state.isLoading = true
        //     })
        //     .addCase(updateQuestion.fulfilled, (state) => {
        //         state.isLoading = false;
        //         state.isSuccess = true;
        //     })
        //     .addCase(updateQuestion.rejected, (state) => {
        //         state.isLoading = false;
        //         state.isError = true;
        //     })
        // //EDIT QUESTION NUMBER
        //     .addCase(updateQuestionNumber.pending, (state) => {
        //         state.isLoading = true
        //     })
        //     .addCase(updateQuestionNumber.fulfilled, (state) => {
        //         state.isLoading = false;
        //         state.isSuccess = true;
        //     })
        //     .addCase(updateQuestionNumber.rejected, (state) => {
        //         state.isLoading = false;
        //         state.isError = true;
        //     })
        // //DELETE QUESTION
        //     .addCase(deleteQuestion.pending, (state) => {
        //         state.isLoading = true
        //     })
        //     .addCase(deleteQuestion.fulfilled, (state) => {
        //         state.isLoading = false;
        //         state.isSuccess = true;
        //     })
        //     .addCase(deleteQuestion.rejected, (state) => {
        //         state.isLoading = false;
        //         state.isError = true;
        //     })


    }
})

export const { resetForm } = questionSlice.actions;

export default questionSlice.reducer;