import React, { useState } from "react";

function Home() {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    // count = count + 1; //does not works because state are immutable , and component do not rerender if we change the state directly
    setCount(count + 1);
    console.log(count);
  };
  return (
    <div>
      {count}
      <button onClick={handleClick}>Update</button>
    </div>
  );
}

export default Home;
