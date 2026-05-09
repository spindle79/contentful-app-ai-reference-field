import React, { lazy, Suspense } from "react";
import { Flex } from "@contentful/f36-components";

interface ToolbarProps {
  actions: string[];
}

const actionComponentsMap: Record<string, React.LazyExoticComponent<any>> = {
  ToggleSearchAction: lazy(() => import("./toolbarActions/ToggleSearchAction")),
  RefreshAction: lazy(() => import("./toolbarActions/RefreshAction")),
  ShowDefaultFieldAction: lazy(
    () => import("./toolbarActions/ShowDefaultFieldAction")
  ),
  ChatBotAction: lazy(() => import("./toolbarActions/ChatBotAction")),
};

const Toolbar: React.FC<ToolbarProps> = ({ actions }) => {
  return (
    <Flex justifyContent="space-between" padding="none" marginBottom="spacingM">
      <Flex flexDirection="row" justifyContent="center" alignItems="center">
        {actions?.length &&
          actions.map((action, index) => {
            const ActionComponent = actionComponentsMap[action];
            if (!ActionComponent) {
              console.warn(`No component found for action: ${action}`);
              return null;
            }
            return (
              <Suspense key={index} fallback={<div>Loading...</div>}>
                <ActionComponent />
              </Suspense>
            );
          })}
      </Flex>
    </Flex>
  );
};

export default Toolbar;
