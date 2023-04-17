import React, { FC, PropsWithChildren } from "react";

interface HomeProps extends PropsWithChildren {
  className?: string;
}

const Home: FC<HomeProps> = () => {
  return (
    <div>
      <h1 className="flex justify-center">Think! Code! Commit!</h1>
    </div>
  );
};

export default Home;
