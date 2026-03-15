import React, { useContext, useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { FaEnvelope, FaLock } from 'react-icons/fa';
import axios from 'axios';
import { useFormik } from 'formik'; 
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);


  const validYup = Yup.object().shape({
    Email: Yup.string().email("تنسيق البريد الإلكتروني غير صحيح").required("البريد الإلكتروني مطلوب"),
    Password: Yup.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل").required("كلمة المرور مطلوبة")
  });


  async function signin(values, { resetForm }) {
    setLoading(true);
    try {
    
      const { data } = await axios.post('/Api/Authentication/Login/', values);
      
   
      localStorage.setItem("Token", data.token);
      

      localStorage.setItem("UserEmail", data.email || data.userEmail);
      

      setToken(data.token);
   
      toast.success("تم تسجيل الدخول بنجاح!");
      

      resetForm(); 
      
      setLoading(false);
      navigate('/'); 
    } catch (e) {
      const errorMsg = e.response?.data?.message || "فشل تسجيل الدخول، يرجى المحاولة مرة أخرى.";
      toast.error(errorMsg);
      setLoading(false);
    }
  }


  const formik = useFormik({
    initialValues: {
      Email: "",
      Password: "",
    },
    onSubmit: signin,
    validationSchema: validYup
  });

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
             <FaLock className="text-2xl text-green-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Login</h2>
        </div>

        <form className="space-y-6" onSubmit={formik.handleSubmit}>
        

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 group-focus-within:text-green-500 transition-colors">
                <FaEnvelope />
              </span>
              <input 
                name="Email"
                type="email" 
                value={formik.values.Email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all"
                placeholder="name@example.com"
              />
            </div>
            {formik.touched.Email && formik.errors.Email && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.Email}</p>
            )}
          </div>


          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <Link to="/forgot-password" size="xs" className="text-xs font-bold text-green-600">
              Forgot Password?
              </Link>
            </div>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 group-focus-within:text-green-500 transition-colors">
                <FaLock />
              </span>
              <input 
                name="Password"
                type="password" 
                value={formik.values.Password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
            {formik.touched.Password && formik.errors.Password && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.Password}</p>
            )}
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-lg text-base font-bold text-white bg-green-600 hover:bg-green-700 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>

        <div className="mt-10 text-center border-t border-gray-100 pt-6 text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-bold text-green-600 hover:text-green-500 transition-colors">
            Create New Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;