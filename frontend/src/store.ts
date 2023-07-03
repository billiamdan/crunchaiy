import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import questionReducer from './features/question/QuestionSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        question: questionReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;