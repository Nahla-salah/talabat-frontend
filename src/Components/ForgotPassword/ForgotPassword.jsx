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
    console.log("تم الضغط على زر الإرسال للإيميل:", email); 
    
    setLoading(true);
    setMessage('');
    setError('');

    try {
   
      const response = await fetch('https://talabat-nahla-api.runasp.net/Api/Authentication/Forgot-Password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }), 
      });

      console.log("Response Status:", response.status);

      if (response.ok) {
        setMessage('تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني بنجاح.');
        console.log("Success!");
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'عذراً، لم نتمكن من إيجاد هذا الحساب.');
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setError('فشل الاتصال بالسيرفر، تأكدي من تشغيل الـ Backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100">
        
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">استعادة الحساب</h2>
          <p className="mt-2 text-sm text-gray-500">
            أدخل بريدك الإلكتروني وسنرسل لك رابطاً لتعيين كلمة مرور جديدة
          </p>
        </div>

     
        {message && <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-xl text-center text-sm font-bold border border-green-100">{message}</div>}
        {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-xl text-center text-sm font-bold border border-red-100">{error}</div>}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">البريد الإلكتروني</label>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 group-focus-within:text-green-500 transition-colors">
                <FaEnvelope />
              </span>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all bg-gray-50/50"
                placeholder="name@example.com"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 rounded-2xl shadow-lg font-bold text-white bg-green-600 hover:bg-green-700 active:scale-[0.98] transition-all duration-200 disabled:opacity-50"
          >
            {loading ? 'جاري الإرسال...' : 'إرسال رابط الاستعادة'}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <Link to="/login" className="inline-flex items-center text-sm font-bold text-green-600 hover:text-green-500 transition-colors">
            <FaArrowLeft className="ml-2 text-xs" /> العودة لتسجيل الدخول
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;