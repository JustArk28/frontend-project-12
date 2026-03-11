import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import '/src/assets/css/style.css'
import { useTranslation } from 'react-i18next'
import { removeChannel } from '../../api/axiosRequests'

const RemoveChannelModal = ({
  showRemove,
  handleCloseRemove,
  currentChannel,
  setCurrentChannelId,
  mainInputRef,
}) => {
  const { t } = useTranslation()
  const { token } = useSelector(state => state.authStore)
  const [loading, setLoading] = useState(false)
  const messages = useSelector(state => state.messagesStore.messages)
  const messagesForDel = messages.filter(
    ({ channelId }) => channelId === currentChannel.id,
  )

  const remove = () =>
    removeChannel(
      setLoading,
      currentChannel,
      t,
      token,
      setCurrentChannelId,
      handleCloseRemove,
      messagesForDel,
    )

  return (
    <>
      <Modal
        show={showRemove}
        onHide={handleCloseRemove}
        className="modal"
        restoreFocus={false}
        onExited={() => mainInputRef.current?.focus()}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t('modal.removeChannel.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>{t('modal.removeChannel.question')}</span>
          <div className="modal-buttons">
            <Button
              className="cancel-button"
              variant="secondary"
              onClick={handleCloseRemove}
            >
              {t('modal.removeChannel.closeBtn')}
            </Button>
            <Button
              variant="danger"
              type="submit"
              onClick={remove}
              disabled={loading}
            >
              {t('modal.removeChannel.removeBtn')}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default RemoveChannelModal
