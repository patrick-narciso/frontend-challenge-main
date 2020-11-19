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
} from 'commons/test-utils';

import Transactions from '.';

const server = setupServer(
	rest.get('http://localhost:3000/transactions', (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json([
				{
					id: 1,
					buyer_document: '12345678912',
					credit_card_holder_name: 'JOAO SILVA',
					credit_card_number: '4111111111111111',
					credit_card_expiration_date: '0121',
					credit_card_cvv: '123',
					amount: 10000,
					status: 'paid',
				},
			])
		);
	})
);

jest.mock('@rehooks/online-status', () => {
	return jest.fn(() => true);
});

describe('Pages', () => {
	describe('Transactions List Home', () => {
		beforeEach(() => {
			history.push('/');
		});
		beforeAll(() => {
			server.listen();
		});
		afterEach(() => {
			server.resetHandlers();
		});
		afterAll(() => {
			server.close();
		});
		test('Should render the Transactions List correctly', async () => {
			render(<Transactions />, {
				initialState: {
					transactions: {
						transactions: [
							{
								id: 1,
								buyer_document: '12345678912',
								credit_card_holder_name: 'JOAO S SAURO',
								credit_card_number: '4111111111111111',
								credit_card_expiration_date: '0121',
								credit_card_cvv: '123',
								amount: 10000,
								status: 'paid',
							},
						],
					},
				},
			});
			await waitFor(() =>
				expect(
					screen.getByRole('button', {
						name: 'button icon Criar transação',
					})
				).toBeInTheDocument()
			);
			await waitFor(() =>
				expect(screen.getByRole('banner')).toBeInTheDocument()
			);
			await waitFor(() => expect(screen.getByRole('list')).toBeInTheDocument());
		});

		test('Should populates Transactions List after api call', async () => {
			render(<Transactions />, { initialState: {} });
			await waitFor(() =>
				expect(screen.getByRole('banner')).toBeInTheDocument()
			);
			await waitFor(() =>
				expect(screen.getByText('JOAO SILVA')).toBeInTheDocument()
			);
		});

		test('Should call api only once', async () => {
			server.use(
				rest.get('http://localhost:3000/transactions', (req, res, ctx) => {
					return res(
						ctx.status(200),
						ctx.json([
							{
								id: 1,
								buyer_document: '12345678912',
								credit_card_holder_name: 'JOAO SILVA',
								credit_card_number: '4111111111111111',
								credit_card_expiration_date: '0121',
								credit_card_cvv: '123',
								amount: 10000,
								status: 'paid',
							},
						])
					);
				})
			);
			render(<Transactions />, {
				initialState: {
					transactions: {
						transactions: [
							{
								id: 1,
								buyer_document: '12345678912',
								credit_card_holder_name: 'PATRICK SILVA',
								credit_card_number: '4111111111111111',
								credit_card_expiration_date: '0121',
								credit_card_cvv: '123',
								amount: 10000,
								status: 'paid',
							},
						],
						transactionsFetched: true,
					},
				},
			});
			await waitFor(() =>
				expect(screen.getByRole('banner')).toBeInTheDocument()
			);
			await waitFor(() =>
				expect(screen.getByText('PATRICK SILVA')).toBeInTheDocument()
			);
		});

		test('Should not render list items and show snackbar when api responses an error', async () => {
			server.use(
				rest.get('http://localhost:3000/transactions', (req, res, ctx) => {
					throw res(ctx.status(500), ctx.json({ message: 'Error!' }));
				})
			);
			render(<Transactions />, {
				initialState: {
					transactions: {
						transactions: [],
						transactionsFetched: false,
					},
				},
			});
			await waitFor(() =>
				expect(screen.getByRole('banner')).toBeInTheDocument()
			);
			await waitFor(() =>
				expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
			);
			await waitFor(() =>
				expect(
					screen.getByText('Ocorreu um problema ao buscar as transações')
				).toBeInTheDocument()
			);
		});

		test('Should render error message when user is offline', () => {
			render(<Transactions />, {
				initialState: {
					transactions: {
						transactions: [],
						transactionsFetched: false,
					},
				},
			});

			expect(
				screen.queryByText('Verifique sua conexão com a internet')
			).not.toBeInTheDocument();
		});

		test('Should navigates to the new transaction page', async () => {
			render(<Transactions />, {
				initialState: {
					transactions: {
						transactions: [],
						transactionsFetched: false,
					},
				},
			});
			const button = await waitFor(() =>
				screen.getByRole('button', {
					name: 'button icon Criar transação',
				})
			);
			fireEvent.click(button);
			expect(history.location.pathname).toBe('/transacoes/nova');
		});
	});
});
