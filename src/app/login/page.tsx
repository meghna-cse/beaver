"use client";

export default function LoginPage() {
  return (
      <div className="container">
        <div className="login-container">
          <h2>Login</h2>
          <form id="login-form" action="#" method="post">
            <div className="input-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required/>
            </div>
            <div className="input-group">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" required/>
            </div>
            <button type="submit">Login</button>
            <div>
              {/*<a href="register.html">Don't have an account? Register</a>*/}
              <span className="space-between"></span>
              <a href="forgot-password.html">Forgot Password?</a>
            </div>
          </form>
        </div>
      </div>
  )
}
