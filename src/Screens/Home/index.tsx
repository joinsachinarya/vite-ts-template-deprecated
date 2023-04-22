import React, { FC, useState } from "react";
import EditorPanel from "../../Components/EditorPanel";
import InputPanel from "../../Components/InputPanel";
import OutputPanel from "../../Components/OutputPanel";
import PageTemplate from "../../Features/PageTemplate";
import HomeViewModel, { HomeViewModelState } from "./withHomeViewModel";
import withViewModel from "../../Core/withViewModel";

interface HomeProps extends HomeViewModelState {}

const Home: FC<HomeProps> = ({ data, setData, nodes, setNodes }) => {
  // const [isToggle, setIsToggle] = useState<boolean | undefined>(undefined);

  return (
    <>
      <PageTemplate>
        <div className="flex flex-col homepage-container">
          <div className="flex">
            <InputPanel
              // data={data}
              // setData={setData}
              // // setIsToggle={handleSetToggle}
              // setIsFileSelected={handleSetToggle}
            />
            <EditorPanel /* isFileSelected={isFileSelected} */
            /* isToggle={isToggle} */
            />
            <OutputPanel />
          </div>
        </div>
      </PageTemplate>
    </>
  );
};

export default withViewModel(Home, new HomeViewModel());
