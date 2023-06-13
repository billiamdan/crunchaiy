import { BrowserRouter as Router } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import {render as rtlRender} from '@testing-library/react'
import { Provider } from 'react-redux'

import authReducer from '../../features/auth/authSlice.ts'



function reducer(ui, {
    prepoadedState,
    store = configureStore ({reducer : {auth: authReducer}, prepoadedState}), 
    ...renderOptions} = {}) 
    {
        function Wrapper ({children}) {
            return (
                <Provider store={store}>
                    <Router>{children}</Router>
                </Provider>
            )
        }
        return rtlRender(ui, {wrapper: Wrapper, ...renderOptions})
    }

export * from '@testing-library/react'
export { reducer }