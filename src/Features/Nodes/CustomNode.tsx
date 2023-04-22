import React, { MouseEvent, useContext, useMemo, useState } from "react";
import { Handle, Position, Node } from "reactflow";
import { Home } from "../../Screens/Home/withHomeViewModel";
import { get } from "lodash";
import Menu from "../../Components/Menu";
import {
  getKeyFromData,
  createPredicateObjectMapForAttribute,
  addPredicateObjectMap,
  addSubjectMapToData,
  createSubjectMap,
  getSubjectMap,
  getNameForSubjectMap,
  getNameFromPredicateObjectMap,
} from "./nodeUtils";

const handleStyleSrc = { backgroundColor: "blue" };
const handleStyleTgt = { backgroundColor: "black" };

// Assumption is that this node will be used only for Objects and not their properties.

const CustomNode = (
  data: Record<string, any>,
  isConnectable: boolean | undefined
) => {
  // console.log({ data });

  const [addPropertyButton, setAddPropertyButton] =
    useState<HTMLButtonElement | null>(null);
  const [addSubjectMapButton, setAddSubjectMapButton] =
    useState<HTMLButtonElement | null>(null);

  const { data: originalData, setNodes } = useContext(Home);

  const { options, key } = useMemo(() => {
    const key = getKeyFromData(data as Record<string, string>);
    let obj: Record<string, any> = {};
    if (key) obj = JSON.parse(originalData[key as keyof typeof originalData]);
    return { options: Object.keys(obj), key };
  }, []);

  const handleAddPropertyButton = (e: MouseEvent<HTMLButtonElement>) => {
    setAddPropertyButton(addPropertyButton ? null : e.currentTarget);
  };
  const handleSubjectMapButton = (e: MouseEvent<HTMLButtonElement>) => {
    setAddSubjectMapButton(addSubjectMapButton ? null : e.currentTarget);
    // setIsAddSubjectMapMenuOpen(!isAddSubjectMapMenuOpen);
  };

  const addProperty = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;

    const value = JSON.parse(target.dataset.value ?? "");
    if (value) {
      setNodes((curr) => {
        const newNodes = curr.map((item) => {
          // console.log({
          //   keyFromData: getKeyFromData(item as Record<string, any>),
          //   key,
          //   data: item.data,
          // });
          if (getKeyFromData(item as Record<string, any>) === key) {
            const pom = createPredicateObjectMapForAttribute(value);
            // console.log({ pom });
            const newItem = addPredicateObjectMap(
              item as Record<string, any>,
              pom
            ) as Node<any>;
            return newItem;
          }
          return item;
        });
        return newNodes;
      });
    }
    setAddPropertyButton(null);
  };

  const updateSubjectMap = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;

    const value = JSON.parse(target.dataset.value ?? "");
    console.log({ value });
    if (value) {
      setNodes((curr) => {
        const newNodes = curr.map((item) => {
          if (getKeyFromData(item as Record<string, any>) === key) {
            const newItem = addSubjectMapToData(
              item,
              createSubjectMap(value)
            ) as Node<any>;
            return newItem;
          }
          return item;
        });
        return newNodes;
      });
    }
    // setIsAddSubjectMapMenuOpen(false);
    setAddSubjectMapButton(null);
  };
  const removeNode = () => {
    setNodes((curr) => curr.filter((node) => node.id !== data.id));
  };

  const subjectMap = getSubjectMap(data as Record<string, any>);

  return (
    <>
      <div
        className={`border relative rounded px-2 bg-gray-200 ${
          subjectMap ? "" : "border-red-600"
        }`}
      >
        <button
          className="absolute rounded-full flex justify-center text-center items-center text-red-600 h-[16px] w-[16px] right-2 top-1"
          onClick={removeNode}
        >
          &times;
        </button>

        <div className="flex flex-col justify-start items-start">
          {getKeyFromData(data as Record<string, any>)}
          {subjectMap && (
            <div>SubjectMap: {getNameForSubjectMap(subjectMap)}</div>
          )}

          {/* <label htmlFor="text" className="opacity-60">
          Label:
          </label>
          <input
          id="text"
          name="text"
          onChange={onChange}
          className=""
          onClick={onClick}
        /> */}
          {get(
            data as Record<string, any>,
            `data["http://www.w3.org/ns/r2rml#predicateObjectMap"]`
          )?.map((mapItem: any, index: number) => {
            return (
              <span key={index}>{getNameFromPredicateObjectMap(mapItem)}</span>
            );
          })}
        </div>
        <div className="relative w-fit">
          <button onClick={handleSubjectMapButton}>
            {subjectMap ? "Change subject map" : "Add subject map"}
          </button>
          {addSubjectMapButton && (
            <Menu
              disableAnchorBasedPositioning
              anchor={addSubjectMapButton}
              open={!!addSubjectMapButton}
            >
              {["event", "person"].map((item) => {
                return (
                  <div
                    className="cursor-pointer border-b border-b-black px-1 py-2"
                    key={item}
                    data-value={JSON.stringify(item)}
                    onClick={updateSubjectMap}
                  >
                    {item}
                  </div>
                );
              })}
            </Menu>
          )}
        </div>
        <br />
        <div className="relative w-fit mx-auto">
          <button onClick={handleAddPropertyButton}>+</button>
          {addPropertyButton && (
            <Menu
              disableAnchorBasedPositioning
              anchor={addPropertyButton}
              open={!!addPropertyButton}
            >
              {options.map((item) => {
                return (
                  <div
                    className="cursor-pointer border-b border-b-black px-1 py-2"
                    key={item}
                    data-value={JSON.stringify(item)}
                    onClick={addProperty}
                  >
                    {item}
                  </div>
                );
              })}
            </Menu>
          )}
        </div>
        <Handle
          type="target"
          position={Position.Top}
          isConnectable={isConnectable}
          style={handleStyleTgt}
        />

        <Handle
          type="source"
          position={Position.Bottom}
          id="a"
          style={handleStyleSrc}
          isConnectable={isConnectable}
        />
      </div>
    </>
  );
};

export default CustomNode;
