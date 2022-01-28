import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [textError, setTextError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios({
        method: "POST",
        url: "https://testappduocchua.herokuapp.com/api/auth/register",
        data: {
          username,
          email,
          password,
        },
      });
      setTextError("");
      console.log(res);
      res.data && window.location.replace("/login");
    } catch (err) {
      //  setTextError(err.response.data.message);
      console.log(err.response);
      setError(true);
    }
  };
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          className="form__input"
          id="name"
          type="text"
          placeholder="Nguyen Van A"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          className="form__input"
          id="email"
          type="email"
          placeholder="you@example.com"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          className="form__input"
          id="password"
          type="password"
          placeholder="••••••••"
          required
          minlength="8"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
      <button className="registerLoginButton">
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
      {error && (
        <span style={{ color: "red", marginTop: "10px" }}>{textError}</span>
      )}
    </div>
  );
}
