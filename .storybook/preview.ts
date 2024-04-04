import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "dark",
      values: [
        {
          name: "light",
          value: "#d4d4d4",
        },
        {
          name: "dark",
          value: "#222222",
        },
      ],
    },
  },
};

export default preview;
