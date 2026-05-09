import React from "react";
import { useSDK, useAutoResizer } from "@contentful/react-apps-toolkit";
import ChatFullPage from "../components/ChatFullPage";
import {
  MarkdownEditor,
  renderMarkdownDialog,
} from "@contentful/field-editor-markdown";
import { DialogAppSDK } from "@contentful/app-sdk";
import DialogWrapper from "../components/DialogWrapper";

import "../styles.css";

const Dialog = () => {
  const sdk = useSDK<DialogAppSDK>();

  useAutoResizer();

  const isMarkdown = sdk?.parameters?.invocation?.type?.startsWith("markdown-");
  const source = sdk?.parameters?.invocation?.source;

  const closeDialog = () => {
    sdk.close();
  };

  if (source === "chatButton") {
    return (
      <DialogWrapper onClose={closeDialog}>
        <ChatFullPage
          closeDialog={closeDialog}
          sdk={sdk}
          initialValue={sdk?.parameters?.invocation?.fieldValue}
        />
      </DialogWrapper>
    );
  }

  return <>{isMarkdown && renderMarkdownDialog(sdk as any)}</>;
};

export default Dialog;
