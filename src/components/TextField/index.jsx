import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

export const Label = styled.label`
	display: inline-block;
	position: absolute;
	cursor: text;
	left: 12px;
	top: 12px;
	transition: all 150ms ease-in;
	font-family: ${({ theme }) => theme.fonts.family};
	font-size: ${({ theme }) => theme.fonts.sizes.medium};
	color: ${({ theme }) => theme.colors.neutral.gray[200]};
	${({ $active }) =>
		$active &&
		css`
			transform: translateY(-19px);
			background-color: #ffffff;
			padding: 0px 4px 2px 4px;
			left: 10px;
		`}
`;

export const Input = styled(InputMask)`
	padding: 12px;
	font-family: ${({ theme }) => theme.fonts.family};
	font-size: ${({ theme }) => theme.fonts.sizes.medium};
	border: 1px solid ${({ theme }) => theme.colors.neutral.gray[200]};
	border-radius: 6px;
	transition: all 150ms ease-in;
	width: 100%;
	color: ${({ theme }) => theme.colors.neutral.gray[400]};
	${({ $active }) =>
		$active &&
		css`
			border-color: ${({ theme }) => theme.colors.neutral.gray[400]};
		`}
	:focus {
		outline: none;
	}
`;

const Wrapper = styled.div`
	position: relative;
`;

const TextField = ({
	label,
	id,
	type,
	onChange,
	onBlur,
	onFocus,
	mask,
	value,
}) => {
	const [fieldActive, setFieldActive] = useState(false);

	function activateField() {
		setFieldActive(true);
	}

	function handleBlur(e) {
		if (e.target.value === '') {
			setFieldActive(false);
		}
		onBlur();
	}

	function handleFocus() {
		setFieldActive(true);
		onFocus();
	}

	function handleChange() {
		activateField();
		onChange();
	}

	return (
		<Wrapper data-testid="wrapper-textfield">
			<Label data-testid="label-textfield" htmlFor={id} $active={fieldActive}>
				{label}
			</Label>
			<Input
				id={id}
				data-testid="textfield"
				name={id}
				type={type}
				mask={mask}
				maskPlaceholder={null}
				onFocus={handleFocus}
				onChange={handleChange}
				onBlur={handleBlur}
				value={value}
				$active={fieldActive}
			/>
		</Wrapper>
	);
};

TextField.defaultProps = {
	onBlur: () => {},
	onFocus: () => {},
	onChange: () => {},
	mask: '',
	value: '',
};

TextField.propTypes = {
	label: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	onFocus: PropTypes.func,
	mask: PropTypes.string,
	value: PropTypes.string,
};

export default TextField;
