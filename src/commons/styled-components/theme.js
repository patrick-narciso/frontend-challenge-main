import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
	${normalize}
	${reset}

	*, *:before, *:after {
    -webkit-box-sizing: border-box;
       -moz-box-sizing: border-box;
            box-sizing: border-box;
	}

	body {
		font-family: ${({ theme }) => theme.fonts.family}, sans-serif;
		background-color: #FFFFFF;
	}
`;

export default {
	colors: {
		primary: {
			purple: {
				100: '#6045AF',
				200: '#3F2787',
				800: '#1D1647',
			},
			green: {
				100: '#65A300',
			},
		},
		neutral: {
			gray: {
				20: '#F2F2F3',
				200: '#8B8B92',
				300: '#72737A',
				400: '#595A63',
				500: '#454550',
				700: '#2B2B2B',
				800: '#070817',
			},
		},
	},
	fonts: {
		sizes: {
			small: '14px',
			medium: '16px',
			large: '20px',
		},
		family: 'Lato',
	},
	measures: {
		verticalDistance: '16px',
	},
};
