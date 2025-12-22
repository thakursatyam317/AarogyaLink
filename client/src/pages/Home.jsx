import React from "react";
import homeImg from "../assets/loginImg/homeImg.png";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <div>
        <div>
          <div className="mt-16">
            <img
              src={homeImg}
              alt="Aarogya Link Home"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
