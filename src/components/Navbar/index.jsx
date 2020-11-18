import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import ArrowLeft from '../../assets/icons/svg/arrow-left.svg';

const Title = styled.span`
	font-family: ${({ theme }) => theme.fonts.family};
	font-size: ${({ theme }) => theme.fonts.sizes.medium};
	line-height: 24px;
	color: ${({ theme }) => theme.colors.primary.purple[800]};
	margin: 0 auto;
`;

const Container = styled.header`
	background-color: ${({ theme }) => theme.colors.neutral.gray[20]};
	display: flex;
	padding: 20px;
`;

const Icon = styled.img`
	cursor: pointer;
`;

const Navbar = ({ onBack, title }) => {
	return (
		<Container>
			<Icon
				role="presentation"
				onClick={onBack}
				src={ArrowLeft}
				alt="Ícone de seta para voltar"
			/>
			<Title>{title}</Title>
		</Container>
	);
};

Navbar.propTypes = {
	onBack: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
};

export default Navbar;
