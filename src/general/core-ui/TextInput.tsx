import React, { ReactNode, useMemo } from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

type Size = "medium" | "small";

export type TextInputProps = WithStyles<typeof stylesMUI> &
  TextFieldProps & {
    onChangeText?: (input: string) => void;
    onSearch?: () => void;
    label?: string;
    leftElement?: ReactNode;
    rightElement?: ReactNode;
    containerStyle?: StyleProp<ViewStyle>;
    textInputStyle?: StyleProp<ViewStyle>;
    size?: Size;
  };

function TextInput(props: TextInputProps) {
  let {
    label,
    placeholder,
    onChangeText,
    onSearch,
    leftElement,
    rightElement,
    containerStyle,
    size = "small",
    classes,
    ...otherProps
  } = props;

  let sizeTextInput = useMemo(() => {
    switch (size) {
      case "small":
        return classes.inputSmall;
      default:
        return classes.inputMedium;
    }
  }, [size, classes]);

  return (
    <View style={[styles.container, containerStyle]}>
      <TextField
        label={label}
        placeholder={placeholder}
        onChange={(event) => {
          onChangeText && onChangeText(event.target.value);
        }}
        InputProps={{
          startAdornment: leftElement ? (
            <InputAdornment position="start">{leftElement}</InputAdornment>
          ) : (
            <View /> // Note : Temporary solving overlaying title and set value from API by forcing the title to go up
          ),
          endAdornment: rightElement ? (
            <InputAdornment position="end">
              <TouchableOpacity onPress={onSearch}>
                {rightElement}
              </TouchableOpacity>
            </InputAdornment>
          ) : undefined,
          classes: {
            input: sizeTextInput,
          },
        }}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 2,
  },
});

const stylesMUI = createStyles({
  inputSmall: {
    padding: 8,
  },
  inputMedium: {
    padding: 18.5,
  },
});

export default withStyles(stylesMUI)(TextInput);
