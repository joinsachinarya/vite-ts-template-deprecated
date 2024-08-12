import React, { useState } from "react";

function Home() {
  const [text, setText] = useState('Hellooooooooo')
  const [checked, setChecked] = useState(false);
  const handleOnChange = (e: any) => {
    setText(e.target.value)
  }
  console.log(checked, text);

  return (
    <div className="m-2 flex gap-2">
      <input type="checkbox" name="hi" id="hi" checked={checked} onChange={() => setChecked(!checked)} />
      <input type="text" onChange={handleOnChange} value={text} />
    </div>
  )
}

export default Home;
