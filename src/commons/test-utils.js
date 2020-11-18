import React from 'react';
import PropTypes from 'prop-types';
import { render as rtlRender } from '@testing-library/react';

import { ThemeProvider } from 'styled-components';
import theme from './styled-components/theme';

function render(ui, options) {
	const Wrapper = ({ children }) => (
		<ThemeProvider theme={theme}>{children}</ThemeProvider>
	);

	Wrapper.propTypes = {
		children: PropTypes.node.isRequired,
	};

	return rtlRender(ui, { wrapper: Wrapper, ...options });
}

export * from '@testing-library/react';

export { render };
