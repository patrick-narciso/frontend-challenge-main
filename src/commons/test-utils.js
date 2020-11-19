import React from 'react';
import PropTypes from 'prop-types';
import { render as rtlRender } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { ThemeProvider } from 'styled-components';
import theme from './styled-components/theme';
import reducer from '../reducers';

export const history = createMemoryHistory({ initialEntries: ['/'] });

function render(
	ui,
	{
		initialState = {},
		store = createStore(reducer, initialState, applyMiddleware(thunk)),
		...options
	}
) {
	const Wrapper = ({ children }) => (
		<Router history={history}>
			<Provider store={store}>
				<ThemeProvider theme={theme}>{children}</ThemeProvider>
			</Provider>
		</Router>
	);

	Wrapper.propTypes = {
		children: PropTypes.node.isRequired,
	};

	return rtlRender(ui, { wrapper: Wrapper, ...options });
}

function renderWithTheme(ui, options) {
	const Wrapper = ({ children }) => (
		<ThemeProvider theme={theme}>{children}</ThemeProvider>
	);

	Wrapper.propTypes = {
		children: PropTypes.node.isRequired,
	};

	return rtlRender(ui, { wrapper: Wrapper, ...options });
}

export * from '@testing-library/react';

export { render, renderWithTheme };
