import type { Meta, StoryObj } from '@storybook/react';
import { ThemeSwitch } from '../../components/ThemeSwitch';

const meta = {
  title: 'TagOverflow/Theme Switch',
  component: ThemeSwitch,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ThemeSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {

};

