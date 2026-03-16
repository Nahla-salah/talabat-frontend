import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FaLock, FaCheckCircle } from 'react-icons/fa';

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Extracting Email and Token from the URL automatically
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://talabat-nahla-api.runasp.net/Api/Authentication/Reset-Password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          token: token,
          newPassword: newPassword
        }),
      });

      if (response.ok) {
        alert("Password updated successfully! Redirecting to login...");
        navigate('/login');
      } else {
        setError("Failed to reset password. The link might be expired.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Set New Password</h2>
          <p className="mt-2 text-sm text-gray-500 italic">Resetting for: {email}</p>
        </div>

        {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-xl text-center text-sm font-bold border border-red-100">{error}</div>}

        <form className="space-y-6" onSubmit={handleReset}>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 group-focus-within:text-green-500 transition-colors">
                <FaLock />
              </span>
              <input 
                type="password" required minLength="6"
                onChange={(e) => setNewPassword(e.target.value)}
                className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all bg-gray-50/50"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full py-4 rounded-2xl shadow-lg font-bold text-white bg-green-600 hover:bg-green-700 active:scale-[0.98] transition-all disabled:opacity-50">
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;