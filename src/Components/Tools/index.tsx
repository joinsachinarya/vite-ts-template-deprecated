import React, { FC, PropsWithChildren } from "react";
type ToolsProps = PropsWithChildren;
const Tools: FC<ToolsProps> = (props) => {
  const { children } = props;
  return (
    <>
      <div className="flex justify-between items-center border-solid border-b-2 border-gray-300 w-full h-6 bg-gray-100 px-10 tools-container">
        {children}
        <div className="w-4 h-4 bg-gray-400"></div>
        <div className="w-4 h-4 bg-gray-400"></div>
      </div>
    </>
  );
};

export default Tools;
