import  { useState } from "react"
import "./style.css"
// import "./script.js"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faLock, faMobileScreenButton } from "@fortawesome/free-solid-svg-icons"

const Login = () => {
  const [isActive, setIsActive] = useState(false);

  const handleAddClassActice = () => {
    setIsActive(!isActive);
  };
  return (
    <div className="wrapper-page">
      <div className={`container ${isActive ? 'active' : ''}`} id="container">
        <div className="form-container sign-up">
          <form >
            <h1>Create Account</h1>
            <input type="text" name="name" id="name" placeholder="Full name" required />
            {/* <FontAwesomeIcon icon={faMobileScreenButton} /> */}
            <input type="text" name="phone" id="phone" placeholder="Phone number" />
            {/* <FontAwesomeIcon icon={faLock} /> */}
            <input type="password" name="password" id="password" placeholder="Password" />
            <button >
              Sign up
            </button>
          </form>
        </div>
        <div className="form-container sign-in">
          <form>
            <h1>Login</h1>
            {/* <FontAwesomeIcon icon={faMobileScreenButton} /> */}
            <input type="text" name="phone" id="phone" placeholder="Phone number" />
            {/* <FontAwesomeIcon icon={faLock} /> */}
            <input type="password" name="password" id="password" placeholder="Password" />
            <a className="inline-block align-baseline font-weight-400 text-sm text-gray-500 hover:text-blue-800" href="#">
              Forgot Password?
            </a>
            <button >
              Sing in
            </button>
          </form>
        </div>
        <div className="toggle-container">
            <div className="toggle-wr">
                <div className="toggle-panel toggle-left">
                    <h1>Welcome Back!</h1>
                    <p>Enter your personal details to use all of site features</p>
                    <button className="hd" id="login" onClick={handleAddClassActice}>Sign In</button>
                </div>
                <div className="toggle-panel toggle-right">
                    <h1>Hello, Friend!</h1>
                    <p>Register with your personal details to use all of site features</p>
                    <button className="hd" id="register" onClick={handleAddClassActice}>Sign Up</button>
                </div>
            </div>
      </div>
      </div>
    </div>
  )
}

export default Login