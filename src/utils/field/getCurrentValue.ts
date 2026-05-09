import { FieldAppSDK } from "@contentful/app-sdk";
import { isArrayField } from "./isArrayField";

export const getCurrentValue = (sdk: FieldAppSDK): any[] => {
  const value = sdk.field.getValue();
  return isArrayField(sdk) ? value || [] : value;
};
