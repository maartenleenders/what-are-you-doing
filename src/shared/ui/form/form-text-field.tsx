import React from "react";
import {
  UseControllerProps,
  FieldValues,
  useController,
} from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";

export type FormTextFieldProps<T extends FieldValues> = TextFieldProps &
  UseControllerProps<T> & {
    testId?: string;
  };

export const FormTextField = <T extends FieldValues>(
  props: FormTextFieldProps<T>,
) => {
  const {
    field: { ref, ...fieldProps },
    fieldState,
  } = useController(props);

  const error = !!fieldState.error && fieldState.isTouched;

  return <TextField ref={ref} error={error} {...props} {...fieldProps} />;
};
