import React, { useState } from "react";
import { useSDK } from "@contentful/react-apps-toolkit";
import { MultipleEntryReferenceEditor as ContentfulMultipleEntryReferenceEditor } from "@contentful/field-editor-reference";
import { FieldAppSDK } from "@contentful/app-sdk";
import EntryCard from "./EntryCard";
import {
  handleSortingEnd as defaultHandleSortingEnd,
  onDuplicateAndAdd as defaultOnDuplicateAndAdd,
  onDuplicateAndReplace as defaultOnDuplicateAndReplace,
  onEdit as defaultOnEdit,
  onRemove as defaultOnRemove,
  updateBeforeSortStart as defaultUpdateBeforeSortStart,
} from "../utils/referenceEditorUtils";

import { useAppContext } from "../contexts/AppContext";

interface MultipleReferenceEditorProps {
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

const MultipleReferenceEditor: React.FC<MultipleReferenceEditorProps> = ({
  onEdit: customOnEdit,
  onRemove: customOnRemove,
  onDuplicateAndAdd: customOnDuplicateAndAdd,
  onDuplicateAndReplace: customOnDuplicateAndReplace,
  handleSortingEnd: customHandleSortingEnd,
  updateBeforeSortStart: customUpdateBeforeSortStart,
}) => {
  const sdk = useSDK<FieldAppSDK>();
  const { cma } = useAppContext();

  const [indexToUpdate, setIndexToUpdate] = useState<number | undefined>(
    undefined
  );

  const onEdit = customOnEdit || defaultOnEdit(sdk);
  const onRemove = customOnRemove || defaultOnRemove(sdk);
  const onDuplicateAndAdd =
    customOnDuplicateAndAdd || defaultOnDuplicateAndAdd(sdk, cma);
  const onDuplicateAndReplace =
    customOnDuplicateAndReplace || defaultOnDuplicateAndReplace(sdk, cma);
  const handleSortingEnd =
    customHandleSortingEnd || defaultHandleSortingEnd(sdk);
  const updateBeforeSortStart =
    customUpdateBeforeSortStart ||
    defaultUpdateBeforeSortStart(setIndexToUpdate);

  return (
    <ContentfulMultipleEntryReferenceEditor
      sdk={sdk}
      viewType="link"
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
      updateBeforeSortStart={updateBeforeSortStart}
      onSortingEnd={handleSortingEnd}
      renderCustomCard={(props: any) => (
        <EntryCard
          {...props}
          id={`${props.entity.sys.id}-index-${props.index}`}
          // isSelected={!!props?.isSelected}
          entity={props.entity}
          defaultLocale={sdk.locales.default}
          onEdit={onEdit}
          onRemove={onRemove}
          onDuplicateAndAdd={onDuplicateAndAdd}
          onDuplicateAndReplace={onDuplicateAndReplace}
          indexToUpdate={indexToUpdate}
        />
      )}
    />
  );
};

export default MultipleReferenceEditor;
