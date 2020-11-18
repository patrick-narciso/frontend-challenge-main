/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import AddFilled from '../assets/icons/svg/add-filled.svg';
import { Button } from '../components';

export default {
	title: 'Button',
	component: Button,
};

const Template = (args) => (
	<Button onClick={() => {}} icon={AddFilled} {...args}>
		Criar transação
	</Button>
);

export const Primary = Template.bind({});
