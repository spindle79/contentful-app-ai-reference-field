import React from "react";
import { useSDK } from "@contentful/react-apps-toolkit";
import { FieldAppSDK } from "@contentful/app-sdk";
import { isArrayField } from "../utils/field/isArrayField";
import MultipleReferenceEditor from "./MultipleReferenceEditor";
import SingleReferenceEditor from "./SingleReferenceEditor";

interface ReferenceEditorProps {
  onEdit?: (entity: any) => void;
  onRemove?: (entity: any) => void;
  onDuplicateAndAdd?: (entity: any, index: number) => Promise<void>;
  onDuplicateAndReplace?: (entity: any, index: number) => Promise<void>;
  handleSortingEnd?: ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => void;
  updateBeforeSortStart?: ({ index }: { index: number }) => void;
}

const ReferenceEditor: React.FC<ReferenceEditorProps> = (props) => {
  const sdk = useSDK<FieldAppSDK>();
  if (isArrayField(sdk)) {
    return <MultipleReferenceEditor {...props} />;
  } else {
    return <SingleReferenceEditor {...props} />;
  }
};

export default ReferenceEditor;
