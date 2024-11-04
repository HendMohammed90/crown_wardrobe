import EmailInput from "../../shared/Components/EmailInput";
import { signInWithGooglePopup, createUserDocFromAuth, createAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import PasswordInput from "../../shared/Components/PasswordInput";
import { Form, FormSubmitOptions } from "@mongez/react-form";
import { SignUp } from "../SignUp";


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
    const result = await createAuthUserWithEmailAndPassword(user.email, user.password);
    console.log(`result is ${JSON.stringify(result)}`);

  };


  return (
    <>
      <h1>Sign In Page</h1>
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
        <button onClick={logInWithGoogle}> signIn with google</button>
        <button type="submit"> signIn with email & password</button>
      </Form>
      <SignUp />
    </>
  );
}
