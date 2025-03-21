import { configureStore } from '@reduxjs/toolkit';
import sliceReducer from './slice';

export const store = configureStore({
    reducer: {
        invoices: sliceReducer
    }
})