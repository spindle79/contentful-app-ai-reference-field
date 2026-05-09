import React from "react";
import {
  EntryCard as F36EntryCard,
  MenuItem,
  MenuSectionTitle,
} from "@contentful/f36-components";
import { useAppContext } from "../contexts/AppContext";

interface CustomCardProps {
  entity: any;
  entryUrl?: string;
  size: string;
  // isSelected: boolean;
  renderDragHandle: () => React.ReactNode;
  index: number;
  defaultLocale: string;
  onEdit?: (entity: any) => void;
  onRemove?: (entity: any) => void;
  onDuplicateAndAdd?: (entity: any, index: number) => void;
  onDuplicateAndReplace?: (entity: any, index: number) => void;
  indexToUpdate: number | undefined;
}

const EntryCard: React.FC<CustomCardProps> = (props) => {
  const { contentTypes } = useAppContext();
  const {
    entity,
    entryUrl,
    size,
    // isSelected,
    renderDragHandle,
    index,

    defaultLocale,
    onEdit,
    onRemove,
    onDuplicateAndAdd,
    onDuplicateAndReplace,
  } = props;

  const displayField =
    contentTypes[entity.sys.contentType.sys.id] || "headline";
  const defaultTitle = entity.fields?.[displayField]?.[defaultLocale];
  const title = defaultTitle || "Untitled";
  const description = entity.fields?.description?.[defaultLocale] || "";

  const actions = [];

  if (onEdit || onRemove || onDuplicateAndAdd || onDuplicateAndReplace) {
    actions.push(<MenuSectionTitle key="title">Actions</MenuSectionTitle>);

    if (onEdit) {
      actions.push(
        <MenuItem key="edit" onClick={() => onEdit(entity)}>
          Edit
        </MenuItem>
      );
    }

    if (onRemove) {
      actions.push(
        <MenuItem key="remove" onClick={() => onRemove(entity)}>
          Remove
        </MenuItem>
      );
    }

    if (onDuplicateAndAdd) {
      actions.push(
        <MenuItem
          key="duplicateAdd"
          onClick={() => onDuplicateAndAdd(entity, index)}
        >
          Duplicate and Add
        </MenuItem>
      );
    }

    if (onDuplicateAndReplace) {
      actions.push(
        <MenuItem
          key="duplicateReplace"
          onClick={() => onDuplicateAndReplace(entity, index)}
        >
          Duplicate and Replace
        </MenuItem>
      );
    }
  }

  return (
    <F36EntryCard
      as={entryUrl ? "a" : "article"}
      href={entryUrl}
      title={title}
      description={description}
      contentType={entity.sys.contentType.sys.id}
      size={size as any} // Type assertion to resolve size prop type issue
      // isSelected={isSelected}
      dragHandleRender={renderDragHandle as any} // Type assertion to resolve dragHandleRender prop type issue
      withDragHandle={!!renderDragHandle}
      actions={actions.length > 0 ? actions : undefined}
      status={entity.sys.publishedAt ? "published" : "draft"}
      // isBeingDragged={index === indexToUpdate}
    />
  );
};

export default EntryCard;
