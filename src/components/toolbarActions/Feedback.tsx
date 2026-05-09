import React from "react";
import { Tooltip, IconButton } from "@contentful/f36-components";
import { EditIcon } from "@contentful/f36-icons";

interface FeedbackActionProps {
  FeedbackAction: () => void;
}

const FeedbackAction: React.FC<FeedbackActionProps> = ({
  ProvideFeedback,
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
      onClick={ProvideFeedback}
      icon={<EditIcon />}
      aria-label="Click to give feedback"
      style={{ display: showDefaultField ? "none" : "inline-flex" }}
    />
  </Tooltip>
);

export default FeedbackAction;
