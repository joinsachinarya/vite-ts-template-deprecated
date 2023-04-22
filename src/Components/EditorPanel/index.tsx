import React, { FC } from "react";
import Tools from "../Tools";
import Nodes from "../../Features/Nodes";

interface EditorPanelProps {
  // isToggle: boolean | undefined;
  // isFileSelected: boolean | undefined;
}

const EditorPanel: FC<EditorPanelProps> = (props) => {
  return (
    <>
      <div className="flex flex-col w-1/2 h-screen border-solid border-y-2 border-gray-300  editor-panel-container">
        <Tools />
        <Nodes /* isToggle={isToggle} */ /*  isFileSelected={isFileSelected}  */
        />
      </div>
    </>
  );
};

export default EditorPanel;
