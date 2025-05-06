import { ChangeEvent, useState } from 'react';
import '../input.styles.scss';

export type FormInputProps = {
  id?: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  labelText?: string;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  minLength?: number;
  error?: string;
};

const FormInput = ({
  id,
  name,
  type,
  value,
  onChange,
  onBlur,
  required = false,
  labelText,
  placeholder,
  className,
  inputClassName,
  minLength,
  error
}: FormInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <div className={className}>
      <input
        id={id || name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder || ''}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        required={required}
        minLength={minLength}
        className={inputClassName}
      />
      {labelText && (
        <label
          className={`${
            value.length > 0 || isFocused ? 'shrink' : ''
          } form-input-label`}
          htmlFor={id || name}
        >
          {labelText}
        </label>
      )}
      {error && (
        <span style={{ marginTop: '-0.5rem', fontSize: '13px', color: 'rgb(239, 68, 68)' }}>
          {error}
        </span>
      )}
    </div>
  );
};

export default FormInput;
