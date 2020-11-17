import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../src/commons/styled-components/theme';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

export const decorators = [
	(Story) => (
		<ThemeProvider theme={theme}>
			<Story />
		</ThemeProvider>
	),
];
