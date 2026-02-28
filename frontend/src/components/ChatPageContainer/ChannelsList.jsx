import {
  Nav,
  DropdownButton,
  ButtonGroup,
  Button,
  Dropdown,
} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const ChannelsList = ({
  handleRename,
  handleRemove,
  currentChannelId,
  setCurrentChannelId,
  setInputFocus,
}) => {
  const { t } = useTranslation()
  const channels = useSelector((state) => state.channelsStore.channels)
  return (
    <div className="channel-list">
      <Nav>
        {channels.map(({ id, name, removable }) => {
          if (removable) {
            return (
              <li key={id}>
                <ButtonGroup>
                  <Button
                    key={id}
                    type="submit"
                    eventkey={id}
                    className="channel-name"
                    bsPrefix={
                      currentChannelId === id
                        ? 'btn btn-secondary dropdown-btn-group'
                        : 'btn outline-dark dropdown-btn-group'
                    }
                    onClick={() => (
                      setCurrentChannelId(id),
                      setInputFocus(true)
                    )}
                  >
                    # {name}
                  </Button>

                  <div className="hidden-title">
                    {t('dropdownBtn.description')}
                    <DropdownButton
                      bsPrefix={
                        currentChannelId === id
                          ? 'btn btn-secondary menu-dropdown'
                          : 'btn outline-dark menu-dropdown'
                      }
                      as={ButtonGroup}
                      id="bg-nested-dropdown"
                    >
                      <Dropdown.Item id={id} onClick={handleRemove}>
                        {t('dropdownBtn.removeBtn')}
                      </Dropdown.Item>
                      <Dropdown.Item id={id} onClick={handleRename}>
                        {t('dropdownBtn.renameBtn')}
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>
                </ButtonGroup>
              </li>
            )
          }
          return (
            <li className="default-channel-name" key={id}>
              <Button
                type="submit"
                eventkey={id}
                bsPrefix={
                  currentChannelId === id
                    ? 'btn btn-secondary btn-group'
                    : 'btn outline-dark btn-group'
                }
                onClick={() => (setCurrentChannelId(id), setInputFocus(true))}
              >
                # {name}
              </Button>
            </li>
          )
        })}
      </Nav>
    </div>
  )
}

export default ChannelsList
