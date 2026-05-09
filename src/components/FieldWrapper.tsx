import React from "react";
import { FieldAppSDK } from "@contentful/app-sdk";
import Toolbar from "./Toolbar";

interface FieldWrapperProps {
  sdk: FieldAppSDK;
  toolbarActions: string[];
  children: React.ReactNode;
}

const FieldWrapper: React.FC<FieldWrapperProps> = ({
  sdk,
  toolbarActions,
  children,
}) => {
  return (
    <div className="field-wrapper">
      <Toolbar actions={toolbarActions} />
      {children}
    </div>
  );
};

export default FieldWrapper;
