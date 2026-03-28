import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaIdCard } from 'react-icons/fa';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const validYup = Yup.object().shape({
    UserName: Yup.string().required("User Name is required"),
    DisplayName: Yup.string().required("Display Name is required"),
    Email: Yup.string().email("Invalid email format").required("Email is required"),
    Password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    PhoneNumber: Yup.string().matches(/^[0-9]{11}$/, "Phone number must be 11 digits").required("Phone number is required")
  });

  async function signup(values, { resetForm }) {
    setLoading(true);
    try {
  
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const { data } = await axios.post(`${baseUrl}Authentication/Register`, values);
      
      toast.success("Registration successful!");
      localStorage.setItem("Token", data.token);
      resetForm();
      setLoading(false);
      navigate('/login');
    } catch (e) {
      console.log("Full Error Response:", e.response?.data);
      const errorMsg = e.response?.data?.errorMessage || "Registration failed. Please try again.";
      toast.error(errorMsg);
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      UserName: "",
      DisplayName: "",
      Email: "",
      Password: "",
      PhoneNumber: ""
    },
    onSubmit: signup,
    validationSchema: validYup
  });

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
        
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900">Register</h2>
          <p className="mt-2 text-sm text-gray-600">
            Join us and enjoy the best food around you
          </p>
        </div>

        <form className="space-y-5" onSubmit={formik.handleSubmit}>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">User Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <FaIdCard />
              </span>
              <input 
                name="UserName"
                value={formik.values.UserName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text" 
                className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 outline-none transition shadow-sm ${formik.touched.UserName && formik.errors.UserName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-green-500'}`}
                placeholder="Username"
              />
            </div>
            {formik.touched.UserName && formik.errors.UserName && <p className="text-red-500 text-xs mt-1">{formik.errors.UserName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <FaUser />
              </span>
              <input 
                name="DisplayName"
                value={formik.values.DisplayName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text" 
                className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 outline-none transition shadow-sm ${formik.touched.DisplayName && formik.errors.DisplayName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-green-500'}`}
                placeholder="Your Full Name"
              />
            </div>
            {formik.touched.DisplayName && formik.errors.DisplayName && <p className="text-red-500 text-xs mt-1">{formik.errors.DisplayName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <FaEnvelope />
              </span>
              <input 
                name="Email"
                value={formik.values.Email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="email" 
                className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 outline-none transition shadow-sm ${formik.touched.Email && formik.errors.Email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-green-500'}`}
                placeholder="example@mail.com"
              />
            </div>
            {formik.touched.Email && formik.errors.Email && <p className="text-red-500 text-xs mt-1">{formik.errors.Email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <FaPhone />
              </span>
              <input 
                name="PhoneNumber"
                value={formik.values.PhoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="tel" 
                className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 outline-none transition shadow-sm ${formik.touched.PhoneNumber && formik.errors.PhoneNumber ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-green-500'}`}
                placeholder="01xxxxxxxxx"
              />
            </div>
            {formik.touched.PhoneNumber && formik.errors.PhoneNumber && <p className="text-red-500 text-xs mt-1">{formik.errors.PhoneNumber}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <FaLock />
              </span>
              <input 
                name="Password"
                value={formik.values.Password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="password" 
                className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 outline-none transition shadow-sm ${formik.touched.Password && formik.errors.Password ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-green-500'}`}
                placeholder="••••••••"
              />
            </div>
            {formik.touched.Password && formik.errors.Password && <p className="text-red-500 text-xs mt-1">{formik.errors.Password}</p>}
          </div>

          <div>
            <button 
              disabled={loading}
              type="submit" 
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 disabled:bg-gray-400"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-green-600 hover:text-green-500 transition">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;