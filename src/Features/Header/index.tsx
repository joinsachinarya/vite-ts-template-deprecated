import React from "react";
import { type FC } from "react";
import LeftMenubar from "../LeftMenubar";
import RightMenubar from "../RightMenubar";
import LogoHeader from "../../Components/LogoHeader";

interface HeaderProps {
  isLeftMenubar?: boolean;
  isRightMenubar?: boolean;
}

const Header: FC<HeaderProps> = (props) => {
  const { isLeftMenubar = true, isRightMenubar = true } = props;

  return (
    <div className="flex h-12 justify-between page-template-container">
      {isLeftMenubar ? <LeftMenubar /> : null}

      <LogoHeader />

      {isRightMenubar ? <RightMenubar /> : null}
    </div>
  );
};

export default Header;
