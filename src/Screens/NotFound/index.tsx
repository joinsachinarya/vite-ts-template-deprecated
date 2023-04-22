import React from "react";
import { useNavigate } from "react-router-dom";
import LogoHeader from "../../Components/LogoHeader";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <LogoHeader>
      <div className="flex flex-col items-center h-screen bg-gray-300 text-gray-100 404-page-container">
        <h2 className="font-extrabold text-9xl text-gray-600 mb-16">
          {`Error 404 :(`}
        </h2>
        <p className="text-2xl font-semibold md:text-3xl mb-16">
          Oops! We can&apos;t find that page.
        </p>

        <a
          rel=""
          onClick={() => {
            navigate("/");
          }}
          className="px-8 py-3 font-semibold rounded bg-violet-400 text-gray-900 cursor-pointer"
        >
          Back to homepage
        </a>
      </div>
    </LogoHeader>
  );
};

export default NotFound;
