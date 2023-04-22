import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import ReactFlow, {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "./CustomNode";
import { Home } from "../../Screens/Home/withHomeViewModel";
import * as RmlParser from "@comake/rmlmapper-js";
import {
  addPredicateObjectMap,
  createPredicateObjectMapForRelation,
  getPredicateObjectMap,
  hasRelationPOM,
} from "./nodeUtils";
import { get } from "lodash";

interface NodesProps {
  // isToggle: boolean | undefined;
  // isFileSelected: boolean | undefined;
}

const initialNodes: any[] = [];
const initialEdges: any[] = [];

const nodeTypes = { custom: CustomNode };

const Nodes: FC<NodesProps> = (props) => {
  // const { /* isToggle, */ isFileSelected } = props;
  const { nodes, data, setNodes } = useContext(Home);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      console.log({ changes });
      // setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [
      /* setEdges */
    ]
  );
  const onConnect = useCallback(
    (connection: Edge | Connection) => {
      console.log({ connection, nodes });
      const sourceNode = nodes.find((node) => node.id === connection.source);
      const targetNode = nodes.find((node) => node.id === connection.target);

      nodes.map((node) => {
        if (node.id === connection.source) {
          return addPredicateObjectMap(
            node,
            createPredicateObjectMapForRelation(
              targetNode.data["@id"] as string,
              "author"
            )
          );
        }
      });
    },
    [
      nodes,
      setNodes,
      /* setEdges */
    ]
  );
  const edges = useMemo(() => deduceEdgesFromNodes(nodes), [nodes]);
  console.log({ edges });

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      />
    </>
  );
};

export default Nodes;

const deduceEdgesFromNodes = (nodes: Node[]): Edge[] => {
  const edgesList: Edge[] = [];
  nodes.forEach((node) => {
    const relationPOMInfo = hasRelationPOM(getPredicateObjectMap(node) ?? []);
    // console.log({ relationPOMInfo, node });
    if (relationPOMInfo.hasRelationPOM) {
      const targetNode = nodes.find(
        (node) => relationPOMInfo.target === get(node, `data["@id"]`)
      );
      if (targetNode) {
        edgesList.push({
          id: `${node.data["@id"]}-${targetNode?.data["@id"]}`,
          source: node.id,
          target: targetNode.id,
        });
      }
    }
  });
  console.log({ edgesList });
  return edgesList;
};
