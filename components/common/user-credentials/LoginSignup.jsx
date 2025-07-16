"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

function validatePasswordStrength(password) {
  // At least 8 chars, one uppercase, one lowercase, one number, one special char
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  return regex.test(password);
}

const LoginSignup = () => {
  // Registration state
  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regRePassword, setRegRePassword] = useState("");
  const [regMsg, setRegMsg] = useState("");
  const [regLoading, setRegLoading] = useState(false);

  // Login state
  const [loginUsernameOrEmail, setLoginUsernameOrEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginMsg, setLoginMsg] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Registration handler (unchanged)
  const handleRegister = async (e) => {
    e.preventDefault();
    setRegMsg("");
    if (regPassword !== regRePassword) {
      setRegMsg("Passwords do not match");
      return;
    }
    if (!validatePasswordStrength(regPassword)) {
      setRegMsg('Password must be at least 8 characters and include uppercase, lowercase, number, and special character.');
      return;
    }
    setRegLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: regUsername,
          email: regEmail,
          password: regPassword,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setRegMsg("Registration successful! You can now log in.");
        // Switch to Login tab
        if (typeof window !== "undefined") {
          const loginTab = document.querySelector('#home-tab');
          if (loginTab) loginTab.click();
        }
      } else {
        setRegMsg(data.error || "Registration failed");
      }
    } catch (err) {
      setRegMsg("Server error");
    }
    setRegLoading(false);
  };

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginMsg("");
    setLoginLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: loginUsernameOrEmail.includes("@") ? undefined : loginUsernameOrEmail,
          email: loginUsernameOrEmail.includes("@") ? loginUsernameOrEmail : undefined,
          password: loginPassword
        }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        window.dispatchEvent(new Event("login"));
        window.location.href = "/";
      } else {
        setLoginMsg(data.error || "Login failed");
      }
    } catch (err) {
      setLoginMsg("Network error");
    }
    setLoginLoading(false);
  };

  return (
    <div className="modal-content">
      <div className="modal-header">
        <button
          type="button"
          data-bs-dismiss="modal"
          aria-label="Close"
          className="btn-close"
        ></button>
      </div>
      {/* End .modal-header */}

      <div className="modal-body container pb20">
        <div className="row">
          <div className="col-lg-12">
            <ul className="sign_up_tab nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  href="#home"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  Login
                </a>
              </li>
              {/* End login tab */}

              <li className="nav-item">
                <a
                  className="nav-link"
                  id="profile-tab"
                  data-bs-toggle="tab"
                  href="#profile"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  Register
                </a>
              </li>
              {/* End Register tab */}
            </ul>
            {/* End .sign_up_tab */}
          </div>
        </div>
        {/* End .row */}

        <div className="tab-content container" id="myTabContent">
          <div
            className="row mt25 tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <div className="col-lg-6 col-xl-6">
              <div className="login_thumb">
                <Image
                  width={357}
                  height={494}
                  className="img-fluid w100 h-100 cover"
                  src="/assets/images/resource/login.jpg"
                  alt="login.jpg"
                />
              </div>
            </div>
            {/* End col */}

            <div className="col-lg-6 col-xl-6">
              <div className="login_form">
                <form onSubmit={handleLogin}>
                  <div className="heading">
                    <h4>Login</h4>
                  </div>
                  {/* End heading */}

                  <div className="row mt25">
                    <div className="col-lg-12">
                      <button type="button" className="btn btn-fb w-100" disabled>
                        <i className="fa fa-facebook float-start mt5"></i> Login
                        with Facebook
                      </button>
                    </div>
                    <div className="col-lg-12">
                      <button type="button" className="btn btn-googl w-100" disabled>
                        <i className="fa fa-google float-start mt5"></i> Login
                        with Google
                      </button>
                    </div>
                  </div>
                  {/* End .row */}

                  <hr />

                  <div className="input-group mb-2 mr-sm-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="User Name Or Email"
                      value={loginUsernameOrEmail}
                      onChange={e => setLoginUsernameOrEmail(e.target.value)}
                      required
                    />
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="flaticon-user"></i>
                      </div>
                    </div>
                  </div>
                  {/* End input-group */}

                  <div className="input-group form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={loginPassword}
                      onChange={e => setLoginPassword(e.target.value)}
                      required
                    />
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="flaticon-password"></i>
                      </div>
                    </div>
                  </div>
                  {/* End input-group */}

                  <div className="form-group form-check custom-checkbox mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="remeberMe"
                    />
                    <label
                      className="form-check-label form-check-label"
                      htmlFor="remeberMe"
                    >
                      Remember me
                    </label>

                    <a className="btn-fpswd float-end" href="#">
                      Lost your password?
                    </a>
                  </div>
                  {/* End remember me checkbox */}

                  <button type="submit" className="btn btn-log w-100 btn-thm" disabled={loginLoading}>
                    {loginLoading ? "Logging in..." : "Log In"}
                  </button>
                  {/* End submit button */}

                  {loginMsg && (
                    <div className="alert alert-info mt-3 text-center">{loginMsg}</div>
                  )}

                  <p className="text-center">
                    Dont have an account?{" "}
                    <a className="text-thm" href="#" onClick={() => {
                      const regTab = document.querySelector('#profile-tab');
                      if (regTab) regTab.click();
                    }}>
                      Register
                    </a>
                  </p>
                </form>
              </div>
              {/* End .col .login_form */}
            </div>
          </div>
          {/* End .tab-pane */}

          <div
            className="row mt25 tab-pane fade"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <div className="col-lg-6 col-xl-6">
              <div className="regstr_thumb">
                <Image
                  width={357}
                  height={659}
                  className="img-fluid w100 h-100 cover"
                  src="/assets/images/resource/regstr.jpg"
                  alt="regstr.jpg"
                />
              </div>
            </div>
            {/* End . left side image for register */}

            <div className="col-lg-6 col-xl-6">
              <div className="sign_up_form">
                <div className="heading">
                  <h4>Register</h4>
                </div>
                {/* End .heading */}

                <form onSubmit={handleRegister}>
                  <div className="form-group input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="User Name"
                      value={regUsername}
                      onChange={e => setRegUsername(e.target.value)}
                    />
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="flaticon-user"></i>
                      </div>
                    </div>
                  </div>
                  <div className="form-group input-group  mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      value={regEmail}
                      onChange={e => setRegEmail(e.target.value)}
                    />
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="fa fa-envelope-o"></i>
                      </div>
                    </div>
                  </div>
                  <div className="form-group input-group  mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={regPassword}
                      onChange={e => setRegPassword(e.target.value)}
                    />
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <i className="flaticon-password"></i>
                      </div>
                    </div>
                  </div>
                  <div className="form-group input-group  mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Re-enter password"
                      value={regRePassword}
                      onChange={e => setRegRePassword(e.target.value)}
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
                      value=""
                      id="terms"
                      required
                    />
                    <label
                      className="form-check-label form-check-label"
                      htmlFor="terms"
                    >
                      I have accept the Terms and Privacy Policy.
                    </label>
                  </div>
                  <button type="submit" className="btn btn-log w-100 btn-thm" disabled={regLoading}>
                    {regLoading ? "Registering..." : "Sign Up"}
                  </button>
                  {regMsg && <div className="alert alert-info mt-2">{regMsg}</div>}
                </form>
                {/* End .form */}
              </div>
            </div>
            {/* End register content */}
          </div>
          {/* End .tab-pane */}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
