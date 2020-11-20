/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { TransactionsService } from 'services/Transactions';

const initialState = {
	transactions: [],
	transactionsFetched: false,
	loading: false,
	transactionCreated: null,
	error: null,
	createdError: null,
};

const transactions = createSlice({
	name: 'transactions',
	initialState,
	reducers: {
		transactionsFetchStart(state) {
			state.loading = true;
			state.error = null;
		},
		transactionsFetchSuccess(state, action) {
			state.transactions = action.payload;
			state.transactionsFetched = true;
			state.loading = false;
			state.error = null;
		},
		transactionsFetchFailure(state, action) {
			state.transactions = [];
			state.transactionsFetched = false;
			state.loading = false;
			state.error = action.payload;
		},
		transactionCreateStart(state) {
			state.loading = true;
			state.createdError = null;
		},
		transactionCreateSuccess(state, action) {
			state.transactionCreated = action.payload;
			state.transactions = [action.payload, ...state.transactions];
			state.loading = false;
			state.createdError = null;
		},
		transactionCreateFailure(state, action) {
			state.transactionCreated = null;
			state.loading = false;
			state.createdError = action.payload;
		},
		transactionCreateReset(state) {
			state.createdError = null;
			state.transactionCreated = null;
		},
	},
});

export const {
	transactionsFetchStart,
	transactionsFetchSuccess,
	transactionsFetchFailure,
	transactionCreateStart,
	transactionCreateSuccess,
	transactionCreateFailure,
	transactionCreateReset,
} = transactions.actions;

export const getAllTransactions = () => async (dispatch) => {
	try {
		dispatch(transactionsFetchStart());
		const transactionsResponse = await TransactionsService.getAll();
		dispatch(transactionsFetchSuccess(transactionsResponse));
	} catch (err) {
		dispatch(
			transactionsFetchFailure({
				message: err?.response?.message,
				status: err?.response?.status,
			})
		);
	}
};

export const createTransaction = (transaction) => async (dispatch) => {
	try {
		dispatch(transactionCreateStart());
		const transactionResponse = await TransactionsService.create(transaction);
		dispatch(transactionCreateSuccess(transactionResponse));
	} catch (err) {
		dispatch(
			transactionCreateFailure('Ocorreu um problema ao criar a transação')
		);
	}
};

export default transactions.reducer;
