import { useState } from "react";
import { registerUser } from "../api/userApi";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      setError("");

      const data = await registerUser(formData);

      login(data.token);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <h1 className="mb-2 text-center text-2xl font-bold text-gray-800">
          Create an Account
        </h1>

        <p className="mb-6 text-center text-sm text-gray-500">
          Sign up to start managing tasks
        </p>

        {error && (
          <p className="mb-4 text-sm text-red-500">
            {error}
          </p>
        )}

        <form 
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label 
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Name
            </label>

            <input 
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value})}
              className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none transition
                focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

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
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value})}
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

            <input 
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value})}
              className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none transition
                focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-2.5 font-medium text-white transition 
              hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register;