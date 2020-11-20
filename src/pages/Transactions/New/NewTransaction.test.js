/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom/extend-expect';

import {
	fireEvent,
	render,
	screen,
	waitFor,
	history,
	act,
} from 'commons/test-utils';

import NewTransaction from '.';

const server = setupServer(
	rest.post('http://localhost:3000/transactions', (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({
				id: 1,
				buyer_document: '12345678912',
				credit_card_holder_name: 'JOAO SILVA',
				credit_card_number: '4111111111111111',
				credit_card_expiration_date: '0121',
				credit_card_cvv: '123',
				amount: 19,
				status: 'paid',
			})
		);
	})
);

describe('Pages', () => {
	describe('New Transaction page', () => {
		beforeAll(() => {
			server.listen();
		});
		afterEach(() => {
			server.resetHandlers();
		});
		afterAll(() => {
			server.close();
		});

		test('Should render the button disabled when form is invalid', async () => {
			render(<NewTransaction />, {
				initialState: {
					transactions: {
						transactionCreated: null,
						error: null,
						createdError: null,
					},
				},
			});
			await waitFor(() =>
				expect(
					screen.getByRole('button', {
						name: 'Criar transação',
					})
				).toBeDisabled()
			);
		});

		test('Should creates a transaction and redirect user to home', async () => {
			render(<NewTransaction />, {
				initialState: {},
			});
			const name = await waitFor(() =>
				screen.getByLabelText('Nome da pessoa compradora')
			);
			const cpf = await waitFor(() => screen.getByLabelText('CPF'));
			const cardNumber = await waitFor(() =>
				screen.getByLabelText('Nº do cartão')
			);
			const expirationDate = await waitFor(() =>
				screen.getByLabelText('Data de expiração')
			);
			const cvv = await waitFor(() => screen.getByLabelText('CVV'));
			const transactionValue = await waitFor(() =>
				screen.getByLabelText('Valor da transação')
			);
			await act(async () => {
				await fireEvent.change(name, { target: { value: 'JOAO SILVA' } });
				await fireEvent.blur(name);
				await fireEvent.change(cpf, { target: { value: '70085313033' } });
				await fireEvent.blur(cpf);
				await fireEvent.change(cardNumber, {
					target: { value: '4111111111111111' },
				});
				await fireEvent.blur(cardNumber);
				await fireEvent.change(expirationDate, {
					target: { value: '01/21' },
				});
				await fireEvent.blur(expirationDate);
				await fireEvent.change(cvv, { target: { value: '123' } });
				await fireEvent.blur(cvv);
				await fireEvent.change(transactionValue, {
					target: { value: 'R$ 19,00' },
				});
				await fireEvent.blur(transactionValue);
			});

			const button = screen.getByRole('button', { name: 'Criar transação' });
			expect(button).not.toBeDisabled();

			fireEvent.click(button);
			expect(history.location.pathname).toBe('/');
		});

		test('Should redirect user to home', async () => {
			render(<NewTransaction />, {
				initialState: {},
			});
			const arrowIcon = await waitFor(() => screen.getByRole('presentation'));

			await waitFor(() => fireEvent.click(arrowIcon));
			expect(history.location.pathname).toBe('/');
		});

		test('Should renders Error Message when transaction is not created', async () => {
			server.use(
				rest.post('http://localhost:3000/transactions', (req, res, ctx) => {
					throw res(ctx.status(500), ctx.json({ message: 'Error!' }));
				})
			);
			render(<NewTransaction />, {
				initialState: {
					transactions: {
						createdError: 'Ocorreu um problema ao criar a transação',
						transactionCreated: null,
					},
				},
			});

			const snackBarError = await waitFor(() =>
				screen.getByText('Ocorreu um problema ao criar a transação')
			);

			expect(snackBarError).toBeInTheDocument();
		});
	});
});
