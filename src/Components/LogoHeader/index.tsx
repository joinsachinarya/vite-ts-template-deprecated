import React, { FC, PropsWithChildren } from "react";
import Logo from "./../../assets/Comake-logo.png";
type LogoHeaderProps = PropsWithChildren;
const LogoHeader: FC<LogoHeaderProps> = (props) => {
  const { children } = props;
  const handleClick = () => {
    window.location.href = "/";
  };
  return (
    <>
      <div className="w-full h-12 bg-gray-100 logo-header-container flex justify-center items-center">
        <button
          className="flex justify-center items-center"
          onClick={handleClick}
        >
          <img
            src={Logo}
            alt="logoHeader"
            className="rounded mr-2 inline h-6 w-6"
          />
          <span>{"Comake"}</span>
        </button>
      </div>
      {children}
    </>
  );
};

export default LogoHeader;
