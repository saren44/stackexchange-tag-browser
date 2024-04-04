import type { Meta, StoryObj } from '@storybook/react';
import { PaginationController } from '../../components/PaginationController/PaginationController';

const meta = {
  title: 'Example/Pagination Controller',
  component: PaginationController,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof PaginationController>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		top: true,
	}
};

