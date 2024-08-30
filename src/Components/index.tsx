import React, { useState } from "react";

function Home() {
  const [text, setText] = useState('Hellooooooooo');
  const [checked, setChecked] = useState(false);
  const [count, setCount] = useState(0);
  
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const handleOnChange = (e: any) => {
    saveStateToHistory();
    setText(e.target.value);
  };

  const toggleCheckbox = () => {
    saveStateToHistory();
    setChecked(!checked);
  };

  const incrementCount = () => {
    saveStateToHistory();
    setCount(count + 1);
  };

  const decrementCount = () => {
    saveStateToHistory();
    setCount(count - 1);
  };

  const saveStateToHistory = () => {
    setHistory([...history, { text, checked, count }]);
    setRedoStack([]);
  };

  const undo = () => {
    if (history.length === 0) return;
    const lastState = history[history.length - 1];
    setRedoStack([ { text, checked, count }, ...redoStack]);
    setText(lastState.text);
    setChecked(lastState.checked);
    setCount(lastState.count);
    setHistory(history.slice(0, -1));
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    const nextState = redoStack[0];
    setHistory([...history, { text, checked, count }]);
    setText(nextState.text);
    setChecked(nextState.checked);
    setCount(nextState.count);
    setRedoStack(redoStack.slice(1));
  };

  return (
    <div className="m-2 flex gap-2">
      <input type="checkbox" name="hi" id="hi" checked={checked} onChange={toggleCheckbox} />
      <input type="text" onChange={handleOnChange} value={text} />
      {count}
      <button type="button" onClick={incrementCount}> + </button>
      <button type="button" onClick={decrementCount}> -</button>
      <button type="button" onClick={undo}>Undo</button>
      <button type="button" onClick={redo}>Redo</button>
    </div>
  );
}

export default Home;
