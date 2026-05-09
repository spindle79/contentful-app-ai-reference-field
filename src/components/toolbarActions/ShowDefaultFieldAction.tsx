import { Tooltip, ToggleButton } from "@contentful/f36-components";
import { ToggleIcon } from "@contentful/f36-icons";
import { useAppContext } from "../../contexts/AppContext";

const ShowDefaultFieldAction = () => {
  const { showDefaultField, toggleDefaultField } = useAppContext();

  return (
    <Tooltip
      placement="right"
      id="defaultFieldButton"
      targetWrapperClassName="targetWrapperClassName"
      content={showDefaultField ? "Show App" : "Show Default Field"}
    >
      <ToggleButton
        size="small"
        isActive={showDefaultField}
        onToggle={toggleDefaultField}
        icon={<ToggleIcon />}
      />
    </Tooltip>
  );
};

export default ShowDefaultFieldAction;
