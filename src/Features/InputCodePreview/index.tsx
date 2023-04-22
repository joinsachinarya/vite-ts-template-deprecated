import React, { useCallback, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import jsonInput from "../../assets/input.json";

const InputCodePreview = () => {
  const [inputData, setInputData] = useState("");
  const input = JSON.stringify(jsonInput);

  const onChange = useCallback((value: unknown, viewUpdate: unknown) => {
    setInputData(input);
    console.log("value:", value);
  }, []);

  return (
    <div className="relative top-1/2">
      <CodeMirror value={inputData} height="10rem" onChange={onChange} />
    </div>
  );
};
export default InputCodePreview;
