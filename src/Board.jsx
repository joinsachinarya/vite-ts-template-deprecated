import Square from "./components/Square";

const Board = () => {
  return (
    <>
      <div className="row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="row"></div>
      <Square />
      <Square />
      <Square />
    </>
  );
};

export default Board;
