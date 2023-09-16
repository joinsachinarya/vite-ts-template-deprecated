import { useState } from "react";

const Square = () => {
  const [sign, setSign] = useState("");
  const handleClick = () => {
    setSign("X");
  };
  return (
    <button className="box" onClick={handleClick}>
      {sign}1
    </button>
  );
};
export default Square;
