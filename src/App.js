import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<div>Hello World!</div>
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
