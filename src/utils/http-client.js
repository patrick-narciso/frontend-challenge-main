import axios from 'axios';
import config from './env-config';

class HttpClient {
	constructor() {
		this.instance = axios.create({
			baseURL: config[process.env.REACT_APP_ENV].baseUrl,
			timeout: config[process.env.REACT_APP_ENV].timeout,
		});

		this.initializeResponseInterceptor();
	}

	initializeResponseInterceptor = () => {
		this.instance.interceptors.response.use(
			this.handleResponse,
			this.handleError
		);
	};

	handleResponse = ({ data }) => data;

	handleError = (error) => Promise.reject(error);
}

export default HttpClient;
