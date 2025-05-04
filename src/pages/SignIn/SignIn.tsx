import EmailInput from "../../shared/Components/Email/EmailInput";
import { signInWithGooglePopup, createUserDocFromAuth, signInWithEmailAndPasswordFun } from "../../utils/firebase/firebase.utils";
import PasswordInput from "../../shared/Components/Password/PasswordInput";
import { Form, FormSubmitOptions } from "@mongez/react-form";
import "./signIn.scss"
import Button from "../../shared/Components/Button/Button";
import { FirebaseError } from "firebase/app";


export function SignIn() {


  const logInWithGoogle = async () => {
    console.log('Google Sign In button clicked'); // Added logging
    try {
      const response = await signInWithGooglePopup();
      // console.log(`response is ${JSON.stringify(response)}`);
      await createUserDocFromAuth(response);
      // redirect here to the home page shop
      window.location.href = '/shop';
    } catch (error) {
      console.error('Error during Google sign in:', error); // Added error handling
    }
  }

  const submitForm = async ({ values }: { values: { email: string; password: string; } }) => {

    try {
      const user = {
        email: values.email,
        password: values.password,
      };

      // console.log(user);
      await signInWithEmailAndPasswordFun(user.email, user.password).then(()=>{
        window.location.href = '/shop';
      })
      // console.log(`result is ${JSON.stringify(result)}`);
      // if(result) setCurrentUser(result);
      // return result;
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/wrong-password':
            alert('incorrect password for email');
            break;
          case 'auth/user-not-found':
            alert('no user associated with this email');
            break;
          default:
            console.log(error);
        }
      }
    }
  }




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
          id="signInEmail"
          name="email"
          type="email"
          required
          labelText="Email"
          className="group"
          inputClassName="form-input"
        />
        <PasswordInput
          id="signInPassword"
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
          <Button type="button" buttonType="google" className="button-container" onClick={logInWithGoogle}>Google Sign In</Button>
        </div>

      </Form>
    </div>
  );
};
