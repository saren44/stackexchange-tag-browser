import type { Meta, StoryObj } from '@storybook/react';
import { TagTable } from '../../components/TagsTable/TagsTableNew';
import { mockTagData } from '../../components/TagsTable/mockData';
import { themeWrap } from '../themeWrapper';



const meta = {
  title: 'Example/Tag Table',
  component: TagTable,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof TagTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
	decorators: [
		(Story) => themeWrap(Story, true)
	],
	parameters: {
		backgrounds: {default: 'light'}
	},
  args: {
		data: mockTagData,
		loading: false,
		error: false,
		errorMsg: 'mock error'
  },
};

export const Dark: Story = {
	decorators: [
		(Story) => themeWrap(Story, false)
	],
	parameters: {
		backgrounds: {default: 'dark'}
	},
  args: {
		data: mockTagData,
		loading: false,
		error: false,
		errorMsg: 'mock error'
  },
};

