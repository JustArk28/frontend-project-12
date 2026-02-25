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
      {/* <Nav className="flex-column nav-pills nav-link"> */}
      {channels.map(({ id, name, removable }) => {
        if (removable) {
          return (
            <div className="d-flex" key={id}>
              <ButtonGroup>
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
                  <Dropdown.Item id={id} onClick={handleRemove}>
                    {t("dropdownBtn.removeBtn")}
                  </Dropdown.Item>
                  <Dropdown.Item id={id} onClick={handleRename}>
                    {t("dropdownBtn.renameBtn")}
                  </Dropdown.Item>
                </DropdownButton>
              </ButtonGroup>
            </div>
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
      {/* </Nav> */}
    </div>
  );
};

export default ChannelsList;
