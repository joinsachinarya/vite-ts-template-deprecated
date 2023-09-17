const Square = (props) => {
  const { value, onSquareClick } = props;

  return (
    <button className="box" onClick={onSquareClick}>
      {value}
    </button>
  );
};

export default Square;
