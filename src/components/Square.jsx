import { useState } from "react";

const Square = () => {
  const [value, setValue] = useState("");
  const [clickCount, setClickCount] = useState(0);
  const handleClick = () => {
    setClickCount(clickCount++);
    console.log(clickCount);
    // if (clickCount % 2 === 0) {
    //   setValue("❌");
    //   setClickCount(() => {
    //     clickCount = clickCount + 1;
    //   });
    // } else {
    //   setValue("⭕");
    //   setClickCount(() => {
    //     clickCount = clickCount + 1;
    //   });
    // }
  };
  return (
    <button className="box" onClick={handleClick}>
      {value}
    </button>
  );
};

export default Square;
