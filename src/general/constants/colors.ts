/**
 * Main Color
 */
export const BLACK = "#333333";
export const GREEN = "#00BF71";
export const MAIN_GREEN = GREEN;
export const BRIGHT_BLUE = "#04559F";
export const BRIGHT_RED = "#D30000";
export const BRIGHT_YELLOW = "#F8991D";
export const BRIGHT_GREEN = "#007F00";
export const BROWN = "#965E00";
export const SOFT_GRAY = "#BDBDBD";
export const WHITE = "#FFFFFF";
export const SOFT_YELLOW = "#F79931";
export const GRAY = "#747474";

/**
 * Opacity main colors in solid hex values
 */
export const GRAY30 = "#CDCFD0";
export const GRAY90 = "#E5E5E5";
export const BORDER_GRAY = "#EEF1F3";
export const SHADOW = "#00000033";

export const LIGHT_BLUE = "#CEE0F0";
export const LIGHT_BROWN = "#F6E5C7";
export const LIGHT_RED = "#FFE0E0";
export const LIGHT_YELLOW = "#FFECCC";
export const LIGHT_GREEN = "#CDFFCD";

/**
 * Contextual color names based on usage
 */

export const TAG = {
  green: {
    baseColor: BRIGHT_GREEN,
    backgroundColor: "#CDFFCD",
  },
  choco: {
    baseColor: "#965E00",
    backgroundColor: "#F6E5C7",
  },
  blue: {
    baseColor: "#5E9ED8",
    backgroundColor: "#D0E9FF",
  },
  orange: {
    baseColor: "#F8991D",
    backgroundColor: "#FFEACF",
  },
  red: {
    baseColor: BRIGHT_RED,
    backgroundColor: "#FFD8D8",
  },
};

export const TEXT = {
  default: BLACK,
  primary: GREEN,
  secondary: WHITE,
  disabled: SOFT_GRAY,
  error: BRIGHT_RED,
  gray: GRAY,
};

export const TEXT_INPUT = {
  disabled: GRAY90,
};

export const BUTTON = {
  default: {
    background: GREEN,
    text: WHITE,
    hover: GREEN,
    loading: WHITE,
    border: GREEN,
  },
  primary: {
    background: WHITE,
    text: GREEN,
    hover: GRAY90,
    loading: BLACK,
    border: GRAY30,
  },
  secondary: {
    background: SOFT_YELLOW,
    text: WHITE,
    hover: SOFT_YELLOW,
    loading: WHITE,
    border: SOFT_YELLOW,
  },
};
