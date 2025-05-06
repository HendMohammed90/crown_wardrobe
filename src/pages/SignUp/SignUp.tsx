import { createAuthUserWithEmailAndPassword, createUserDocFromAuth } from "../../utils/firebase/firebase.utils";
import "./signUp.scss"
import Button from "../../shared/Components/Button/Button";
import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import TextInput from "../../shared/Components/FormInput/TextInput";
import EmailInput from "../../shared/Components/FormInput/EmailInput";
import PasswordInput from "../../shared/Components/FormInput/PasswordInput";
import { validateEmail, validatePassword, validateRequired, validatePasswordMatch } from "../../shared/utils/formValidation";

export function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
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
      displayName: validateRequired(formData.displayName, 'Display Name') || '',
      email: validateEmail(formData.email) || '',
      password: validatePassword(formData.password) || '',
      confirmPassword: validatePasswordMatch(formData.password, formData.confirmPassword) || ''
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const result = await createAuthUserWithEmailAndPassword(formData.email, formData.password);
      if (!result) {
        console.error('Failed to create user');
        return;
      }

      const user = {
        displayName: formData.displayName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      };

      await createUserDocFromAuth(result, user);
      navigate('/shop');
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        if (error.message.includes('email-already-in-use')) {
          setErrors({
            ...errors,
            email: 'Email already in use'
          });
        }
      }
    }
  };

  return (
    <div className="container">
      <h2>Don't have an account</h2>
      <span>Sign Up with your email and password </span>
      <form onSubmit={handleSubmit}>
        <TextInput
          name="displayName"
          value={formData.displayName}
          onChange={handleChange}
          required
          labelText="Display Name"
          className="group"
          inputClassName="form-input"
          error={errors.displayName}
        />
        <EmailInput
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
          id="password"
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
        <PasswordInput
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          minLength={8}
          required
          labelText="Confirm Password"
          className="group"
          inputClassName="form-input"
          error={errors.confirmPassword}
        />
        <Button type="submit" buttonType="inverted" className="button-container">Sign Up</Button>
      </form>
    </div>
  );
}
