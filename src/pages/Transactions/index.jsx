import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import useOnlineStatus from '@rehooks/online-status';
import FadeLoader from 'react-spinners/FadeLoader';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar } from '@material/react-snackbar';

import theme from 'commons/styled-components/theme';
import AddFilled from 'assets/icons/svg/add-filled.svg';
import { getAllTransactions } from 'modules/transactions';
import { Button } from 'components';

import Header from './components/Header';
import TransactionList from './components/TransactionList';

const ContainerButton = styled.div`
	width: 100vw;
	padding: 15px 16px 32px 16px;
`;

const overrideLoaderStyle = css`
	display: block;
	margin: 40vh auto;
`;

const Disclaimer = styled.p`
	margin: 15px auto;
	text-align: center;
`;

const Transactions = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const isOnline = useOnlineStatus();
	const { transactions, transactionsFetched, loading, error } = useSelector(
		(state) => state.transactions
	);
	const totalTransactions = transactions.length;
	const totalValue = transactions.reduce((acc, curr) => acc + curr.amount, 0);
	const transactionsList = transactions.map((transaction) => ({
		id: transaction?.id,
		name: transaction?.credit_card_holder_name,
		date: transaction?.date,
		status: transaction?.status,
		amount: transaction?.amount,
	}));

	useEffect(() => {
		if (!transactionsFetched) {
			dispatch(getAllTransactions());
		}
	}, []);

	const goToNewTransaction = () => history.push('/transacoes/nova');

	const handleErrorMessage = () => {
		if (error) {
			return <Snackbar message="Ocorreu um problema ao buscar as transações" />;
		}
		if (!isOnline) {
			return <Snackbar message="Verifique sua conexão com a internet" />;
		}
		return null;
	};

	return (
		<>
			{loading ? (
				<FadeLoader
					date-testid="loader"
					css={overrideLoaderStyle}
					size={150}
					color={theme.colors.primary.green[100]}
					loading={loading}
				/>
			) : (
				<>
					<Header
						totalTransactions={totalTransactions}
						totalValue={totalValue}
					/>
					<TransactionList transactions={transactionsList} />
					<Disclaimer>Você não possui nenhuma transação</Disclaimer>
					<ContainerButton>
						<Button onClick={goToNewTransaction} icon={AddFilled}>
							Criar transação
						</Button>
					</ContainerButton>
					{handleErrorMessage()}
				</>
			)}
		</>
	);
};

export default Transactions;
