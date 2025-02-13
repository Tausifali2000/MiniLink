import { useState } from "react";
import { useAuthStore } from "../../store/auth.store";
import styles from "./cssModules/landing.module.css";
import { Link } from "react-router-dom";




const Login = () => {

 //Store function
  const { login, error, isLoggingIn } = useAuthStore();

  
  //States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [wrongCredentials, setWrongCredentials] = useState('');

  //Onclick Handlers
  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password });
  }

  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Validate the email format
    if (emailRegex.test(value)) {
      setEmailErrorMessage(''); // Valid email
    } else {
      setEmailErrorMessage('Please enter a valid email address'); // Invalid email
    }
  };

  const handlePasswordBlur = () => {
    if (email && password) {
      setWrongCredentials('Either email or password is wrong');
    } else {
      setWrongCredentials('');
    }
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

       <div className={styles.left}></div>

      <div className={styles.right}>

        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.heading}>Login</div>
          {error?.field === "all" && <div className={styles.errormsg}>{error.message}</div>}
          <input
            type="email"
            placeholder="Email id"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={handleEmailChange}
            style={{ borderColor: emailErrorMessage || error?.field === "email" ? 'red' : '#3B3C51' }} 
          />
          {emailErrorMessage && <div className={styles.errormsg}>{emailErrorMessage}</div>}
          {error?.field === "cred" && <div className={styles.errormsg}>{error.message}</div>}

          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              borderColor: error?.field === "password" ? "red" : "#3B3C51",
            }} />

          {error?.field === "cred" && <div className={styles.errormsg}>{error.message}</div>}
          <button type="submit" className={styles.button}>
            {isLoggingIn ? (
              <>
                <div className={styles.spinner}></div>
                <span className={styles.spinnerText}>Login</span>
              </>
            ) : (
              "Login"
            )}
          </button>

        </form>

        <p className={styles.loginText}>
          Don't have an account? <Link to="/signup"><a className={styles.link}>SignUp</a></Link>
        </p>
      </div>

    </div>
  )
}

export default Login
