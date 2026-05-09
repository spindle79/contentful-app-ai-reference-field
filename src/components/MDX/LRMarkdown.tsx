import React from "react";
import { useSDK } from "@contentful/react-apps-toolkit";
import { FieldAppSDK } from "@contentful/app-sdk";

import "@mdxeditor/editor/style.css";
import { ALL_PLUGINS } from "./_boilerplate";
import { MDXEditor } from "@mdxeditor/editor";
import "./dark-editor.css";

interface ReferenceEditorProps {}

const LRMarkdown: React.FC<ReferenceEditorProps> = (props) => {
  const sdk = useSDK<FieldAppSDK>();
  const markdownValue = sdk.field.getValue();

  const handleEditorChange = (newValue: string) => {
    sdk.field.setValue(newValue);
  };

  return (
    <>
      <div style={{ minHeight: "400px" }}>
        <MDXEditor
          markdown={markdownValue}
          onChange={handleEditorChange}
          plugins={ALL_PLUGINS}
        />
      </div>
    </>
  );
};

export default LRMarkdown;
