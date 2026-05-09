import { FieldAppSDK } from "@contentful/app-sdk";
import { createClient } from "contentful-management";
import { showMessage, showError } from "./messaging";

export const createCMAClient = (sdk: FieldAppSDK) => {
  return createClient(
    { apiAdapter: sdk.cmaAdapter },
    {
      type: "plain",
      defaults: {
        environmentId: sdk.ids.environmentAlias ?? sdk.ids.environment,
        spaceId: sdk.ids.space,
      },
    }
  );
};

export const duplicateEntry = async (cma: any, entity: any) => {
  const duplicatedEntry = await cma.entry.create(
    {
      contentTypeId: entity.sys.contentType.sys.id,
    },
    {
      fields: entity.fields,
    }
  );
  return duplicatedEntry;
};

export const updateFieldValue = async (sdk: FieldAppSDK, newValue: any) => {
  await sdk.field.setValue(newValue);
  await sdk.entry.save();
  showMessage("Successfully updated!", { duration: 1000 });
};

export const fetchContentTypes = async (cma: any) => {
  try {
    const contentTypes = await cma.contentType.getMany({});
    return contentTypes.items.reduce((acc: any, contentType: any) => {
      acc[contentType.sys.id] = contentType.displayField;
      return acc;
    }, {});
  } catch (error: any) {
    showError("Error fetching content types", error);
    return {};
  }
};
