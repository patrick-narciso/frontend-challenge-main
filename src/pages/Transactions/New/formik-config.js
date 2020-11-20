import * as Yup from 'yup';
import cardValidator from 'card-validator';
import { isValid as isValidCPF, strip as stripCpf } from '@fnando/cpf';

const NewTransactionSchema = Yup.object().shape({
	name: Yup.string()
		.required('Nome é obrigatório')
		.min(2, 'Nome precisa ter no mínimo 2 caracteres'),
	cpf: Yup.string()
		.required('CPF é obrigatório')
		.test('cpf', 'CPF inválido', (cpf) => cpf && isValidCPF(cpf)),
	cardNumber: Yup.string()
		.required('Cartão é obrigatório')
		.test(
			'cardNumber',
			'Cartão inválido',
			(cardNumber) => cardNumber && cardValidator.number(cardNumber).isValid
		),
	expirationDate: Yup.string()
		.required('Data é obrigatória')
		.test(
			'expirationDate',
			'Data inválida',
			(expirationDate) =>
				expirationDate && cardValidator.expirationDate(expirationDate).isValid
		),
	cvv: Yup.string()
		.required('CVV inválido')
		.test(
			'cvv',
			'CVV inválido',
			(cvv) => cvv && cardValidator.cvv(cvv).isValid
		),
	transactionValue: Yup.string().required('Valor da transação é obrigatório'),
});

export const formikConfig = {
	initialValues: {
		name: '',
		cpf: '',
		cardNumber: '',
		expirationDate: '',
		cvv: '',
		transactionValue: '',
	},
	validationSchema: NewTransactionSchema,
	validateOnMount: true,
};

export const normalizeTransactionPayload = ({
	cpf,
	name,
	cardNumber,
	expirationDate,
	cvv,
	amount,
}) => ({
	buyer_document: stripCpf(cpf),
	credit_card_holder_name: name,
	credit_card_number: cardNumber.replace(/\s/g, ''),
	credit_card_expiration_date: expirationDate.replace('/', ''),
	credit_card_cvv: cvv,
	amount,
	created_at: Date.now(),
});
