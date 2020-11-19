/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { TransactionsService } from 'services/Transactions';

const initialState = {
	transactions: [],
	transactionsFetched: false,
	loading: false,
	error: null,
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
	},
});

export const {
	transactionsFetchStart,
	transactionsFetchSuccess,
	transactionsFetchFailure,
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

export default transactions.reducer;
