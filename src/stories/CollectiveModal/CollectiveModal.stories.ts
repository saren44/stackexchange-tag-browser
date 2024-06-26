import type { Meta, StoryObj } from "@storybook/react";
import { CollectiveModal } from "../../components/CollectiveModal";
import { themeWrap } from "../themeWrapper";

const mockCollective = [
  {
    tags: ["php"],
    external_links: [
      {
        type: "support",
        link: "https://stackoverflow.com/contact?topic=15",
      },
    ],
    description:
      "A collective where developers working with PHP can learn and connect about the open source scripting language.",
    link: "/collectives/php",
    name: "PHP",
    slug: "php",
  },
];

const meta = {
  title: "TagOverflow/Collective Modal",
  component: CollectiveModal,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof CollectiveModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  parameters: {
    backgrounds: { default: "light" },
  },
  decorators: [(Story) => themeWrap(Story, true)],
  args: {
    collectiveData: mockCollective,
  },
};

export const Dark: Story = {
  parameters: {
    backgrounds: { default: "dark" },
  },
  decorators: [(Story) => themeWrap(Story, false)],
  args: {
    collectiveData: mockCollective,
  },
};
