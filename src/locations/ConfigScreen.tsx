import { ConfigAppSDK } from "@contentful/app-sdk";
import {
  Flex,
  Form,
  FormControl,
  Heading,
  Paragraph,
  TextInput,
} from "@contentful/f36-components";
import { /* useCMA, */ useSDK } from "@contentful/react-apps-toolkit";
import { useCallback, useEffect, useState } from "react";

export interface AppInstallationParameters {
  /** AnswerAI / Flowise chatflow ID. Required for the in-field chat assistant. */
  chatflowId?: string;
  /**
   * AnswerAI / Flowise API host. Use your self-hosted Flowise instance URL,
   * or AnswerAI's hosted host. Falls back to the default `aai-embed`
   * behavior when blank.
   */
  apiHost?: string;
}

const ConfigScreen = () => {
  const [parameters, setParameters] = useState<AppInstallationParameters>({});
  const sdk = useSDK<ConfigAppSDK>();

  /*
     To use the cma, inject it as follows.
     If it is not needed, you can remove the next line.
  */
  // const cma = useCMA();

  const onConfigure = useCallback(async () => {
    // This method will be called when a user clicks on "Install"
    // or "Save" in the configuration screen.
    // for more details see https://www.contentful.com/developers/docs/extensibility/ui-extensions/sdk-reference/#register-an-app-configuration-hook

    // Get current the state of EditorInterface and other entities
    // related to this app installation
    const currentState = await sdk.app.getCurrentState();

    return {
      // Parameters to be persisted as the app configuration.
      parameters,
      // In case you don't want to submit any update to app
      // locations, you can just pass the currentState as is
      targetState: currentState,
    };
  }, [parameters, sdk]);

  useEffect(() => {
    // `onConfigure` allows to configure a callback to be
    // invoked when a user attempts to install the app or update
    // its configuration.
    sdk.app.onConfigure(() => onConfigure());
  }, [sdk, onConfigure]);

  useEffect(() => {
    (async () => {
      // Get current parameters of the app.
      // If the app is not installed yet, `parameters` will be `null`.
      const currentParameters: AppInstallationParameters | null =
        await sdk.app.getParameters();

      if (currentParameters) {
        setParameters(currentParameters);
      }

      // Once preparation has finished, call `setReady` to hide
      // the loading screen and present the app to a user.
      sdk.app.setReady();
    })();
  }, [sdk]);

  return (
    <Flex flexDirection="column" style={{ margin: "80px", maxWidth: "800px" }}>
      <Form>
        <Heading>AI Reference Field — App Config</Heading>
        <Paragraph>
          Configure the AnswerAI / Flowise chatflow that powers the in-field
          chat assistant. These settings are saved per Contentful org+space and
          read at runtime by the Field, Sidebar, and Dialog locations.
        </Paragraph>

        <FormControl>
          <FormControl.Label isRequired>Chatflow ID</FormControl.Label>
          <TextInput
            value={parameters.chatflowId ?? ""}
            onChange={(e) =>
              setParameters((p) => ({ ...p, chatflowId: e.target.value }))
            }
            placeholder="00000000-0000-0000-0000-000000000000"
          />
          <FormControl.HelpText>
            Find your chatflow ID in the Flowise dashboard URL bar after
            opening a chatflow.
          </FormControl.HelpText>
        </FormControl>

        <FormControl>
          <FormControl.Label>API Host</FormControl.Label>
          <TextInput
            value={parameters.apiHost ?? ""}
            onChange={(e) =>
              setParameters((p) => ({ ...p, apiHost: e.target.value }))
            }
            placeholder="https://your-flowise-instance.example.com"
          />
          <FormControl.HelpText>
            Optional. Leave blank to use the AnswerAI default. Set this if
            you self-host Flowise or use a private AnswerAI host.
          </FormControl.HelpText>
        </FormControl>
      </Form>
    </Flex>
  );
};

export default ConfigScreen;
