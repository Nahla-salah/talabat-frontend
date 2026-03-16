import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      // Sending Email as a Query String to match your Backend Controller
      const response = await fetch(`https://talabat-nahla-api.runasp.net/Api/Authentication/Forgot-Password?Email=${encodeURIComponent(email)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('A reset link has been generated. Please check the console for your link!');
        // This is the link that contains the Email and Token
        console.log("Reset URL:", data.callbackUrl);
      } else {
        setError('Email address not found.');
      }
    } catch (err) {
      setError('Connection failed. Please check your internet or server status.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900">Forgot Password</h2>
          <p className="mt-2 text-sm text-gray-500">Enter your email to receive a password reset link.</p>
        </div>

        {message && <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-xl text-center text-sm font-bold border border-green-100">{message}</div>}
        {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-xl text-center text-sm font-bold border border-red-100">{error}</div>}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 group-focus-within:text-green-500 transition-colors">
                <FaEnvelope />
              </span>
              <input 
                type="email" required value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all bg-gray-50/50"
                placeholder="name@example.com"
              />
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full py-4 rounded-2xl shadow-lg font-bold text-white bg-green-600 hover:bg-green-700 transition-all disabled:opacity-50">
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <Link to="/login" className="inline-flex items-center text-sm font-bold text-green-600 hover:text-green-500">
             Back to Login <FaArrowLeft className="ml-2 text-xs" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;