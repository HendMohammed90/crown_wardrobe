import {
  signInWithGoogleRedirect,
  getGoogleRedirectResult,
  createUserDocFromAuth,
  signInWithEmailAndPasswordFun
} from "../../utils/firebase/firebase.utils";
import "./signIn.scss"
import Button from "../../shared/Components/Button/Button";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { FormEvent, useState, useEffect } from "react";
import EmailInput from "../../shared/Components/FormInput/EmailInput";
import PasswordInput from "../../shared/Components/FormInput/PasswordInput";
import { validateEmail, validatePassword } from "../../shared/utils/formValidation";


export function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {
      email: validateEmail(formData.email) || '',
      password: validatePassword(formData.password) || ''
    };

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  // Check for redirect result when component mounts
  useEffect(() => {
    const checkRedirectResult = async () => {
      const response = await getGoogleRedirectResult();
      if (response) {
        await createUserDocFromAuth(response);
        navigate('/shop');
      }
    };

    checkRedirectResult();
  }, [navigate]);

  const logInWithGoogle = () => {
    console.log('Google Sign In button clicked'); // Added logging
    signInWithGoogleRedirect();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await signInWithEmailAndPasswordFun(formData.email, formData.password);
      navigate('/shop');
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/wrong-password':
            setErrors({
              ...errors,
              password: 'Incorrect password for email'
            });
            break;
          case 'auth/user-not-found':
            setErrors({
              ...errors,
              email: 'No user associated with this email'
            });
            break;
          default:
            console.log(error);
        }
      }
    }
  };

  return (
    <div className="container">
      <h2>Already have an account</h2>
      <span>Sign In with your email and password </span>

      <form onSubmit={handleSubmit}>
        <EmailInput
          id="signInEmail"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          labelText="Email"
          className="group"
          inputClassName="form-input"
          error={errors.email}
        />
        <PasswordInput
          id="signInPassword"
          name="password"
          value={formData.password}
          onChange={handleChange}
          minLength={8}
          required
          labelText="Password"
          className="group"
          inputClassName="form-input"
          error={errors.password}
        />
        <div className="buttons-container">
          <Button type="submit" buttonType="inverted" className="button-container">Sign In</Button>
          <Button type="button" buttonType="google" className="button-container" onClick={logInWithGoogle}>Google Sign In</Button>
        </div>
      </form>
    </div>
  );
};
