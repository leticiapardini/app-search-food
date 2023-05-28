// theme.ts

// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react";

// 2. Add your color mode config
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

// Here is where you define your custom colors palette
const colors = {
  blue: {
    50: "#ECF1F9",
    100: "#C9D7ED",
    200: "#A7BDE2",
    300: "#84A3D6",
    400: "#6289CB",
    500: "#3F70C0",
    600: "#335999",
    700: "#264373",
    800: "#192D4D",
    900: "#0D1626",
  },
  yeloow: {
    100: "#A07730",
  },
};

// Here is where you define your default styles for components
const components = {
  Button: {
    defaultProps: {
      colorScheme: "#A07730",
    },
  },
  Checkbox: {
    defaultProps: {
      colorScheme: "#f4f4f4f4",
    },
  },
};

// 3. extend the theme
const theme = extendTheme({ config, ...colors, components });

export default theme;
