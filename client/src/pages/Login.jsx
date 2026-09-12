import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/userApi";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { login } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();

    if(!email || !password) {
      setError("Please enter your email and password");
      return;
    }

    try {
      setError("");

      const data = await loginUser(email, password);
      login(data.token);
      
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">

        <h1 className="mb-2 text-center text-2xl font-bold text-gray-800">
          Login
        </h1>

        <p className="mb-6 text-center text-sm text-gray-500">
          Log in to continue managing your tasks
        </p>

        {error && <p className="mb-4 rounded-md bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>}

        <form 
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label 
            htmlFor="email"
            className="mb-1 block text-sm font-medium text-gray-700"
            >
              Email
            </label>

            <input 
              type="email" 
              id="email"
              name="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none transition
                focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label 
            htmlFor="password"
            className="mb-1 block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                id="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none transition
                focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full rounded-md bg-blue-600 py-2.5 font-medium text-white transition
            hover:bg-blue-700"
          >
            Log In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to={'/register'}
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login;