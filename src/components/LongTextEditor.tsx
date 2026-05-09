import React from "react";
import { useSDK } from "@contentful/react-apps-toolkit";
import { FieldAppSDK } from "@contentful/app-sdk";
import { render } from "react-dom";
import {
  MarkdownEditor,
  renderMarkdownDialog,
} from "@contentful/field-editor-markdown";
import "codemirror/lib/codemirror.css";

interface ReferenceEditorProps {}

const ReferenceEditor: React.FC<ReferenceEditorProps> = (props) => {
  const sdk = useSDK<FieldAppSDK>();

  return (
    <>
      <MarkdownEditor sdk={sdk} isInitiallyDisabled={false} />
    </>
  );
};

export default ReferenceEditor;
