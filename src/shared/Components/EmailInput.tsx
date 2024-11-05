import {
  emailRule,
  FormControlProps,
  requiredRule,
  useFormControl,
} from "@mongez/react-form";
import "./input.styles.scss" 
type EmailInputPropsType = FormControlProps & {
  labelText?: string;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
};

export default function EmailInput(props: EmailInputPropsType) {
  const { value, changeValue, error, id } = useFormControl({
    ...props,
    rules: [requiredRule, emailRule],
  });


  const getErrorMessage = () => {
    if (!error) return null;

    switch (error) {
      case "validation.required":
        return "required";
      case "validation.emailRule":
        return "type a correct email syntax";
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
        type="email"
        id={id}
        value={value || ""}
        placeholder={props.placeholder ? props.placeholder : ""}
        onChange={handleInputChange}
        className={props.inputClassName}
      />
      {props.labelText && <label className={`${
            props.value?.length ? 'shrink' : ''
          } form-input-label`} htmlFor={id}>{props.labelText}</label>}
      {error && <span style={{ marginTop: '-0.5rem', fontSize: '13px', color: 'rgb(239, 68, 68)' }}>{getErrorMessage()}</span>}
    </div>
  );
}
