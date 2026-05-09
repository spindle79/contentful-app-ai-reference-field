import React from "react";
import { useSDK } from "@contentful/react-apps-toolkit";
import { SingleEntryReferenceEditor as ContentfulSingleEntryReferenceEditor } from "@contentful/field-editor-reference";
import { FieldAppSDK } from "@contentful/app-sdk";
import EntryCard from "./EntryCard";
import {
  onDuplicateAndReplace as defaultOnDuplicateAndReplace,
  onEdit as defaultOnEdit,
  onRemove as defaultOnRemove,
} from "../utils/referenceEditorUtils";
import { useAppContext } from "../contexts/AppContext";

interface SingleReferenceEditorProps {
  onEdit?: (entity: any) => void;
  onRemove?: (entity: any) => void;
  onDuplicateAndReplace?: (entity: any, index: number) => Promise<void>;
}

const SingleReferenceEditor: React.FC<SingleReferenceEditorProps> = ({
  onEdit: customOnEdit,
  onRemove: customOnRemove,
  onDuplicateAndReplace: customOnDuplicateAndReplace,
}) => {
  const sdk = useSDK<FieldAppSDK>();
  const { cma } = useAppContext();
  const onEdit = customOnEdit || defaultOnEdit(sdk);
  const onRemove = customOnRemove || defaultOnRemove(sdk);
  const onDuplicateAndReplace =
    customOnDuplicateAndReplace || defaultOnDuplicateAndReplace(sdk, cma);

  return (
    <ContentfulSingleEntryReferenceEditor
      sdk={sdk}
      viewType="card"
      isInitiallyDisabled={false}
      hasCardEditActions={true}
      hasCardMoveActions={true}
      hasCardRemoveActions={true}
      parameters={{
        instance: {
          showCreateEntityAction: true,
          showLinkEntityAction: true,
        },
      }}
      renderCustomCard={(props: any) => (
        <EntryCard
          {...props}
          entity={props.entity}
          defaultLocale={sdk.locales.default}
          onEdit={onEdit}
          onRemove={onRemove}
          hasCardEditActions={true}
          hasCardMoveActions={true}
          hasCardRemoveActions={true}
          onDuplicateAndReplace={onDuplicateAndReplace}
        />
      )}
    />
  );
};

export default SingleReferenceEditor;
