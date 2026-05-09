import React, { useState, useEffect } from "react";
import { useSDK, useAutoResizer } from "@contentful/react-apps-toolkit";
import { FieldAppSDK } from "@contentful/app-sdk";
import {
  Field as ContentfulField,
  FieldWrapper as ContentfulFieldWrapper,
} from "@contentful/default-field-editors";
import ReferenceEditor from "../components/ReferenceEditor";
import FieldWrapper from "../components/FieldWrapper";
import { isArrayField } from "../utils/field/isArrayField";
import { useAppContext } from "../contexts/AppContext";
import "../styles.css";
import LongTextEditor from "../components/LongTextEditor";
import LRMarkdown from "../components/MDX/LRMarkdown";

const Field = () => {
  const sdk = useSDK<FieldAppSDK>();
  const { showDefaultField } = useAppContext();
  useAutoResizer();

  const toolbarActions = [
    "ShowDefaultFieldAction",
    "FeedbackAction",
    // "RefreshAction",
    // "ToggleSearchAction",
    "ChatBotAction",
  ];

  const isReferenceField = isArrayField(sdk) || sdk.field.type === "Link";
  console.log("fieldSDK", sdk);
  return (
    <FieldWrapper sdk={sdk} toolbarActions={toolbarActions}>
      {!!showDefaultField ? (
        <ContentfulField sdk={sdk} />
      ) : isReferenceField ? (
        <ReferenceEditor />
      ) : sdk.field.type === "Text" ? (
        // <LongTextEditor />
        <LRMarkdown />
      ) : (
        <ContentfulFieldWrapper sdk={sdk} name={sdk.field.name}>
          <ContentfulField sdk={sdk} isInitiallyDisabled={false} />
        </ContentfulFieldWrapper>
      )}
    </FieldWrapper>
  );
};

export default Field;
