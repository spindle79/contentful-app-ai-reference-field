import { Notification } from "@contentful/f36-components";

export const showMessage = (messageText: string, params: any) => {
  // @ts-ignore
  Notification.closeAll();
  // @ts-ignore
  Notification.setPlacement("top", { offset: 0 });

  // @ts-ignore
  return Notification[params.type || "info"](messageText, {
    ...params,
  });
};

export const showError = (
  friendlyMessage: string,
  error: string | Error = "Unknown error",
  showMessageFn = showMessage
) => {
  const errorMessage = typeof error === "string" ? error : error.message;
  handleError(errorMessage, friendlyMessage, showMessageFn);
};

export const handleError = (
  error: unknown,
  customMessage?: string,
  showMessageFn?: typeof showMessage
) => {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const displayMessage = customMessage || `An error occurred: ${errorMessage}`;
  console.error(displayMessage, error);

  if (showMessageFn) {
    showMessageFn(displayMessage, { duration: 0, type: "error" });
  }
};
