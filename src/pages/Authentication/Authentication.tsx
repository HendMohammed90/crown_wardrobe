import { SignUp } from "../SignUp";
import { SignIn } from "../SignIn";
import "./authentication.styles.scss"

export function Authentication() {

  return (
    <div className='authentication-container'>
      <SignIn />
      <SignUp />
    </div>
  );
}
