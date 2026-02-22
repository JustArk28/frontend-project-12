import { useState, useEffect, useRef } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import * as formik from "formik";
import * as yup from "yup";
import routes from "../../routes";
import { toast } from "react-toastify";
import filter from "leo-profanity"
import { useTranslation } from 'react-i18next';

const RenameChannelModal = ({
  showRename,
  handleCloseRename,
  currentChannel,
}) => {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.authStore);
  const channels = useSelector((state) => state.channelsStore.channels);
  const channelsNames = channels.map((channel) => channel.name);
  const { Formik } = formik;
  const schema = yup.object().shape({
    newChannelName: yup
    .string()
    .trim()
    .required(t('validation.required'))
    .min(3, t('validation.range'))
    .max(20, t('validation.range'))
    .notOneOf(channelsNames, t('validation.notOneOf')),
  });
  // useEffect(() => {
  //   inputRef.current.focus();
  // }, []);  
const focusInput = () => {
  if(inputRef.current) {
    inputRef.current.select();
  }
}
  return (
    <>
      <Modal show={showRename} onHide={handleCloseRename} onEntered={focusInput} className="modal">
        <Modal.Header closeButton>
          <Modal.Title>{t('modal.renameChannel.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={schema}
            validateOnChange={false}
            initialValues={{ newChannelName: currentChannel.name }}
            onSubmit={async ({ newChannelName }) => {
              setLoading(true)
              try {
                const editedChannel = { name: filter.clean(newChannelName.trim()) };
                await axios
                  .patch(routes.editChannel(currentChannel.id), editedChannel, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  })
                  .then((response) => {
                    if (response.status === 200) {                      
                      toast.success(t('toastify.success.rename'));
                      handleCloseRename();
                    }
                  });
              } catch (err) {
                console.log(err);
                if (err.message === "Network Error") {
                  toast.error(t("toastify.error.connectionError"));
                } else {
                  toast.error(t("toastify.error.error"));
                }
              } finally {
                setLoading(false)
              }
            }}
          >
            {({ handleSubmit, handleChange, values, errors, touched }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-2">
                  <Form.Control                  
                    type="text"
                    name="newChannelName"
                    value={values.newChannelName}
                    onChange={handleChange}
                    ref={inputRef}
                    isInvalid={
                      touched.newChannelName && !!errors.newChannelName
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.newChannelName}
                  </Form.Control.Feedback>
                </Form.Group>
                <div className="modal-buttons">
                  <Button
                    className="cancel-button"
                    variant="secondary"
                    onClick={handleCloseRename}
                  >
                    {t('modal.renameChannel.closeBtn')}
                  </Button>
                  <Button variant="primary" type="submit" disabled={loading}>
                    {t('modal.renameChannel.submitBtn')}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RenameChannelModal;
