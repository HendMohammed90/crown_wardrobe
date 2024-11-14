import "./button.styles.scss"


  const BUTTON_TYPE_CLASSES = {
    'google' : 'google-sign-in',
    'inverted' : 'inverted'
  }

  type ButtonPropsType = {
    children: React.ReactNode; 
    buttonType: keyof typeof BUTTON_TYPE_CLASSES; 
    type: "submit" | "reset" | "button" ;
    className?: string;
    onClick?: React.MouseEventHandler
}

export default function Button ({children, buttonType, type, className, onClick}: ButtonPropsType) {
  return (
    <button type={type} className={`${className} ${BUTTON_TYPE_CLASSES[buttonType]}`} onClick={onClick}>{children}</button>
  )
}
