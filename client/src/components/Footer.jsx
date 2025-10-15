import React from "react";
import { UserRound, Folder, Languages, Stethoscope } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-blue-500 text-white mt-16">
      <div className="max-w-7xl mx-auto py-10 px-6 md:px-12 flex flex-col md:flex-row justify-between">
        
        {/* Branding */}
        <div className="mb-6 md:mb-0">
          <h1 className="text-2xl font-bold text-amber-100">
            Aarogya <span className="text-amber-200">Link</span>
          </h1>
          <p className="text-sm mt-2 text-amber-100/80">
            Your trusted healthcare partner.
          </p>
        </div>

        {/* Quick Links */}
        <div className="mb-6 md:mb-0">
          <h2 className="font-semibold text-lg mb-3">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-amber-200 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/doctorlist" className="hover:text-amber-200 transition">
                Doctors
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-amber-200 transition">
                Contact
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-amber-200 transition">
                About
              </a>
            </li>
          </ul>
        </div>

        {/* Services / Icons */}
        <div>
          <h2 className="font-semibold text-lg mb-3">Services</h2>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 hover:text-amber-200 transition">
              <Stethoscope className="w-5 h-5" /> Prescription
            </li>
            <li className="flex items-center gap-2 hover:text-amber-200 transition">
              <Folder className="w-5 h-5" /> EMR
            </li>
            <li className="flex items-center gap-2 hover:text-amber-200 transition">
              <Languages className="w-5 h-5" /> Language Support
            </li>
            <li className="flex items-center gap-2 hover:text-amber-200 transition">
              <UserRound className="w-5 h-5" /> Profile Management
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-blue-400 py-4 text-center text-sm text-amber-100/70">
        &copy; {new Date().getFullYear()} Aarogya Link. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
