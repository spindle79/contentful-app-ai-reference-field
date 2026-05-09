import { FieldAppSDK } from "@contentful/app-sdk";

export const isArrayField = (sdk: FieldAppSDK): boolean => {
  if (!sdk?.field?.type) throw new Error("SDK Field Type can't be referenced");
  return sdk?.field?.type === "Array";
};
