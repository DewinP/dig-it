import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  limit?: number;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  size: _,
  limit,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <Flex justify="center">
      <FormControl isInvalid={!!error}>
        <FormLabel htmlFor={field.name}>{label}</FormLabel>
        <Input maxLength={limit} {...field} {...props} id={field.name} />
        {limit && (
          <Text fontSize="sm" align="end">
            {field.value.length}/{limit}
          </Text>
        )}
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
    </Flex>
  );
};
