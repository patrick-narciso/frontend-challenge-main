import HttpClient from 'utils/http-client';

class Transactions extends HttpClient {
	getAll = () => {
		return this.instance.get('/transactions');
	};

	create = (transaction) => {
		return this.instance.post('/transactions', transaction);
	};

	getById = (transactionId) => {
		return this.instance.get(`/transactions/${transactionId}`);
	};
}

export const TransactionsService = new Transactions();
