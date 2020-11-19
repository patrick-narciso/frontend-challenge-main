/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import theme from 'commons/styled-components/theme';
import { renderWithTheme, screen, fireEvent } from 'commons/test-utils';

import Button from '.';

const createTestProps = (props) => ({
	children: 'Criar transação',
	onClick: jest.fn(),
	disabled: false,
	variant: 'primary',
	...props,
});

describe('Components', () => {
	describe('<Button />', () => {
		let props;
		beforeEach(() => {
			props = createTestProps({});
		});

		test('Should renderWithTheme the button correctly', () => {
			renderWithTheme(<Button {...props} />);
			const button = screen.getByRole('button', { name: 'Criar transação' });
			expect(button).toHaveStyle({
				backgroundColor: theme.colors.primary.purple[200],
			});
			expect(button).toBeInTheDocument();
		});

		test('Should renderWithTheme button icon', () => {
			renderWithTheme(<Button {...props} icon="Mock icon" />);
			expect(screen.getByRole('img')).toBeInTheDocument();
		});

		test('Should renderWithTheme button disabled', () => {
			renderWithTheme(<Button {...props} disabled />);
			const button = screen.getByRole('button', { name: 'Criar transação' });
			expect(button).toHaveStyle({
				backgroundColor: theme.colors.neutral.gray[20],
			});
		});

		test('Should handle onClick event correctly', () => {
			renderWithTheme(<Button {...props} />);
			const button = screen.getByRole('button', { name: 'Criar transação' });
			fireEvent.click(button);
			expect(props.onClick).toHaveBeenCalledTimes(1);
		});
	});
});
