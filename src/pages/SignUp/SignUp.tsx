import TextInput from "../../shared/Components/TextInput";
import EmailInput from "../../shared/Components/EmailInput";
import PasswordInput from "../../shared/Components/PasswordInput";
import { Form, FormSubmitOptions } from "@mongez/react-form";
import { createAuthUserWithEmailAndPassword, createUserDocFromAuth } from "../../utils/firebase/firebase.utils";
import "./signUp.scss"
import Button from "../../shared/Components/Button";
import { useContext } from "react";
import { UserContext } from "../../shared/contexts/user.context";

export function SignUp() {
  const {setCurrentUser} = useContext(UserContext);


  const submitForm = async ({ values }: { values: { displayName: string ; email: string; password: string; confirmPassword: string } }) => {
    const user = {
      displayName: values.displayName,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword
    };
    if(user.password !== user.confirmPassword){
      alert('Password don\'t match');
      return;
    }
    try {
      const result = await createAuthUserWithEmailAndPassword(user.email, user.password);
      if (!result) {
        console.error('Failed to create user');
        return;
      }
      console.log(`result after sign up ${JSON.stringify(result)}`);
      await createUserDocFromAuth(result , user);
      setCurrentUser(result);
    } catch (error) {
      console.error(error);
    }
  };

  
  return (
    <div className="container">
      <h2>Don't have an account</h2>
      <span>Sign Up with your email and password </span>
      <Form onSubmit={(options: FormSubmitOptions) => {
        const values = options.values as { displayName: string; email: string; password: string; confirmPassword: string; };
        submitForm({ values: values });
        options.form.reset()
      }}>
        <TextInput         
        name="displayName"
        type="text"
        required 
        labelText="Display Name"
        className="group"
        inputClassName="form-input"/>
      <EmailInput
        name="email"
        type="email"
        required
        labelText="Email"
        className="group"
        inputClassName="form-input"
      />
      <PasswordInput
          id="password"
          type="text"
          name="password"
          minLength={8}
          required
          labelText="Password"
          className="group"
          inputClassName="form-input"
        />
        <PasswordInput
          id="confirmPassword"
          type="text"
          name="confirmPassword"
          match="password"
          minLength={8}
          required
          labelText="confirm Password"
          className="group"
          inputClassName="form-input"
        />
      <Button type="submit" buttonType="inverted" className="button-container">Sign Up</Button>
      </Form>  
      </div>
  );
}
