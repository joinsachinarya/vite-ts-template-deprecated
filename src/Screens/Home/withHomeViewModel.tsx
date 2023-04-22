import { Context, createContext, useState } from "react";
import ViewModel from "../../Core/@types";
import { Node } from "reactflow";

const EventData = {
  name: "Event x",
  dates: [{ startDate: "15/03", endDate: "18/03" }],
  speaker: "Aniruddha",
};
const UserData = {
  name: "Avneesh",
  email: "avneesh@mithyalabs.com",
};
const twoNodeMappingInput = {
  "event.json": JSON.stringify(EventData),
  "user.json": JSON.stringify(UserData),
};

const useHome = () => {
  const [nodes, setNodes] = useState<Node<any>[]>([]);
  const [data, setData] = useState<Record<string, string>>(twoNodeMappingInput);

  return { nodes, setNodes, data, setData };
};

export interface HomeViewModelState {
  nodes: any[];
  setNodes: React.Dispatch<React.SetStateAction<Node<any>[]>>; //(newState: any[]) => void;
  data: Record<string, string>;
  setData: (newData: Record<string, string>) => void;
}

export const Home: Context<HomeViewModelState> = createContext({
  nodes: [] as any[],
  setNodes: ((newState: any[]) => {
    console.error("set nodes used outside context!");
  }) as React.Dispatch<React.SetStateAction<Node<any>[]>>,
  data: {},
  setData: (newData: Record<string, string>) => {
    console.error("setData used outside context!");
  },
});

export default class HomeViewModel implements ViewModel<HomeViewModelState> {
  Hook = useHome;

  CtxProvider = Home.Provider;
}
