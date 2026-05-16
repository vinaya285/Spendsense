import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { app } from "./firebase";

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signIn = async () => {

  try {

    const result = await signInWithPopup(
      auth,
      provider
    );

    return result.user;

  }

  catch (error) {

    console.log(error);

  }

};

export const logout = async () => {

  await signOut(auth);

};

export { auth };