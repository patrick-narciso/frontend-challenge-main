import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { Snackbar } from '@material/react-snackbar';

import { Navbar, TextField, Button } from 'components';

import {
	createTransaction,
	transactionCreateReset,
} from 'modules/transactions';
import { formikConfig, normalizeTransactionPayload } from './formik-config';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	padding: 88px 16px;
`;

const CardRow = styled.div`
	display: flex;
	flex-direction: row;
`;

const CvvCol = styled.div`
	display: flex;
	flex-direction: column;
	flex-basis: 100%;
	flex: 2;
`;

const ExpirationCol = styled(CvvCol)`
	flex: 3;
	margin-right: 8px;
`;

const ButtonContainer = styled.div`
	padding: 0px 16px;
	margin-bottom: 0px;
`;

const NewTransaction = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [amount, setAmount] = useState();
	const { loading, createdError, transactionCreated } = useSelector(
		(state) => state.transactions
	);
	const formik = useFormik(formikConfig);

	useEffect(() => {
		return () => dispatch(transactionCreateReset());
	}, []);

	const goToHome = () => history.push('/');

	const handleSubmit = async () => {
		const payload = normalizeTransactionPayload({ ...formik.values, amount });
		await dispatch(createTransaction(payload));
		if (!createdError && transactionCreated) goToHome();
	};

	const handleAmountChange = (e, value) => {
		e.preventDefault();
		setAmount(value);
		formik.handleChange(e);
	};

	return (
		<>
			<Navbar onBack={goToHome} title="Nova transação" />
			<Container>
				<TextField
					id="name"
					onChange={formik.handleChange}
					label="Nome da pessoa compradora"
					onBlur={() => formik.setFieldTouched('name')}
					value={formik.values.name}
					error={formik.touched.name && formik.errors.name}
				/>
				<TextField
					id="cpf"
					onChange={formik.handleChange}
					label="CPF"
					onBlur={() => formik.setFieldTouched('cpf')}
					mask="999.999.999-99"
					value={formik.values.cpf}
					error={formik.touched.cpf && formik.errors.cpf}
				/>
				<TextField
					id="cardNumber"
					onChange={formik.handleChange}
					label="Nº do cartão"
					onBlur={() => formik.setFieldTouched('cardNumber')}
					mask="9999 9999 9999 9999"
					value={formik.values.cardNumber}
					error={formik.touched.cardNumber && formik.errors.cardNumber}
				/>
				<CardRow>
					<ExpirationCol>
						<TextField
							id="expirationDate"
							onChange={formik.handleChange}
							label="Data de expiração"
							onBlur={() => formik.setFieldTouched('expirationDate')}
							mask="99/99"
							value={formik.values.expirationDate}
							error={
								formik.touched.expirationDate && formik.errors.expirationDate
							}
						/>
					</ExpirationCol>
					<CvvCol>
						<TextField
							id="cvv"
							onChange={formik.handleChange}
							label="CVV"
							onBlur={() => formik.setFieldTouched('cvv')}
							mask="999"
							value={formik.values.cvv}
							error={formik.touched.cvv && formik.errors.cvv}
						/>
					</CvvCol>
				</CardRow>
				<TextField
					id="transactionValue"
					type="text"
					onChange={(e, value) => handleAmountChange(e, value)}
					label="Valor da transação"
					onBlur={() => formik.setFieldTouched('transactionValue')}
					value={formik.values.transactionValue}
					error={
						formik.touched.transactionValue && formik.errors.transactionValue
					}
					currency
				/>
			</Container>
			<ButtonContainer>
				<Button
					loading={loading}
					disabled={!formik.isValid || loading}
					onClick={handleSubmit}
				>
					Criar transação
				</Button>
			</ButtonContainer>
			{createdError && !transactionCreated && (
				<Snackbar message={createdError} />
			)}
		</>
	);
};

export default NewTransaction;
