import axios from "axios";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./login.css";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "https://testappduocchua.herokuapp.com/api/auth/login",
        {
          email: userRef.current.value,
          password: passwordRef.current.value,
        }
      );
      console.log(res);

      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      alert("Login successful");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      alert(err.response.data);
      // if (err.response.data.message.statusCode === 500)
      //   alert("Wrong Email or Password");
      // else {
      //   alert("Fail connect");
      // }
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          className="form__input"
          id="email"
          type="email"
          placeholder="you@example.com"
          required
          ref={userRef}
        />
        <label>Password</label>
        <input
          className="form__input"
          id="password"
          type="password"
          placeholder="••••••••"
          required
          minlength="8"
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
}
