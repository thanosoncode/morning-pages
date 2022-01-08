import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "../firebase";
import { StyledForm } from "../Components/styles/Auth.styled";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  let navigate = useNavigate();

  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errorSignUp, setErrorSignUp] = useState("");
  const [errorLogin, setErrorLogin] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);

  const logIn = async (e) => {
    e.preventDefault();
    try {
      if (!loginEmail) {
        setEmailError("Email address is required");
      }
      if (!loginPassword) {
        setPasswordError("Password is required");
      }

      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      setPersistence(auth, browserSessionPersistence)
        .then(() => {
          return signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        })
        .catch((error) => {
          console.log(error);
        });
      if (user) {
        navigate("/dashboard");
      }
    } catch (error) {
      setErrorLogin(error.message);
    }
  };

  const signUp = async (e) => {
    e.preventDefault();
    try {
      if (!signUpEmail) {
        setEmailError("Email address is required");
      }
      if (!signUpPassword) {
        setPasswordError("Password is required");
      }
      const user = await createUserWithEmailAndPassword(
        auth,
        signUpEmail,
        signUpPassword
      );

      if (user) {
        navigate("/dashboard");
      }
    } catch (error) {
      setErrorSignUp(error.message);
    }
  };

  useEffect(() => {
    let isMounted = true;
    setTimeout(() => {
      if (isMounted) {
        setErrorLogin("");
      }
    }, 3000);
    return () => (isMounted = false);
  }, [errorLogin]);

  useEffect(() => {
    let isMounted = true;
    setTimeout(() => {
      if (isMounted) {
        setErrorSignUp("");
      }
    }, 3000);
    return () => (isMounted = false);
  }, [errorSignUp]);

  useEffect(() => {
    let isMounted = true;
    setTimeout(() => {
      if (isMounted) {
        setEmailError("");
      }
    }, 3000);
    return () => (isMounted = false);
  }, [emailError]);

  useEffect(() => {
    let isMounted = true;
    setTimeout(() => {
      if (isMounted) {
        setPasswordError("");
      }
    }, 3000);
    return () => (isMounted = false);
  }, [passwordError]);

  return (
    <>
      {hasAccount ? (
        <StyledForm onSubmit={logIn}>
          <h1>Welcome Back!</h1>
          <p>{errorLogin}</p>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <p>{emailError}</p>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <p>{passwordError}</p>
          </div>
          <button type="submit">Log in</button>
          <footer>
            <span>Don't have an account?</span>
            <span onClick={() => setHasAccount(false)}>Sign Up!</span>
          </footer>
        </StyledForm>
      ) : (
        <StyledForm onSubmit={signUp}>
          <h1>Sign Up</h1>
          <p>{errorSignUp}</p>
          <div>
            <label htmlFor="email-sign-up">Email Address</label>
            <input
              type="email"
              id="email-sign-up"
              onChange={(e) => setSignUpEmail(e.target.value)}
            />
            <p>{emailError}</p>
          </div>
          <div>
            <label htmlFor="password-sign-up">Password</label>
            <input
              type="password"
              id="password-sign-up"
              onChange={(e) => setSignUpPassword(e.target.value)}
            />
            <p>{passwordError}</p>
          </div>
          <button type="submit">Sign Up</button>
          <footer>
            <span>Already a member?</span>
            <span onClick={() => setHasAccount(true)}>Log in</span>
          </footer>
        </StyledForm>
      )}
    </>
  );
};

export default Auth;
