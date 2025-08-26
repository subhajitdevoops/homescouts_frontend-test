import React from "react";

const Signup = () => {
  return (
    <div>
      <main className="page-center">
        <article className="sign-up">
          <h1 className="sign-up__title">Get started</h1>
          <p className="sign-up__subtitle">
            Start creating the best possible user experience for you customers
          </p>
          <form className="sign-up-form form" action="" method="">
            <label className="form-label-wrapper">
              <p className="form-label">Name</p>
              <input
                className="form-input"
                type="text"
                placeholder="Enter your name"
                required
              />
            </label>
            <label className="form-label-wrapper">
              <p className="form-label">Team</p>
              <input
                className="form-input"
                type="email"
                placeholder="Enter your Team name"
                required
              />
            </label>
            <label className="form-label-wrapper">
              <p className="form-label">Email</p>
              <input
                className="form-input"
                type="email"
                placeholder="Enter your email"
                required
              />
            </label>
            <label className="form-label-wrapper">
              <p className="form-label">Password</p>
              <input
                className="form-input"
                type="password"
                placeholder="Enter your password"
                required
              />
            </label>
            <label className="form-checkbox-wrapper">
              <input className="form-checkbox" type="checkbox" required />
              <span className="form-checkbox-label">Remember me next time</span>
            </label>
            <button className="form-btn primary-default-btn transparent-btn">
              Sign in
            </button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default Signup;
