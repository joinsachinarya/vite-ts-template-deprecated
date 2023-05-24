import React from "react";
import { ReactForm } from "react-forms-lite";
import "react-forms-lite/dist/index.css";

function Home() {
  const myConfig = [
    {
      type: "number",
      valueKey: "name",
      fieldProps: {
        placeholder: "Enter name",
        value: 50,
      },
    },
  ];
  return (
    <div>
      <ReactForm
        config={myConfig}
        formId={"react-form"}
        initialValues={{}}
        onSubmit={(value) => console.log(value)}
      />
    </div>
  );
}

export default Home;
