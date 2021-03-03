import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";

type TextareaFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  width?: string;
  placeholder?: string;
};

export const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  width,
  placeholder,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <Flex justify="center" width={width}>
      <FormControl isInvalid={!!error}>
        <FormLabel>{label}</FormLabel>
        <Textarea {...field} id={field.name} placeholder={placeholder} />
        {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
      </FormControl>
    </Flex>
  );
};
