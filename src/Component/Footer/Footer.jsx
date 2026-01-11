import React from "react";
import { FaLinkedin, FaGithub, FaFacebook, FaEnvelope, FaPhone } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* About Us */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">About Us</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Digital Life Lesson is dedicated to providing high-quality life lessons and personal development resources to help you grow and succeed.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Contact</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="flex items-center gap-2 hover:text-white transition cursor-pointer">
              <FaEnvelope /> rakibhasan.dev1@gmail.com
            </li>
            <li className="flex items-center gap-2 hover:text-white transition cursor-pointer">
              <FaPhone /> +880 1234 567890
            </li>
            <li className="text-gray-400 text-sm mt-2">Dhaka, Bangladesh</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 flex flex-col text-gray-400 text-sm">
            <Link to="/" className="hover:text-purple-400 transition cursor-pointer">Home</Link>
            <Link to="/public" className="hover:text-purple-400 transition cursor-pointer">Public Lessons</Link>
            <Link to="/dashboard" className="hover:text-purple-400 transition cursor-pointer">Dashboard</Link>
            <Link to="/upgrade" className="hover:text-purple-400 transition cursor-pointer">Upgrade</Link>
          </ul>
        </div>

        {/* Social / Resources */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Follow Us</h3>
          <div className="flex items-center gap-4 mb-4">
            <a
              href="https://www.linkedin.com/in/rakibul-hasan-rakib-dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition transform hover:scale-110"
            >
              <FaLinkedin className="w-6 h-6" />
            </a>
            <a
              href="https://github.com/Rakibstack"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition transform hover:scale-110"
            >
              <FaGithub className="w-6 h-6" />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition transform hover:scale-110"
            >
              <FaFacebook className="w-6 h-6" />
            </a>
          </div>
          <p className="text-gray-500 text-sm mt-2">
            &copy; {new Date().getFullYear()} Digital Life Lesson. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
