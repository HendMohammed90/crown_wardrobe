import {
  FormControlProps,
  requiredRule,
  useFormControl,
  matchRule,
} from "@mongez/react-form";
import "../input.styles.scss" 


type PasswordInputPropsType = FormControlProps & {
  labelText?: string;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
};

export default function PasswordInput(props: PasswordInputPropsType) {
  const { value, changeValue, error, id } = useFormControl({
    ...props,
    rules: [requiredRule, matchRule],
  });

  const getErrorMessage = () => {
    if (!error) return null;

    switch (error) {
      case "validation.required":
        return "required";
      case "validation.minLength":
        return "min";
      case "validation.match":
        return "match Your Password";
      default:
        return "required";
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeValue(e.target.value);
  };

  return (
    <div className={props.className}>
      <input
        type="password"
        id={id}
        value={value}
        placeholder={props.placeholder}
        onChange={handleInputChange}
        className={props.inputClassName}
      />
      {props.labelText && <label className={`${
            props.value?.length > 0 ? 'shrink' : ''
          } form-input-label`} htmlFor={id}>{props.labelText}</label>}
      {error &&  <span style={{ marginTop: '-0.5rem', fontSize: '13px', color: 'rgb(239, 68, 68)' }}>
          {getErrorMessage()}
        </span>
      }
    </div>
  );
}
