import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('invoices');

        if (serializedState === null) {
            return {
                invoices: [],
                formOpen: false,
                infoOpen: false,
                selectedInvoice: null,
            };
        }

        return JSON.parse(serializedState);
    } catch (error) {
        console.error(error);
        return {
            invoices: [],
            formOpen: false,
            infoOpen: false,
            selectedInvoice: null,
        };
    }
}

const initialState = loadState();

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('invoices', serializedState);
    } catch (error) {
        console.error(error);
    }
}

const calculateAmount = (items) => {
    return items.reduce((acc, item) => acc + item.total, 0);
}

const slice = createSlice({
    name: "invoices",
    initialState,
    reducers: {
        addInvoice: (state, action) => {
            const newInvoice = {
                ...action.payload,
                amount: calculateAmount(action.payload.items)
            };

            state.invoices.push(newInvoice);
            state.formOpen = false;
            saveState(state);
        },

        toggleForm: (state) => {
            state.formOpen = !state.formOpen;

            if (!state.formOpen) {
                state.selectedInvoice = null;
            }
        },

        selectInvoice: (state, action) => {
            state.selectedInvoice = action.payload;
            state.formOpen = false;
        },
        
        deleteInvoice: (state, action) => {
            state.invoices = state.invoices.filter(i => i.id !== action.payload);
            state.selectedInvoice = null;
            state.formOpen = false;
            saveState(state);
        },

        updateInvoice: (state, action) => {
            const updateInvoice = {
                ...action.payload,
                amount: calculateAmount(action.payload.items)
            }

            const index = state.invoices.findIndex(i => i.id === updateInvoice.id);

            if (index !== -1) {
                state.invoices[index] = updateInvoice;
            }

            state.selectedInvoice = null;
            state.formOpen = false;
            saveState(state);
        },

        toggleInfo: (state) => {
            state.infoOpen = !state.infoOpen;
        }
    }
});

export const { toggleForm, addInvoice, selectInvoice, deleteInvoice, updateInvoice, toggleInfo } = slice.actions;

export default slice.reducer;