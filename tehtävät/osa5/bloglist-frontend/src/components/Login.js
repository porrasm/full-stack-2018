import React from 'react'
const LoginForm = ({app}) => (
  
  <div>
    
    <form onSubmit={app.login}>
    
      <div>
        Username
          <input
            type="text"
            name="username"
            value={app.state.username}
            onChange={app.loginFieldChange}
          />
      </div>

      <div>
        Password
          <input
            type="passwrd"
            name="password"
            value={app.state.password}
            onChange={app.loginFieldChange}
          />
      </div>
      <button type="submit">Login</button>
    </form>

  </div>  
)

const LoginInformation = ({app}) => (
  
  <div>
    
    <p>Loged in as {app.state.user.username}</p>
    <button onClick={app.logout}>Logout</button>

  </div>  
)


export default {LoginForm, LoginInformation}