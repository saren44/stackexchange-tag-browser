import type { Meta, StoryObj } from '@storybook/react';
import { FilterInput } from '../../components/FilterInput/FilterInput';
import { themeWrap } from '../themeWrapper';

const meta = {
  title: 'Example/Filter',
  component: FilterInput,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof FilterInput>;

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
		top: true,
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
		top: true,
  },
};

