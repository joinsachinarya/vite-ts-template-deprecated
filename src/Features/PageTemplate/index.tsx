import React from "react";
import { type FC, type PropsWithChildren } from "react";
import Header from "../Header";

interface PageTemplateProps extends PropsWithChildren {
  classNames?: string;
}

const PageTemplate: FC<PageTemplateProps> = (props) => {
  const { children, classNames } = props;
  return (
    <div className="page-template-container">
      <Header />
      {children}
    </div>
  );
};

export default PageTemplate;
