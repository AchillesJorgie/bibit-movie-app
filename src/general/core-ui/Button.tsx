import React, { ReactNode } from "react";
import { ActivityIndicator, View, ViewStyle } from "react-native";
import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import MaterialButton, { ButtonProps } from "@material-ui/core/Button";
import classNames from "classnames";

import { BUTTON } from "../constants/colors";

type ButtonType = "text" | "outlined" | "contained";
type SizeType = "long" | "medium" | "short" | "small";

type Props = WithStyles<typeof styles> &
  ButtonProps & {
    onPress?: () => void;
    buttonType?: ButtonType;
    isLoading?: boolean;
    disabled?: boolean;
    children?: ReactNode;
    containerStyle?: ViewStyle;
    buttonStyle?: ViewStyle;
    sizePreset?: SizeType;
    backgroundColor?: string;
  };

function Button(props: Props) {
  let {
    children,
    classes,
    isLoading,
    disabled,
    onPress,
    buttonType = "default" as ButtonType,
    containerStyle,
    buttonStyle: additionalButtonStyle,
    sizePreset,
    backgroundColor,
    ...otherProps
  } = props;

  let buttonColorStyle = disabled
    ? classes.coreStyle
    : classNames(classes.coreStyle, classes[buttonType]);
  let buttonWidthStyle = "";
  if (sizePreset) {
    buttonWidthStyle = classes[sizePreset];
  }
  let buttonStyle = `${buttonColorStyle} ${buttonWidthStyle} ${additionalButtonStyle}`;

  let variant: ButtonType =
    buttonType === "outlined" ? "outlined" : "contained";

  let size: SizeType = sizePreset === "small" ? "small" : "medium";

  return (
    <View style={containerStyle}>
      <MaterialButton
        variant={variant}
        onClick={onPress ? onPress : () => {}}
        disabled={disabled}
        className={buttonStyle}
        disableRipple={isLoading}
        style={{ backgroundColor, borderColor: backgroundColor }}
        disableElevation
        size={size}
        {...otherProps}
      >
        {isLoading ? (
          <ActivityIndicator size={24} color={BUTTON.default.loading} /> // TODO : Change approach color
        ) : (
          children
        )}
      </MaterialButton>
    </View>
  );
}

const styles = createStyles({
  coreStyle: {
    fontWeight: "bold",
    textTransform: "none",
    fontSize: 14,
  },
  default: {
    borderColor: BUTTON.default.border,
    backgroundColor: BUTTON.default.background,
    color: BUTTON.default.text,
    border: "1px solid",
    "&:hover": {
      backgroundColor: BUTTON.default.hover,
    },
  },
  outlined: {
    borderColor: BUTTON.primary.border,
    backgroundColor: BUTTON.primary.background,
    color: BUTTON.primary.text,
    border: "1px solid",
    "&:hover": {
      backgroundColor: BUTTON.primary.hover,
    },
  },
  long: {
    width: "328px",
  },
  medium: {
    width: "147px",
  },
  short: {
    width: "66px",
  },
  small: {
    lineHeight: "13px",
    padding: "4px",
    paddingTop: "5px",
  },
});

export default withStyles(styles)(Button);
