module.exports = {
	env: {
		browser: true,
		es2020: true,
		jest: true,
	},
	extends: ['airbnb', 'prettier/react', 'eslint-config-prettier'],
	settings: {
		'import/resolver': {
			node: {
				paths: ['src'],
			},
		},
	},
	parser: 'babel-eslint',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['react', 'prettier', 'eslint-plugin-prettier'],
	rules: {
		'prettier/prettier': 'error',
		'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
		'import/prefer-default-export': 'off',
	},
};
