import React, { useCallback, useState } from "react";
import { useHistory } from "react-router";
import { magic } from "../magic";

export default function Login() {
  const [email, setEmail] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const history = useHistory();

  /**
   * Perform login action via Magic's passwordless flow. Upon successuful
   * completion of the login flow, a user is redirected to the homepage.
   */
  const loginWithEmail = useCallback(async () => {
    setIsLoggingIn(true);
    try {
      await magic.auth.loginWithMagicLink({ email });
      history.push("/");
    } catch (error) {
      console.log(error);
      setIsLoggingIn(false);
    }
  }, [email, history]);

  /**
   * Saves the value of our email input into component state.
   */
  const handleEmailInputOnChange = useCallback((event) => {
    setEmail(event.target.value);
  }, []);

  return (
    <div className="container">
      <h1>Please sign up or login</h1>
      <input
        type="email"
        name="email"
        required="required"
        placeholder="Enter your email"
        onChange={handleEmailInputOnChange}
        disabled={isLoggingIn}
      />
      <button onClick={loginWithEmail} disabled={isLoggingIn}>
        Send
      </button>
    </div>
  );
}
