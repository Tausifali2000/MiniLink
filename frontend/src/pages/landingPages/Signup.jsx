import { Link, useNavigate } from "react-router-dom";
import styles from "./cssModules/landing.module.css";
import { useAuthStore } from "../../store/auth.store";
import { useState } from "react";


const Signup = () => {
  //Store functions
  const { signup, error, isSigningUp } = useAuthStore();

  //States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setMobNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  //UseNavigate Hooks
  const navigate = useNavigate();

  //Error States
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [mobErrorMsg, setMobErrorMsg] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [backendErrors, setBackendErrors] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});


  //Valid email check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Validate the email format
    if (emailRegex.test(value)) {
      setEmailErrorMessage('');
    } else {
      setEmailErrorMessage('Please enter a valid email address');
    }
  };


  //Number Error
  const handleMobileChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setMobNumber(value);
    }
  };

  //OnClicks
  const handleKeyDown = (e) => {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'];
    if (!/^\d$/.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }

  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!email.trim()) {
      setEmailErrorMessage('Email is required');
      return;
    }

    await signup({ name, email, number, password, confirmPassword });
    navigate("/");
  };


  return (
    <div className={styles.container}>

      <div className={styles.logo}>
        <img src="/cuvette.svg" alt="" />
      </div>

      <div className={styles.loginButtons}>
        <Link to="/signup">
          <button type="submit" className={styles.secondaryButton}>
            Sign Up
          </button>
        </Link>

        <Link to="/login">
          <button type="submit" className={styles.button}>
            Login
          </button>
        </Link>
      </div>

      {/*Left section */}

      <div className={styles.left}></div>
      {/*right section */}
      <div className={styles.right}>

        <form className={styles.form} onSubmit={handleSignup}>
          <div className={styles.heading}>Join us Today!</div>
          {error?.field === "all" && <div className={styles.errormsg}>{error.message}</div>}
          <input
            type="text"
            placeholder="Name"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)} />

          <input
            type="email"
            placeholder="Email id"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={handleEmailChange}
            required
            style={{ borderColor: emailErrorMessage ? 'red' : '#3B3C51' }}
          />
          {emailErrorMessage && <div className={styles.errormsg}>{emailErrorMessage}</div>}
          {error?.field === "email" && <div className={styles.errormsg}>{error.message}</div>}
          <input
            type="tel"
            placeholder="Mobile no."
            maxLength={10}
            className={styles.input}
            value={number}
            onChange={handleMobileChange}
            onKeyDown={handleKeyDown}
            style={{ borderColor: mobErrorMsg ? 'red' : '#3B3C51' }}
          />
          {mobErrorMsg && <div className={styles.errormsg}>{mobErrorMsg}</div>}
          {error?.field === "number" && <div className={styles.errormsg}>{error.message}</div>}
          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            value={password}
            onBlur={handlePasswordBlur}
            onChange={(e) => setPassword(e.target.value)} />

          <input
            type="password"
            placeholder="Confirm Password"
            className={styles.input}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={handlePasswordBlur}
            style={{ borderColor: passwordErrorMessage ? 'red' : '#3B3C51' }}
          />
          {passwordErrorMessage && <div className={styles.errormsg}>{passwordErrorMessage}</div>}

          <button type="submit" className={styles.button}>
            {isSigningUp ? (
              <>
                <div className={styles.spinner}></div>
                <span className={styles.spinnerText}>Register</span>
              </>
            ) : (
              "Register"
            )}
          </button>

        </form>

        <p className={styles.loginText}>
          Already have an account? <Link to="/login"><a className={styles.link}>Login</a></Link>
        </p>
      </div>

    </div>
  )
}

export default Signup
