import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import LoginNavbar from '../components/LoginNavbar';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      const { data } = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (error) {
      setErr(error?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-200 via-white to-indigo-200">
      {/* Login Navbar */}
      <LoginNavbar />

      {/* Centered Login Card */}
      <div className="flex items-center justify-center mt-12">
        <div className="bg-white shadow-xl rounded-xl max-w-md w-full p-8 space-y-6">
          <h1 className="text-3xl font-extrabold text-indigo-600 text-center tracking-wide font-sans">Admin Login</h1>
          <p className="text-center text-gray-500">Enter your credentials to access the dashboard</p>

          <form className="space-y-5" onSubmit={onSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                placeholder="Enter Your Email"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                placeholder="Enter Your Password"
              />
            </div>

            {/* Error Message */}
            {err && <p className="text-sm text-red-600 text-center">{err}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg shadow hover:from-indigo-600 hover:to-purple-600 transition flex justify-center items-center"
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4l-3 3 3 3h-4z"></path>
                </svg>
              )}
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} LeadSphere
          </p>
        </div>
      </div>
    </div>
  );
}
