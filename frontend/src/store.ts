import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import getQuestionsReducer from './features/question/GetQuestionsSlice';
import modalReducer from './features/modal/modalSlice';
import questionsLoadingReducer from './features/question/QuestionsLoadingSlice';
import questionsFormContextReducer from './features/question/QuestionsLoadingSlice';
import addQuestionReducer from './features/question/AddQuestionSlice';
import updateQuestionsBulkReducer from './features/question/UpdateQuestionsBulkSlice';
import updateQuestionReducer from './features/question/UpdateQuestionSlice';

  
export const store = configureStore({
    reducer: {
        auth: authReducer,
        getQuestions: getQuestionsReducer,
        addQuestion: addQuestionReducer,
        updateQuestion: updateQuestionReducer,
        updateQuestionsBulk: updateQuestionsBulkReducer,
        modal: modalReducer,
        questionsLoading: questionsLoadingReducer,
        questionsFormContext: questionsFormContextReducer,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

