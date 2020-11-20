import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Transactions from 'pages/Transactions';
import NewTransaction from 'pages/Transactions/New';

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<Transactions />
				</Route>
				<Route exact path="/transacoes/nova">
					<NewTransaction />
				</Route>
				<Route path="*">
					<div>Not found!</div>
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
