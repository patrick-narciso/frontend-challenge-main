/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import { render, screen, fireEvent } from 'commons/test-utils';

import TextField, { Label, Input } from '.';

const createTestProps = (props) => ({
	label: 'Label test',
	type: 'text',
	id: 'id test',
	onChange: jest.fn(),
	onBlur: jest.fn(),
	onFocus: jest.fn(),
	value: '',
	...props,
});

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useState: jest.fn(),
}));

describe('Components', () => {
	describe('<TextField />', () => {
		let props;
		let setState;
		beforeEach(() => {
			props = createTestProps({});
			setState = jest.fn();
			const useStateMock = (initState) => [initState, setState];

			jest.spyOn(React, 'useState').mockImplementation(useStateMock);
		});

		afterEach(() => {
			jest.clearAllMocks();
		});

		test('Should render the label floating', () => {
			const { rerender } = render(<TextField {...props} />);
			const textFieldInput = screen.getByTestId('textfield');
			fireEvent.change(textFieldInput, { target: { value: 'user input' } });
			rerender(<TextField {...props} value="user input" />);
			expect(setState).toHaveBeenCalledWith(true);
			expect(props.onChange).toHaveBeenCalled();
			expect(textFieldInput.value).toBe('user input');
		});

		test('Should handle blur event correctly', () => {
			render(<TextField {...props} />);
			const textFieldInput = screen.getByTestId('textfield');
			fireEvent.focusOut(textFieldInput);
			expect(setState).toHaveBeenCalledWith(false);
		});

		test('Should handle focus event correctly', () => {
			render(<TextField {...props} />);
			const textFieldInput = screen.getByTestId('textfield');
			fireEvent.focus(textFieldInput);
			expect(setState).toHaveBeenCalledWith(true);
		});

		test('Should render label positioned correctly', () => {
			render(<Label $active>Label test</Label>);
			expect(screen.getByText('Label test')).toHaveStyle({
				transform: 'translateY(-19px)',
				backgroundColor: '#ffffff',
				padding: '0px 4px 2px 4px',
				left: '10px',
			});
		});

		test('Should render input border color correctly', () => {
			render(<Input $active />);
			expect(screen.getByRole('textbox')).toHaveStyle({
				borderColor: '#595A63',
			});
		});
	});
});
