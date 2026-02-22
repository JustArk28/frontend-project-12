import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";
import routes from "../../routes";
import "/src/assets/css/style.css";
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';

const RemoveChannelModal = ({
  showRemove,
  handleCloseRemove,
  currentChannel,
  setCurrentChannelId,
}) => {
  const { t } = useTranslation();
  const { token } = useSelector((state) => state.authStore);
  const [loading, setLoading] = useState(false);
  const messages = useSelector((state) => state.messagesStore.messages);
  const messagesForDel = messages.filter(
    ({ channelId }) => channelId === currentChannel.id,
  );
  console.log("rem", currentChannel);
  const removeChannel = async () => {
    setLoading(true)
    try {
      await axios
        .delete(routes.removeChannel(currentChannel.id), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setCurrentChannelId('1')
            toast.success(t('toastify.success.remove'));
            handleCloseRemove();
          }
        });
      await messagesForDel.map(({ id }) => {
        try {
          axios.delete(routes.removeMessages(id), {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (err) {
          console.log("remove messages", err);
          if (err.message === "Network Error") {
            toast.error(t('toastify.error.connectionError'))
          } else {
            toast.error(t('toastify.error.error'))
          }
        }
      });
    } catch (err) {
      console.log(err);
      if (err.message === "Network Error") {
        toast.error(t('toastify.error.connectionError'))
      } else {
        toast.error(t('toastify.error.error'))
      }
    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      <Modal show={showRemove} onHide={handleCloseRemove} className="modal">
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
            <Button variant="danger" type="submit" onClick={removeChannel} disabled={loading}>
              {t('modal.removeChannel.removeBtn')}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RemoveChannelModal;
