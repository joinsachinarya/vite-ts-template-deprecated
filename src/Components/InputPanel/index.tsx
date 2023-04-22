import React, { FC, MouseEvent, useContext, useRef, useState } from "react";
import Tools from "../Tools";
import InputCodePreview from "../../Features/InputCodePreview";
import InputDataTable from "../../Features/InputDataTable";
import { Home } from "../../Screens/Home/withHomeViewModel";
import Menu from "../Menu";

interface InputPanelProps {
  // setIsToggle: () => void;
  // data: Record<string, string>;
  // setData: (data: Record<string, string>) => void;
}

const InputPanel: FC<InputPanelProps> = () => {
  // TODO: When file is opened, load the content of the file and set the content as value of a new key in data.
  // TODO: Allow removing items from data in <InputDataTable /> .
  const { data, setNodes, nodes } = useContext(Home);
  const [menuAnchor, setMenuAnchor] = useState<HTMLButtonElement | null>(null);

  // const { setIsToggle } = props;

  //  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //    const files = event.target.files;
  //    if (files && files.length > 0) {
  //      const reader = new FileReader();
  //      reader.onload = (e) => {
  //        const content = e.target?.result as string;
  //        const parsed = JSON.parse(content);
  //        setData(()=>parsed);
  //      };
  //      reader.readAsText(files[0]);
  //    }
  //  };

  const onCreateNewNode = (e: MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(menuAnchor ? null : e.currentTarget);
  };

  const onSelectSource = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (target.dataset.value) {
      const newNode = {
        id: `node-${nodes.length + 1}`,
        type: "custom",
        position: { x: 0, y: Number(`${nodes.length * 50}`) },
        data: {
          ...createJSONLogicalSource(JSON.parse(target.dataset.value ?? "")),
        },
      };
      setMenuAnchor(null);
      setNodes((curr: any[]) => {
        return [...curr, newNode];
      });
    }
  };
  const buttonRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <div className="flex flex-col w-1/4 h-screen border-solid border-t-2 border-r-2 border-gray-300 bg-gray-100  input-panel-container">
        <Tools />
        {Object.keys(data).map((key) => (
          <div key={key}>
            <h6>{key}</h6>
            <InputDataTable
              // setIsToggle={setIsToggle}
              data={JSON.parse(data[key as keyof typeof data])}
            />
          </div>
        ))}
        <button className="border p-2" onClick={onCreateNewNode}>
          Create new node
        </button>
        {menuAnchor && (
          <Menu anchor={menuAnchor} open={!!menuAnchor}>
            {Object.keys(data).map((key) => (
              <div
                className="cursor-pointer border-b border-b-black px-1 py-2"
                key={key}
                onClick={onSelectSource}
                data-value={JSON.stringify(key)}
              >
                <h6>{key}</h6>
              </div>
            ))}
          </Menu>
        )}
        <InputCodePreview />
      </div>
    </>
  );
};

export default InputPanel;

const createJSONLogicalSource = (sourceName: string) => {
  return {
    "@id": `#${sourceName.split(".")[0]}`,
    "http://semweb.mmlab.be/ns/rml#logicalSource": [
      {
        "http://semweb.mmlab.be/ns/rml#iterator": [
          {
            "@value": "$",
          },
        ],
        "http://semweb.mmlab.be/ns/rml#referenceFormulation": [
          {
            "@id": "http://semweb.mmlab.be/ns/ql#JSONPath",
          },
        ],
        "http://semweb.mmlab.be/ns/rml#source": [
          {
            "@value": sourceName,
          },
        ],
      },
    ],
  };
};
