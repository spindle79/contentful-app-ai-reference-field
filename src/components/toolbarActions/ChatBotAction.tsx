import React from "react";
import { Tooltip, IconButton } from "@contentful/f36-components";
import { ChatBubbleIcon } from "@contentful/f36-icons";
import { useSDK } from "@contentful/react-apps-toolkit";
import { FieldAppSDK } from "@contentful/app-sdk";

const ChatBotAction: React.FC = () => {
  const sdk = useSDK<FieldAppSDK>();

  const openChatDialog = () => {
    const currentFieldValue = sdk.field.getValue();
    // Installation params come from ConfigScreen — see src/locations/ConfigScreen.tsx
    const installationParams = (sdk.parameters?.installation ?? {}) as {
      chatflowId?: string;
      apiHost?: string;
    };

    if (!installationParams.chatflowId) {
      sdk.notifier.error(
        "Chatflow ID not configured. Visit the app config screen to set it."
      );
      return;
    }

    const result = sdk.dialogs.openCurrentApp({
      width: 800,
      parameters: {
        chatflowid: installationParams.chatflowId,
        apiHost: installationParams.apiHost,
        fieldValue: currentFieldValue,
        source: "chatButton",
      },
    });

    if (result) {
      console.log({ result });
    }
  };

  return (
    <Tooltip placement="right" id="chatbot" content="Chat with Field">
      <IconButton
        size="small"
        onClick={openChatDialog}
        icon={<ChatBubbleIcon />}
        aria-label="Open Chat"
      />
    </Tooltip>
  );
};

export default ChatBotAction;
