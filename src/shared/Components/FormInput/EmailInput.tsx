import { ChangeEvent } from 'react';
import FormInput, { FormInputProps } from './FormInput';

type EmailInputProps = Omit<FormInputProps, 'type' | 'value' | 'onChange'> & {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const EmailInput = (props: EmailInputProps) => {
  return <FormInput type="email" {...props} />;
};

export default EmailInput;
