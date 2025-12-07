import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-[#0B1120] text-gray-300 py-16 px-6">

      {/* Top Newsletter Box */}
      <div className="max-w-5xl mx-auto bg-[#0F162A] rounded-2xl shadow-xl border border-gray-800 p-8 flex flex-col lg:flex-row items-center justify-between gap-6 relative">

        {/* Glow Background */}
        <div className="absolute inset-0 rounded-2xl blur-2xl bg-gradient-to-r from-green-400/20 via-indigo-500/20 to-pink-500/20 -z-10"></div>

        <h2 className="text-2xl md:text-3xl font-semibold max-w-md leading-snug">
          Digital Life Lesson
        </h2>

        {/* Input + Button */}
        <div className="flex w-full lg:w-auto bg-white rounded-xl overflow-hidden shadow-sm">
          <input
            type="email"
            placeholder="Enter email address"
            className="px-4 py-3 text-gray-700 w-full outline-none"
          />
          <button className="bg-black text-white font-medium px-6 whitespace-nowrap">
            Subscribe
          </button>
        </div>
      </div>

      {/* Footer Links Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-10 mt-16">
        <div>
          <h3 className="font-semibold text-white mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>About</li>
            <li>Features</li>
            <li>Works</li>
            <li>Career</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-4">Help</h3>
          <ul className="space-y-2 text-sm">
            <li>Customer Support</li>
            <li>Delivery Details</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>Free eBooks</li>
            <li>Development Tutorial</li>
            <li>How‑to Blog</li>
            <li>YouTube Playlist</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-4">Links</h3>
          <ul className="space-y-2 text-sm">
            <li>Free eBooks</li>
            <li>Development Tutorial</li>
            <li>How‑to Blog</li>
            <li>YouTube Playlist</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
