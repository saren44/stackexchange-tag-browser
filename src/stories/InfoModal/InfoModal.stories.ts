import type { Meta, StoryObj } from '@storybook/react';
import { InfoModal } from '../../components/InfoModal';
import { themeWrap } from '../themeWrapper';

const mockTagInfo = 	{
	"synonyms": [
		"csharp",
		"c#-language",
		"c-sharp",
		"c#.net",
		"visual-c#",
		".cs-file"
	],
	"has_synonyms": true,
	"is_moderator_only": false,
	"is_required": false,
	"count": 1614839,
	"name": "c#"
}

const meta = {
  title: 'TagOverflow/Info Modal',
  component: InfoModal,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof InfoModal>;

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
		infoData: mockTagInfo,
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
		infoData: mockTagInfo
  },
};
