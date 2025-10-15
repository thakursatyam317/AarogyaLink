import React from "react";


const About = () => {
  return (
    <div className="flex justify-center bg-blue-50 h-[830px]">
      <div className="h-[80%] w-[60%] mt-28 bg-white pt-12 px-6 md:px-12 rounded-2xl shadow-[0_0_25px_rgba(59,130,246,0.25)]">
      {/* Header */}
      <div className="text-center mb-12 ">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">
          About <span className="text-amber-600">Aarogya Link</span>
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Aarogya Link is your trusted healthcare partner. We provide easy access
          to medical services, doctors, and patient records in a simple and
          user-friendly platform. Our mission is to ensure healthcare is
          accessible to everyone, anytime, anywhere.
        </p>
      </div>

      {/* Image + Content */}
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
        <div className="md:w-1/2">
         
        </div>
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-2xl font-semibold text-blue-700">
            Our Mission
          </h2>
          <p className="text-gray-700">
            We aim to simplify healthcare for patients and doctors by providing
            an integrated platform to manage appointments, prescriptions,
            electronic medical records (EMR), and more.
          </p>

          <h2 className="text-2xl font-semibold text-blue-700">
            Why Choose Us
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Easy-to-use platform for patients and doctors.</li>
            <li>Secure storage of medical records.</li>
            <li>Access to verified healthcare professionals.</li>
            <li>Multi-language support for accessibility.</li>
          </ul>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center">
        <a
          href="/register"
          className="inline-block mb-6 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Get Started
        </a>
      </div>
    </div>
    </div>
  );
};

export default About;
