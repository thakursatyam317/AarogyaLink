import React from "react";
import homeImg from "../assets/loginImg/homeImg.png";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <div>
        <div>
          <div className="mt-16">
            <img src={homeImg} alt="" />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
