import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { InfoModal } from '../../components/InfoModal/InfoModal';

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

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Info Modal',
  component: InfoModal,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof InfoModal>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
	args: {
		infoData: mockTagInfo
	}
};

