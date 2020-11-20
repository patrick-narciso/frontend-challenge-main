import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Primary from './Primary';

const CustomButton = styled.button`
	font-family: ${({ theme }) => theme.fonts.family};
	font-size: ${({ theme }) => theme.fonts.sizes.medium};
	line-height: 24px;
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

const LoadingIcon = styled.i`
	margin-right: 10px;
`;

const Button = ({ variant, children, onClick, disabled, icon, loading }) => {
	const renderChildren = () => {
		if (loading) {
			return (
				<Container>
					<LoadingIcon data-testid="loader" className="fa fa-refresh fa-spin" />
					{children}
				</Container>
			);
		}
		if (icon) {
			return (
				<Container>
					<Icon src={icon} alt="button icon" />
					{children}
				</Container>
			);
		}
		return children;
	};
	return (
		<CustomButton
			type="button"
			variant={variant}
			onClick={onClick}
			disabled={disabled}
		>
			{renderChildren()}
		</CustomButton>
	);
};

Button.defaultProps = {
	variant: 'primary',
	disabled: false,
	icon: '',
	loading: false,
};

Button.propTypes = {
	variant: PropTypes.oneOf(['primary', 'secondary']),
	children: PropTypes.string.isRequired,
	disabled: PropTypes.bool,
	icon: PropTypes.string,
	onClick: PropTypes.func.isRequired,
	loading: PropTypes.bool,
};

export default Button;
