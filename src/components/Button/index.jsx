import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Primary from './Primary';

const CustomButton = styled.button`
	font-family: ${({ theme }) => theme.fonts.family};
	font-size: ${({ theme }) => theme.fonts.sizes.medium};
	border: none;
	cursor: pointer;
	transition: all 150ms ease-in;
	padding: 12px;
	border-radius: 8px;
	width: 100%;
	height: 48px;

	${({ variant }) => variant === 'primary' && Primary};

	:focus {
		outline: none;
	}
`;

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Icon = styled.img`
	margin-right: 10px;
`;

const Button = ({ variant, children, onClick, disabled, icon }) => {
	return (
		<CustomButton
			type="button"
			variant={variant}
			onClick={onClick}
			disabled={disabled}
		>
			{icon ? (
				<Container>
					<Icon src={icon} alt="button icon" />
					{children}
				</Container>
			) : (
				children
			)}
		</CustomButton>
	);
};

Button.defaultProps = {
	variant: 'primary',
	disabled: false,
	icon: '',
};

Button.propTypes = {
	variant: PropTypes.oneOf(['primary', 'secondary']),
	children: PropTypes.string.isRequired,
	disabled: PropTypes.bool,
	icon: PropTypes.string,
	onClick: PropTypes.func.isRequired,
};

export default Button;
