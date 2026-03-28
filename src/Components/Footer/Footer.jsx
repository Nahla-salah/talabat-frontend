import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 border-t-4 border-green-600">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-green-500 text-3xl">●</span> Talabat
            </h2>
            <p className="text-sm leading-relaxed">
              The fastest way to order food in the region. We connect you with hundreds of restaurants with a single click. Quality, speed, and safety.
            </p>
            <div className="flex gap-4 text-xl">
              <a href="#" className="hover:text-green-500 transition-colors"><FaFacebook /></a>
              <a href="#" className="hover:text-green-500 transition-colors"><FaInstagram /></a>
              <a href="#" className="hover:text-green-500 transition-colors"><FaTwitter /></a>
              <a href="#" className="hover:text-green-500 transition-colors"><FaLinkedin /></a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-green-500 transition-colors">Home</Link></li>
              <li><Link to="/brands" className="hover:text-green-500 transition-colors">Popular Brands</Link></li>
              <li><Link to="/categories" className="hover:text-green-500 transition-colors">Categories</Link></li>
              <li><Link to="/cart" className="hover:text-green-500 transition-colors">Shopping Cart</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Support & Help</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-green-500 transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Terms of Use</a></li>
              <li><Link to="/contact" className="hover:text-green-500 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-green-500" /> +20 123 456 789
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-green-500" /> support@talabat.com
              </li>
              <li className="mt-4">
                <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Download App</p>
                <div className="flex gap-2 mt-2">
                   <div className="bg-gray-800 p-2 rounded border border-gray-700 text-[10px] text-center w-full cursor-pointer hover:bg-gray-700 transition">Google Play</div>
                   <div className="bg-gray-800 p-2 rounded border border-gray-700 text-[10px] text-center w-full cursor-pointer hover:bg-gray-700 transition">App Store</div>
                </div>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Talabat Clone. All rights reserved. Made with love 💚</p>
          <div className="mt-2">
            <Link className="text-green-500 px-2 font-bold hover:text-green-400 transition" to="https://github.com/Nahla-salah">Nahla Salah</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;