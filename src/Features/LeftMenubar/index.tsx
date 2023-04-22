import React, { useState } from "react";
import { FC } from "react";

interface LeftMenubarProps {
  option?: string;
}

const LeftMenubar: FC<LeftMenubarProps> = (props) => {
  const { option } = props;
  const [openMenu, setOpenMenu] = useState({
    file: false,
    edit: false,
    mapping: false,
    view: false,
    open: false,
  });

  const toggleMenu = (menu: any) => {
    setOpenMenu((prevOpenMenu: any) => {
      const newMenuState: any = {};
      Object.keys(prevOpenMenu).forEach((key) => {
        newMenuState[key] = false;
      });
      if (menu === "open") {
        newMenuState[menu] = !prevOpenMenu[menu];
        newMenuState["file"] = true;
      } else {
        newMenuState[menu] = !prevOpenMenu[menu];
      }
      return newMenuState;
    });
  };

  return (
    <>
      <div className="flex bg-gray-100 h-12 p-3 w-full left-menubar-container">
        <div className="mr-4 z-10">
          <button onClick={() => toggleMenu("file")}>File</button>
          {openMenu.file && (
            <ul className=" bg-gray-50">
              <li>
                <button className="border-solid border-b-2 border-gray-200 w-full px-4">
                  New
                </button>
              </li>

              <li>
                <button
                  className="border-solid border-b-2 border-gray-200 w-full px-4"
                  onClick={() => toggleMenu("open")}
                >
                  Open
                  {openMenu.open && (
                    <ul className=" bg-gray-50">
                      <li>
                        <label className="flex cursor-pointer">
                          From Computer
                          <input
                            className="px-4 hidden"
                            type="file"
                            // onChange={handleFileChange}
                          />
                        </label>
                      </li>
                      <li>
                        <a
                          className=" px-4"
                          onClick={() => console.log("URI clicked")}
                        >
                          URI
                        </a>
                      </li>
                    </ul>
                  )}
                </button>
              </li>

              <li>
                <button className="border-solid border-b-2 border-gray-200 w-full px-4">
                  Export
                </button>
              </li>
            </ul>
          )}
        </div>

        <div className="mr-4 z-10">
          <button onClick={() => toggleMenu("edit")}>Edit</button>
          {openMenu.edit && (
            <ul className=" bg-gray-50">
              <li>
                <button className="border-solid border-b-2 border-gray-200 w-full px-4">
                  New Entity
                </button>
              </li>
              <li>
                <button className="border-solid border-b-2 border-gray-200 w-full px-4">
                  New Attribute
                </button>
              </li>
              <li>
                <button className="border-solid border-b-2 border-gray-200 w-full px-4">
                  Delete All
                </button>
              </li>
              <li>
                <button className="border-solid border-b-2 border-gray-200 w-full px-4">
                  Auto Save
                </button>
              </li>
              <li>
                <button className="border-solid border-b-2 border-gray-200 w-full px-4">
                  Save
                </button>
              </li>
            </ul>
          )}
        </div>

        <div className="mr-4 z-10">
          <button onClick={() => toggleMenu("mapping")}>Mapping</button>
          {openMenu.mapping && (
            <ul className=" bg-gray-50">
              <li>
                <button className="border-solid border-b-2 border-gray-200 w-full px-4">
                  Run
                </button>
              </li>
              <li>
                <button className="border-solid border-b-2 border-gray-200 w-full px-4">
                  Namespaces
                </button>
              </li>
              <li>
                <button className="border-solid border-b-2 border-gray-200 w-full px-4">
                  Generate from example
                </button>
              </li>
              <li>
                <button className="border-solid border-b-2 border-gray-200 w-full px-4">
                  Generate from ontology
                </button>
              </li>
            </ul>
          )}
        </div>

        <div className="mr-4 z-10">
          <button onClick={() => toggleMenu("view")}>View</button>
          {openMenu.view && (
            <ul className=" bg-gray-50">
              <li>
                <button className="border-solid border-b-2 border-gray-200 w-full px-4">
                  Show Input
                </button>
              </li>
              <li>
                <button className="border-solid border-b-2 border-gray-200 w-full px-4">
                  Show Modeling Panel
                </button>
              </li>
              <li>
                <button className="border-solid border-b-2 border-gray-200 w-full px-4">
                  Show Result
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default LeftMenubar;
