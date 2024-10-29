import { signInWithGooglePopup, createUserDocFromAuth } from "../../utils/firebase/firebase.utils";

// type SignInProps = {
  // props go here
// };

export function SignIn() {
  const logInWithGoogle = async () => {
    const response = await signInWithGooglePopup();
    const user = await createUserDocFromAuth(response);
    console.log(`USER is ${JSON.stringify(user)}`)
    return user;
  }
  return (
    <>
      <h1>SignIn</h1>
      <button onClick={logInWithGoogle}> signIn with google</button>
    </>
  );
}
