import { ChangeEvent } from 'react';
import FormInput, { FormInputProps } from './FormInput';

type PasswordInputProps = Omit<FormInputProps, 'type' | 'value' | 'onChange'> & {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const PasswordInput = (props: PasswordInputProps) => {
  return <FormInput type="password" {...props} />;
};

export default PasswordInput;
