import { useState } from "react"
import "./style.css"
import useSign from "../../hooks/useSignUp.js"
import useLogin from "@/hooks/useLogin.js"
const Login = () => {
  const [isActive, setIsActive] = useState(false)

  const handleAddClassActive = () => {
    setIsActive(!isActive)
  }
  const [inputsSignUp, setInputsSignUp] = useState({
    username: "",
    fullName: "",
    password: "",
    phone: "",
    age: 0,
    avatar: "",
    is_admin: false,
  })
  const [inputsSignIn, setInputsSignIn] = useState({
    username: "",
    password: "",
  })
  const { loading, signUp } = useSign()
  const { loadingLogin, login } = useLogin()

  const handleSubmitSignUp = async (e: any) => {
    e.preventDefault()
    try {
      await signUp(inputsSignUp)
    } catch (error) {
      console.log(error)
    }
  }
  const handleSignIn = async (e: any) => {
    e.preventDefault()
    try {
      await login(inputsSignIn)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="wrapper-page">
      <div className={`container ${isActive ? "active" : ""}`} id="container">
        <div className="form-container sign-up">
          <form onSubmit={handleSubmitSignUp}>
            <h1 className="text-xl font-bold">Create Account</h1>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="User name"
              required
              value={inputsSignUp.username}
              onChange={(e) => setInputsSignUp({ ...inputsSignUp, username: e.target.value })}
            />
            <input
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Full name"
              required
              value={inputsSignUp.fullName}
              onChange={(e) => setInputsSignUp({ ...inputsSignUp, fullName: e.target.value })}
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={inputsSignUp.password}
              onChange={(e) => setInputsSignUp({ ...inputsSignUp, password: e.target.value })}
            />
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="Phone number"
              value={inputsSignUp.phone}
              onChange={(e) => setInputsSignUp({ ...inputsSignUp, phone: e.target.value })}
            />
            <input
              type="number"
              name="age"
              id="age"
              placeholder="Age"
              required
              value={inputsSignUp.age}
              min={16}
              onChange={(e) => setInputsSignUp({ ...inputsSignUp, age: parseInt(e.target.value) })}
            />
            <input
              type="file"
              name="avatar"
              id="avatar"
              placeholder="Avatar"
              required
              value={inputsSignUp.avatar}
              onChange={(e) => setInputsSignUp({ ...inputsSignUp, avatar: e.target.value })}
            />
            <div className="flex relative right-72 ">
              <label htmlFor="is_admin" className="label gap-1 cursor-pointer font-bold">
                Is Admin
              </label>
              <input
                className="checkbox checkbox-sm  checked:bg-gray-400 "
                type="checkbox"
                name="is_admin"
                id="is_admin"
                checked={inputsSignUp.is_admin} // Use checked attribute instead of value
                onChange={(e) => setInputsSignUp({ ...inputsSignUp, is_admin: e.target.checked })} // Convert string value to boolean
              />
            </div>
            <button disabled={loading}>
              {loading ? <span className="loading loading-spinner"></span> : "Sign Up"}
            </button>
          </form>
        </div>

        <div className="form-container sign-in">
          <form onSubmit={handleSignIn}>
            <h1 className="text-xl font-bold">Login</h1>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="User name"
              value={inputsSignIn.username}
              onChange={(e) => setInputsSignIn({ ...inputsSignIn, username: e.target.value })}
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={inputsSignIn.password}
              onChange={(e) => setInputsSignIn({ ...inputsSignIn, password: e.target.value })}
            />
            <a
              className="inline-block align-baseline font-weight-400 text-sm text-gray-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
            <button disabled={loadingLogin}>
              {loadingLogin ? <span className="loading loading-spinner"></span> : "Sign In"}
            </button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle-wr">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button className="hd" id="login" onClick={handleAddClassActive}>
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>Register with your personal details to use all of site features</p>
              <button className="hd" id="register" onClick={handleAddClassActive}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
