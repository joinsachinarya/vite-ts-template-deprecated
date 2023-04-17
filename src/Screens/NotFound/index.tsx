import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center h-screen bg-gray-300 text-gray-100 404-page-container">
      <h2 className="font-extrabold text-9xl text-gray-600 my-16">
        404 Error!
      </h2>
      <p className="text-2xl font-semibold md:text-3xl">
        Oops! We can&apos;t find that page.
      </p>

      <button
        onClick={() => {
          navigate("/");
        }}
        className="px-8 py-3 font-semibold rounded bg-violet-400 text-gray-800 my-16"
      >
        Back to Homepage
      </button>
    </div>
  );
};

export default NotFound;
