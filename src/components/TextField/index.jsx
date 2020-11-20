import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import IntlCurrencyInput from 'react-intl-currency-input';
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
	color: ${({ theme, $error }) =>
		$error ? theme.colors.primary.pink[100] : theme.colors.neutral.gray[200]};
	${({ $active }) =>
		$active &&
		css`
			transform: translateY(-19px);
			background-color: #ffffff;
			padding: 0px 4px 2px 4px;
			left: 10px;
		`}
`;

const inputStyles = css`
	padding: 12px;
	font-family: ${({ theme }) => theme.fonts.family};
	font-size: ${({ theme }) => theme.fonts.sizes.medium};
	border: 1px solid
		${({ theme, $error }) =>
			$error ? theme.colors.primary.pink[100] : theme.colors.neutral.gray[200]};
	border-radius: 6px;
	transition: all 150ms ease-in;
	width: 100%;
	color: ${({ theme, $error }) =>
		$error ? theme.colors.primary.pink[100] : theme.colors.neutral.gray[400]};
	${({ $active }) =>
		$active &&
		css`
			border-color: ${({ theme, $error }) =>
				$error
					? theme.colors.primary.pink[100]
					: theme.colors.neutral.gray[400]};
		`}
	appearance: none;
	:focus {
		outline: none;
	}
`;

export const Input = styled(InputMask)`
	${inputStyles}
`;

const CurrencyInput = styled(IntlCurrencyInput)`
	${inputStyles}
`;

const Wrapper = styled.div`
	position: relative;
	margin-bottom: ${({ theme }) => theme.measures.verticalDistance};
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
	currency,
	error,
}) => {
	const [fieldActive, setFieldActive] = useState(false);

	useEffect(() => {
		if (currency) setFieldActive(true);
	}, []);

	const currencyConfig = {
		locale: 'pt-BR',
		formats: {
			number: {
				BRL: {
					style: 'currency',
					currency: 'BRL',
					minimumFractionDigits: 2,
					maximumFractionDigits: 2,
				},
			},
		},
	};

	function activateField() {
		setFieldActive(true);
	}

	function handleBlur(e) {
		if (e.target.value === '') {
			setFieldActive(false);
		}
		onBlur(e);
	}

	function handleFocus(e) {
		setFieldActive(true);
		onFocus(e);
	}

	function handleChange(e, inputValue = '') {
		activateField();
		if (inputValue) {
			onChange(e, inputValue);
		} else {
			onChange(e);
		}
	}

	return (
		<Wrapper data-testid="wrapper-textfield">
			<Label
				data-testid="label-textfield"
				htmlFor={id}
				$active={fieldActive}
				$error={error}
			>
				{error || label}
			</Label>
			{currency ? (
				<CurrencyInput
					currency="BRL"
					config={currencyConfig}
					placeholder=""
					id={id}
					data-testid="currency-textfield"
					name={id}
					type={type}
					onFocus={handleFocus}
					onChange={(e, inputValue) => handleChange(e, inputValue)}
					onBlur={handleBlur}
					value={value}
					$active={fieldActive}
					$error={error}
				/>
			) : (
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
					$error={error}
				/>
			)}
		</Wrapper>
	);
};

TextField.defaultProps = {
	onBlur: () => {},
	onFocus: () => {},
	onChange: () => {},
	mask: '',
	value: '',
	currency: false,
	error: '',
	type: 'text',
};

TextField.propTypes = {
	label: PropTypes.string.isRequired,
	type: PropTypes.string,
	id: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	onFocus: PropTypes.func,
	mask: PropTypes.string,
	value: PropTypes.string,
	currency: PropTypes.bool,
	error: PropTypes.string,
};

export default TextField;
