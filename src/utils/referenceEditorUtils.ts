import { FieldAppSDK } from "@contentful/app-sdk";
import { showMessage, showError } from "./messaging";
import { duplicateEntry, updateFieldValue } from "./entryUtils";
import { isArrayField } from "./field/isArrayField";
import { getCurrentValue } from "./field/getCurrentValue";

export const handleSortingEnd =
  (sdk: FieldAppSDK) =>
  ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    const currentValue = getCurrentValue(sdk);
    const updatedEntries = [...currentValue];
    const [movedEntry] = updatedEntries.splice(oldIndex, 1);
    updatedEntries.splice(newIndex, 0, movedEntry);

    updateFieldValue(sdk, updatedEntries);
  };

export const onDuplicateAndAdd =
  (sdk: FieldAppSDK, cma: any) => async (entity: any, index: number) => {
    if (!isArrayField(sdk)) {
      return await onDuplicateAndReplace(sdk, cma);
    }

    showMessage("Updating ...", { duration: 1000 });
    try {
      const duplicatedEntry = await duplicateEntry(cma, entity);
      const currentValue = getCurrentValue(sdk);
      const newValue = [
        ...currentValue.slice(0, index + 1),
        {
          sys: { type: "Link", linkType: "Entry", id: duplicatedEntry.sys.id },
        },
        ...currentValue.slice(index + 1),
      ];
      updateFieldValue(sdk, newValue);
    } catch (error: any) {
      showError("Error duplicating entry", error);
    }
  };

export const onDuplicateAndReplace =
  (sdk: FieldAppSDK, cma: any) => async (entity: any, index: number) => {
    try {
      await showMessage("Duplicating Entry ...", { duration: 1000 });
      const duplicatedEntry = await duplicateEntry(cma, entity);

      let newValue;
      if (!isArrayField(sdk)) {
        newValue = {
          sys: {
            type: "Link",
            linkType: "Entry",
            id: duplicatedEntry.sys.id,
          },
        };
      } else {
        const currentValue = getCurrentValue(sdk);

        newValue = currentValue.map((link: any, i: number) =>
          i === index
            ? {
                sys: {
                  type: "Link",
                  linkType: "Entry",
                  id: duplicatedEntry.sys.id,
                },
              }
            : link
        );
      }

      await updateFieldValue(sdk, newValue);
    } catch (error: any) {
      showError("Error duplicating entry", error);
    }
  };

export const onEdit = (sdk: FieldAppSDK) => (entity: any) => {
  sdk.navigator.openEntry(entity.sys.id, { slideIn: true });
};

export const onRemove = (sdk: FieldAppSDK) => (entity: any) => {
  let newValue;
  if (!isArrayField(sdk)) {
    newValue = null;
  } else {
    const currentValue = getCurrentValue(sdk);
    newValue = currentValue.filter(
      (link: any) => link.sys.id !== entity.sys.id
    );
  }
  updateFieldValue(sdk, newValue);
};

export const updateBeforeSortStart =
  (
    setIndexToUpdate: React.Dispatch<React.SetStateAction<number | undefined>>
  ) =>
  ({ index }: { index: number }) => {
    setIndexToUpdate(index);
  };
