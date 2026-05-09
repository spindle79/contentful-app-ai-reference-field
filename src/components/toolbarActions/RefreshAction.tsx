import React from "react";
import { Tooltip, IconButton } from "@contentful/f36-components";
import { CycleIcon } from "@contentful/f36-icons";

interface RefreshActionProps {
  Refresh: () => void;
  showDefaultField: boolean;
}

const RefreshAction: React.FC<RefreshActionProps> = ({
  Refresh,
  showDefaultField,
}) => (
  <Tooltip
    placement="right"
    id="refresh"
    targetWrapperClassName="targetWrapperClassName"
    content="Refresh Categories"
  >
    <IconButton
      size="small"
      onClick={Refresh}
      icon={<CycleIcon />}
      aria-label="Refresh Categories"
      style={{ display: showDefaultField ? "none" : "inline-flex" }}
    />
  </Tooltip>
);

export default RefreshAction;
