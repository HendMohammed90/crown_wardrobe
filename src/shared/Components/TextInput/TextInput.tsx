import {
  FormControlProps,
  requiredRule,
  useFormControl,
} from "@mongez/react-form";
import "../input.styles.scss" 


type TextInputPropsType = FormControlProps & {
  labelText?: string;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
};

export default function TextInput(props: TextInputPropsType) {
  const { value, changeValue, error, id } = useFormControl({
    ...props,
    rules: [requiredRule],
  });

  const getErrorMessage = () => {
    if (!error) return null;
    else  return "required";
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeValue(e.target.value);
  };

  return (
    <div className={props.className}>
      <input
        type="text"
        id={id}
        value={value || ""}
        placeholder={props.placeholder ? props.placeholder : ""}
        onChange={handleInputChange}
        className={props.inputClassName}
      />
      {props.labelText && <label className={`${
            props.value?.length > 0 ? 'shrink' : ''
          } form-input-label`} htmlFor={id}>{props.labelText}</label>}
      {error && <span style={{ marginTop: '-0.5rem', fontSize: '13px', color: 'rgb(239, 68, 68)' }}>{getErrorMessage()}</span>}
    </div>
  );
}
