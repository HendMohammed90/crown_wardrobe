import { signInWithGooglePopup } from "../../utils/firebase/firebase.utils";

// type SignInProps = {
  // props go here
// };

export function SignIn() {
  const logInWithGoogle = async () => {
    const response = await signInWithGooglePopup();
    console.log(response);
  }
  return (
    <>
      <h1>SignIn</h1>
      <button onClick={logInWithGoogle}> signIn with google</button>
    </>
  );
}
