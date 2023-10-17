"use client";

export default function RegisterPage() {
  return (
      <div className="container">
        <div className="login-container">
          <h2>Register</h2>
          <form id="login-form" action="#" method="post">
            <div className="input-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" required/>
            </div>
            <div className="input-group">
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" name="username" required/>
            </div>
            <div className="input-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required/>
            </div>
            <div className="input-group">
              <label htmlFor="identification">Identification No:</label>
              <input type="text" id="identification" name="identification" required/>
            </div>
            <div className="input-group">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" required/>
            </div>
            <button type="submit">Register</button>
            <div>
              <span className="space-between"></span>
              <a href={"login"}>Already have an account? Click to login</a>
            </div>
          </form>
        </div>
      </div>
  )
}
