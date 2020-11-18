import { css } from 'styled-components';

export default css`
	background-color: ${({ theme }) => theme.colors.primary.purple[200]};
	color: #ffffff;
	box-shadow: 0px 4px 6px rgba(112, 82, 200, 0.3);

	:disabled {
		background-color: ${({ theme }) => theme.colors.neutral.gray[20]};
		color: ${({ theme }) => theme.colors.neutral.gray[300]};
		box-shadow: none;
	}
`;
