import React, { useContext, useState } from "react";
import Tools from "../Tools";
import { Home } from "../../Screens/Home/withHomeViewModel";
import { parseJsonLd } from "@comake/rmlmapper-js";
import * as jsonld from "jsonld";

const OutputPanel = () => {
  const { nodes, data } = useContext(Home);
  const [res, setRes] = useState<string | jsonld.NodeObject[]>();
  return (
    <>
      <div className="flex w-1/4 h-screen border-solid border-t-2 border-l-2 border-gray-300 bg-gray-100 output-panel-container justify-start flex-col items-start">
        <Tools />
        <div className="px-2 py-4">
          <button
            onClick={async () => {
              const graph = nodes.map((item) => item.data); //as jsonld.NodeObject;
              console.log({ graph });
              navigator.clipboard.writeText(JSON.stringify(graph));
              const res = await parseJsonLd({ "@graph": graph }, data, {
                replace: true,
              });
              setRes(res);
            }}
          >
            Generate Res
          </button>
          {res && <div>{JSON.stringify(res)}</div>}
        </div>
      </div>
    </>
  );
};

export default OutputPanel;
