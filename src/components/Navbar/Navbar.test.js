/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import theme from 'commons/styled-components/theme';
import { render, screen, fireEvent } from 'commons/test-utils';

import Navbar from '.';

const createTestProps = (props) => ({
	title: 'Nova transação',
	onBack: jest.fn(),
	...props,
});

describe('Components', () => {
	describe('<Navbar />', () => {
		let props;
		beforeEach(() => {
			props = createTestProps({});
		});

		test('Should render the Navbar correctly', () => {
			render(<Navbar {...props} />);
			const title = screen.getByText('Nova transação');
			const icon = screen.getByRole('presentation');
			const header = screen.getByRole('banner');

			expect(title).toBeInTheDocument();
			expect(icon).toBeInTheDocument();
			expect(title).toHaveStyle({
				color: theme.colors.primary.purple[800],
			});
			expect(header).toHaveStyle({
				backgroundColor: theme.colors.neutral.gray[20],
				padding: '20px',
			});
		});

		test('Should handle click event correctly', () => {
			render(<Navbar {...props} />);
			fireEvent.click(screen.getByRole('presentation'));

			expect(props.onBack).toHaveBeenCalledTimes(1);
		});
	});
});
