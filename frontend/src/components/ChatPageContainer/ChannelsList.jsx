import {
  Nav,
  DropdownButton,
  ButtonGroup,
  Button,
  Dropdown,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const ChannelsList = ({
  handleRename,
  handleRemove,
  currentChannelId,
  setCurrentChannelId,
  setInputFocus,
}) => {
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channelsStore.channels);
  return (
    <div className="channel-list">
      {/* <div className="flex-column"> */}
      {channels.map(({ id, name, removable }) => {
        if (removable) {
          return (
            // <div className="" key={id}>
              <ButtonGroup key={id}>
                <Button
                  key={id}
                  type="submit"
                  eventkey={id}
                  className="channel-name"
                  onClick={() => (setCurrentChannelId(id), setInputFocus(true))}
                >                  
                  # {name}                  
                </Button>

                <DropdownButton
                  bsPrefix={
                    currentChannelId === id
                    ? "btn btn-secondary"
                    : "btn btn-light"
                  }
                  as={ButtonGroup}
                  id="bg-nested-dropdown"
                >
                  <span className="">{t("dropdownBtn.description")}</span>
                  <Dropdown.Item id={id} onClick={handleRemove}>
                    {t("dropdownBtn.removeBtn")}
                  </Dropdown.Item>
                  <Dropdown.Item id={id} onClick={handleRename}>
                    {t("dropdownBtn.renameBtn")}
                  </Dropdown.Item>
                </DropdownButton>
              </ButtonGroup>
            // </div>
          );
        }
        return (
          <Button
            key={id}
            type="submit"
            eventkey={id}
            onClick={() => (setCurrentChannelId(id), setInputFocus(true))}
          >
            # {name}
          </Button>
        );
      })}
      {/* </div> */}
    </div>
  );
};

export default ChannelsList;
