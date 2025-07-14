'use client';
import Link from "next/link";
import { useState } from "react";
import jwt_decode from "jwt-decode";

const Form = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: emailOrUsername.includes("@") ? undefined : emailOrUsername,
          email: emailOrUsername.includes("@") ? emailOrUsername : undefined,
          password
        }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        try {
          const decoded = jwt_decode(data.token);
          if (decoded.email) {
            localStorage.setItem("email", decoded.email);
          }
        } catch (e) {}
        window.dispatchEvent(new Event("login"));
        window.location.href = "/";
      } else {
        setMessage(data.error || "Login failed");
      }
    } catch (err) {
      setMessage("Network error");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="heading text-center">
        <h3>Login to your account</h3>
        <p className="text-center">
          Dont have an account?{" "}
          <Link href="/register" className="text-thm">
            Sign Up!
          </Link>
        </p>
      </div>

      <div className="input-group mb-2 mr-sm-2">
        <input
          type="text"
          className="form-control"
          required
          placeholder="User Name Or Email"
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
        />
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="flaticon-user"></i>
          </div>
        </div>
      </div>

      <div className="input-group form-group">
        <input
          type="password"
          className="form-control"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="flaticon-password"></i>
          </div>
        </div>
      </div>

      <div className="form-group form-check custom-checkbox mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="remeberMe"
        />
        <label className="form-check-label" htmlFor="remeberMe">
          Remember me
        </label>
        <a className="btn-fpswd float-end" href="#">
          Forgot password?
        </a>
      </div>

      <button type="submit" className="btn btn-log w-100 btn-thm">
        {loading ? "Logging in..." : "Log In"}
      </button>

      {message && (
        <div className="alert alert-info mt-3 text-center">{message}</div>
      )}
    </form>
  );
};

export default Form;