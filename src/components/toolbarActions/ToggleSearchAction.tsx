import React from "react";
import { Tooltip, IconButton } from "@contentful/f36-components";
import { SearchIcon } from "@contentful/f36-icons";

interface ToggleSearchActionProps {
  showSearch: boolean;
  toggleSearch: () => void;
  showDefaultField: boolean;
}

const ToggleSearchAction: React.FC<ToggleSearchActionProps> = ({
  showSearch,
  toggleSearch,
  showDefaultField,
}) => (
  <Tooltip
    placement="right"
    id="toggleSearch"
    targetWrapperClassName="targetWrapperClassName"
    content={showSearch ? "Hide Search" : "Show Search"}
  >
    <IconButton
      size="small"
      onClick={toggleSearch}
      icon={<SearchIcon />}
      aria-label={showSearch ? "Hide Search" : "Show Search"}
      isActive={showSearch}
      style={{ display: showDefaultField ? "none" : "inline-flex" }}
    />
  </Tooltip>
);

export default ToggleSearchAction;
