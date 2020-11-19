import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

const TransactionList = styled.ul`
	list-style: none;
`;

const TransactionItem = styled.li`
	display: flex;
	justify-content: space-between;
	padding: 16px;
	border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.gray[20]};
`;

const Name = styled.span`
	color: ${({ theme }) => theme.colors.neutral.gray[500]};
	font-size: ${({ theme }) => theme.fonts.sizes.medium};
	line-height: 24px;
	font-weight: bold;
`;

const Date = styled(Name)`
	font-weight: normal;
`;

const Value = styled(Name)`
	color: ${({ theme }) => theme.colors.neutral.gray[700]};
	text-align: right;
`;

const Status = styled.span`
	color: ${({ theme }) => theme.colors.neutral.gray[300]};
	font-size: ${({ theme }) => theme.fonts.sizes.small};
	line-height: 24px;
	text-align: right;
`;

const ContainerInfo = styled.div`
	display: flex;
	flex-direction: column;
`;

const Transactions = ({ transactions }) => {
	const statusDict = {
		paid: 'Paga',
		refused: 'Recusada',
	};

	return (
		<TransactionList>
			{transactions.map(({ id, name, date, status, amount }) => (
				<TransactionItem key={id}>
					<ContainerInfo>
						<Name>{name}</Name>
						<Date>{date ? format(date, 'dd/MM/yyyy HH:mm') : '-'}</Date>
					</ContainerInfo>
					<ContainerInfo>
						<Status>{status ? statusDict[status] : '-'}</Status>
						<Value>
							{Number(amount).toLocaleString('pt-br', {
								style: 'currency',
								currency: 'BRL',
							})}
						</Value>
					</ContainerInfo>
				</TransactionItem>
			))}
		</TransactionList>
	);
};

Transactions.propTypes = {
	transactions: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			name: PropTypes.string,
			date: PropTypes.number,
			status: PropTypes.string,
			amount: PropTypes.number,
		})
	).isRequired,
};

export default Transactions;
