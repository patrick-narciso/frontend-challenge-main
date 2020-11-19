import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Transactions from 'pages/Transactions';

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<Transactions />
				</Route>
				<Route exact path="/transacoes/nova">
					<div>Criar transação</div>
				</Route>
				<Route path="*">
					<div>Not found!</div>
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
