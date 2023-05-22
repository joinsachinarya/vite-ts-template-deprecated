import React from "react";

function Home() {
  return (
    <>
      <div className="bordered rounded bg-slate-200 w-2/3 h-2/3 flex justify-center items-center">
        <div className="">
          <div className="w-1/3 h-1/3 flex justify-center items-center">
            {"Next Player | Winner"}
          </div>
          <div className="w-1/3 h-1/3 flex justify-center items-center border-black"></div>
        </div>
        <div className="">{"Moves"}</div>
      </div>
    </>
  );
}

export default Home;
