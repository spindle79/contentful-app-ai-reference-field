import React from "react";
import { Button, IconButton } from "@contentful/f36-components";
import { CloseIcon } from "@contentful/f36-icons";

interface DialogWrapperProps {
  children: React.ReactNode;
  onClose: () => void;
}

const DialogWrapper: React.FC<DialogWrapperProps> = ({ children, onClose }) => {
  return (
    <div className="dialog-wrapper">
      <IconButton
        size="small"
        onClick={onClose}
        icon={<CloseIcon />}
        aria-label="Open Chat"
      />
      {children}
    </div>
  );
};

export default DialogWrapper;
