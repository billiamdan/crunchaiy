import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import questionsReducer from './features/question/QuestionsSlice';
import modalReducer from './features/modal/modalSlice';
import questionsLoadingReducer from './features/question/questionLoadingSlice';
import questionsFormContextReducer from './features/question/questionLoadingSlice';

  
export const store = configureStore({
    reducer: {
        auth: authReducer,
        questions: questionsReducer,
        modal: modalReducer,
        questionLoading: questionsLoadingReducer,
        questionsFormContext: questionsFormContextReducer,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
})



export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

