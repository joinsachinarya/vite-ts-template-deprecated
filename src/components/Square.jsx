const Square = (props) => {
  const { value, onSquareClick } = props;
  // const [value, setValue] = useState("");
  // const [clickCount, setClickCount] = useState(0);
  // const handleClick = () => {
  //   // setClickCount(clickCount + 1);
  //   // console.log(clickCount);
  //   // if (clickCount % 2 === 0) {
  //   setValue("❌");
  //   //   setClickCount(clickCount + 1);
  //   // } else {
  //   //   setValue("⭕");
  //   //   setClickCount(clickCount + 1);
  //   // }
  // };
  return (
    <button className="box" onClick={onSquareClick}>
      {value}
    </button>
  );
};

export default Square;
