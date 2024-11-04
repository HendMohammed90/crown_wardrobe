import EmailInput from "../../shared/Components/EmailInput";
import { signInWithGooglePopup, createUserDocFromAuth, signInWithEmailAndPasswordFun } from "../../utils/firebase/firebase.utils";
import PasswordInput from "../../shared/Components/PasswordInput";
import { Form, FormSubmitOptions } from "@mongez/react-form";
import "./signIn.scss"
import Button from "../../shared/Components/Button";


export function SignIn() {
  const logInWithGoogle = async () => {
    const response = await signInWithGooglePopup();
    const user = await createUserDocFromAuth(response);
    console.log(`USER is ${JSON.stringify(user)}`)
    return user;

  }

  const submitForm = async ({ values }: { values: { email: string; password: string; } }) => {
    const user = {
      email: values.email,
      password: values.password,
    };

    console.log(user);
    const result = await signInWithEmailAndPasswordFun(user.email, user.password);
    console.log(`result is ${JSON.stringify(result)}`);

  };

  return (
    <div className="container">
      <h2>Already have an account</h2>
      <span>Sign In with your email and password </span>
      <Form
        onSubmit={(options: FormSubmitOptions) => {
          const values = options.values as { email: string; password: string; };
          submitForm({ values: values });
        }}
      >
        <EmailInput
          name="email"
          type="email"
          required
          labelText="Email"
          className="group"
          inputClassName="form-input"
        />
        <PasswordInput
          type="text"
          name="password"
          minLength={8}
          required
          labelText="Password"
          className="group"
          inputClassName="form-input"
        />
        <div className="buttons-container">
        <Button type="submit" buttonType="inverted" className="button-container">Sign In</Button>
        <Button type="submit" buttonType="google" className="button-container" onClick={logInWithGoogle}>Google Sign In</Button>
        </div>

      </Form>
      </div>
  );
}
