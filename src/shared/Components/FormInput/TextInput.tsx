import { ChangeEvent } from 'react';
import FormInput, { FormInputProps } from './FormInput';

type TextInputProps = Omit<FormInputProps, 'type' | 'value' | 'onChange'> & {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const TextInput = (props: TextInputProps) => {
  return <FormInput type="text" {...props} />;
};

export default TextInput;
