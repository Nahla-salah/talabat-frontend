import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaHeadset } from 'react-icons/fa';

export function Contact() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Do you have any questions about your order? Or are you facing a technical issue? Our customer support team is available 24/7 to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-green-600 flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-full text-green-600 text-xl">
                <FaHeadset />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Technical Support</h3>
                <p className="text-gray-500 text-sm">Available 24/7 for your inquiries</p>
                <p className="text-green-600 font-semibold mt-1">19500</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-green-600 flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-full text-green-600 text-xl">
                <FaEnvelope />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Email Address</h3>
                <p className="text-gray-500 text-sm">Response within 24 hours</p>
                <p className="text-green-600 font-semibold mt-1">help@talabat.com</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-green-600 flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-full text-green-600 text-xl">
                <FaMapMarkerAlt />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Main Headquarters</h3>
                <p className="text-gray-500 text-sm">Beni-Suef, Egypt</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Message Us</h2>
            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition" placeholder="Your Name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition" placeholder="name@example.com" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition appearance-none">
                  <option>Issue with Current Order</option>
                  <option>Enquiry about Refund</option>
                  <option>Suggestion for Service Improvement</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                <textarea rows="4" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition" placeholder="Write your inquiry details here..."></textarea>
              </div>

              <button type="submit" className="w-full bg-green-600 text-white font-bold py-4 rounded-xl hover:bg-green-700 transition shadow-lg shadow-green-200">
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Contact;