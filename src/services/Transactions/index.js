import HttpClient from 'utils/http-client';

class Transactions extends HttpClient {
	getAll = () => {
		return this.instance.get('/transactions');
	};

	create = (transaction) => {
		return this.instance.post('/transactions', transaction);
	};
}

export const TransactionsService = new Transactions();
