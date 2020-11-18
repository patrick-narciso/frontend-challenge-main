/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { Navbar } from '../components';

export default {
	title: 'Navbar',
	component: Navbar,
};

const Template = (args) => (
	<Navbar title="Nova transação" onBack={() => {}} {...args} />
);

export const Default = Template.bind({});
