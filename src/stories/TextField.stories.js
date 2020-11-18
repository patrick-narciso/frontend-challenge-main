/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { TextField } from '../components';

export default {
	title: 'TextField',
	component: TextField,
};

const Template = (args) => (
	<TextField
		id="name"
		label="Nome da pessoa compradora"
		type="text"
		{...args}
	/>
);

export const Default = Template.bind({});
