import type { Meta, StoryObj } from '@storybook/react';
import { Header } from '../../components/Header';
import { themeWrap } from '../themeWrapper';

const meta = {
  title: 'Example/Header',
  component: Header,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
	parameters: {
		backgrounds: {default: 'light'}
	},
	decorators: [
		(Story) => themeWrap(Story, true)
	],
	args: {
		mobile: true,
  },
};

export const Dark: Story = {
	parameters: {
		backgrounds: {default: 'dark'}
	},
	decorators: [
		(Story) => themeWrap(Story, false)
	],
  args: {
		mobile: true,
  },
};

