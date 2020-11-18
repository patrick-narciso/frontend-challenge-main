import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.header`
	display: flex;
	flex-direction: column;
	background-color: ${({ theme }) => theme.colors.neutral.gray[20]};
	padding: 20px 0px 0px 16px;
`;

const Description = styled.span`
	color: ${({ theme }) => theme.colors.neutral.gray[800]};
	font-size: ${({ theme }) => theme.fonts.sizes.small};
	font-weight: bold;
	margin-bottom: 4px;
`;

const TotalValue = styled(Description)`
	color: ${({ theme }) => theme.colors.primary.green[100]};
	font-size: ${({ theme }) => theme.fonts.sizes.large};
	line-height: 32px;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 24px;
`;

const Header = ({ totalTransactions, totalValue }) => {
	return (
		<Wrapper>
			<Container>
				<Description>Número de transações</Description>
				<TotalValue>{totalTransactions}</TotalValue>
			</Container>
			<Container>
				<Description>Valor total</Description>
				<TotalValue>
					{Number(totalValue).toLocaleString('pt-br', {
						style: 'currency',
						currency: 'BRL',
					})}
				</TotalValue>
			</Container>
		</Wrapper>
	);
};

Header.defaultProps = {
	totalTransactions: 0,
	totalValue: 0,
};

Header.propTypes = {
	totalTransactions: PropTypes.number,
	totalValue: PropTypes.number,
};

export default Header;
