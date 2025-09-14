import React from "react";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <button className="fixed right-4 bottom-4 bg-teal-500 text-white text-2xl font-bold p-4 rounded-full cursor-pointer">
        +
      </button>
    </div>
  );
};

export default Home;
