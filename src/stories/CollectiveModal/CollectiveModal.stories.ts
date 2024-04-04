import type { Meta, StoryObj } from '@storybook/react';
import { CollectiveModal } from '../../components/CollectiveModal/CollectiveModal';
import { themeWrap } from '../themeWrapper';

const mockCollective = 	[
	{
		"tags": [
			"php"
		],
		"external_links": [
			{
				"type": "support",
				"link": "https://stackoverflow.com/contact?topic=15"
			}
		],
		"description": "A collective where developers working with PHP can learn and connect about the open source scripting language.",
		"link": "/collectives/php",
		"name": "PHP",
		"slug": "php"
	}
]

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Collective Modal',
  component: CollectiveModal,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof CollectiveModal>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Light: Story = {
	decorators: [
		(Story) => themeWrap(Story, true)
	],
  args: {
		collectiveData: mockCollective,
  },
};

export const Dark: Story = {
	decorators: [
		(Story) => themeWrap(Story, false)
	],
  args: {
		collectiveData: mockCollective,
  },
};

