import React from "react";
import { useSDK, useAutoResizer } from "@contentful/react-apps-toolkit";
import { FullPageChat } from "aai-embed-react";
import { IconButton } from "@contentful/f36-components";
import { CloseIcon } from "@contentful/f36-icons";
import {
  Field as ContentfulField,
  FieldWrapper as ContentfulFieldWrapper,
} from "@contentful/default-field-editors";
import { FieldAppSDK } from "@contentful/app-sdk";

interface ChatFullPageProps {
  sdk: any;
  closeDialog: () => void;
  initialValue: any;
  // Add other props as needed
}

const ChatFullPage: React.FC<ChatFullPageProps> = ({
  sdk,
  closeDialog,
  initialValue,
  ...props
}) => {
  // console.log({ sdk });
  // const starterPrompts = [
  //   `I am an editor and I need some guidance on the following content.   Please help me answering some questions.
  //        My initial content is:
  //        ${initialValue}
  //        `,
  // ];

  <IconButton
    size="small"
    onClick={() => {
      closeDialog("hello");
    }}
    icon={<CloseIcon />}
    aria-label="Open Chat"
  />;

  const chatflowConfig = {
    promptValues: {
      current_content: initialValue,
    },
  };

  console.log({ chatflowConfig });

  const theme = {
    // overrideConfig: {
    //   promptValue: {
    //     current_content: initialValue,
    //   },
    // },
    // chatWindow: {
    //   promptValue: {
    //     current_content: initialValue,
    //   },
    // },
  };

  sdk.field = {
    id: "longText",
    name: "Long Text",
    locale: "en-US",
    type: "Text",
    required: false,
    validations: [],
    _value:
      "sadfddfdfasdfasdfasdfdsafdfasdfsdfasdfasf sadfasdfasdfasfasfsdfasfasdfasdfasdf\n",
    _valueSignal: {
      _id: 1,
      _listeners: {},
      _memoizedArgs: [
        "sadfddfdfasdfasdfasdfdsafdfasdfsdfasdfasf sadfasdfasdfasfasfsdfasfasdfasdfasdf\n",
      ],
    },
    _isDisabledSignal: {
      _id: 1,
      _listeners: {},
      _memoizedArgs: [false],
    },
    _schemaErrorsChangedSignal: {
      _id: 1,
      _listeners: {},
      _memoizedArgs: [[]],
    },
    _channel: {
      _messageHandlers: {
        navigateSlideIn: {
          _id: 1,
          _listeners: {},
        },
        sysChanged: {
          _id: 1,
          _listeners: {},
        },
        metadataChanged: {
          _id: 1,
          _listeners: {},
        },
        valueChanged: {
          _id: 7,
          _listeners: {},
        },
        isDisabledChangedForFieldLocale: {
          _id: 7,
          _listeners: {},
        },
        schemaErrorsChangedForFieldLocale: {
          _id: 7,
          _listeners: {},
        },
        localeSettingsChanged: {
          _id: 1,
          _listeners: {},
        },
        showHiddenFieldsChanged: {
          _id: 1,
          _listeners: {},
        },
      },
      _responseHandlers: {},
    },
  };

  // chatflowid + apiHost are passed in via dialog invocation parameters from
  // ChatBotAction (which reads them from sdk.parameters.installation set in
  // ConfigScreen). Falling back to invocation parameters keeps this component
  // simple — it doesn't need to know whether the values came from installation
  // params or were overridden for a specific dialog invocation.
  const invocationParams = (sdk?.parameters?.invocation ?? {}) as {
    chatflowid?: string;
    apiHost?: string;
  };

  if (!invocationParams.chatflowid) {
    return (
      <div className="chat-full-page" style={{ padding: 24 }}>
        Chatflow ID not configured. Open the app config screen to set it.
      </div>
    );
  }

  return (
    <div className="chat-full-page">
      <FullPageChat
        chatflowid={invocationParams.chatflowid}
        apiHost={invocationParams.apiHost}
        chatflowConfig={chatflowConfig}
        theme={theme}
      />
    </div>
  );
};

export default ChatFullPage;
