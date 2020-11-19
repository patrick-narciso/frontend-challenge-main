import { combineReducers } from '@reduxjs/toolkit';

import transactionsReducer from './modules/transactions';

const rootReducer = combineReducers({
	transactions: transactionsReducer,
});

export default rootReducer;
