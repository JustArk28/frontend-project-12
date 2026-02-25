import { useState, useEffect, useRef } from "react";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import * as formik from "formik";
import * as yup from "yup";
import routes from "../../routes";
import "/src/assets/css/style.css";
import { toast } from "react-toastify";
import filter from "leo-profanity";
import { useTranslation } from "react-i18next";

const AddChannelModal = ({ setCurrentChannelId }) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef();
  useEffect(() => {
    show ? inputRef.current.focus() : null;
  }, [show]);

  const { token } = useSelector((state) => state.authStore);
  const channels = useSelector((state) => state.channelsStore.channels);
  const channelsNames = channels.map((channel) => channel.name);
  const { Formik } = formik;
  const schema = yup.object().shape({
    channelName: yup
      .string()
      .trim()
      .required(t("validation.required"))
      .min(3, t("validation.range"))
      .max(20, t("validation.range"))
      .notOneOf(channelsNames, t("validation.notOneOf")),
  });

  return (
    <>
      <button className="add-button" onClick={handleShow}>
        {t("channelTitle.addBtn")}
      </button>

      <Modal show={show} onHide={handleClose} className="modal">
        <Modal.Header closeButton>
          <Modal.Title>{t("modal.addChannel.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={schema}
            validateOnChange={false}
            initialValues={{ channelName: "" }}
            onSubmit={async ({ channelName }) => {
              setLoading(true);
              try {
                const newChannel = { name: filter.clean(channelName.trim()) };
                await axios
                  .post(routes.addChannel(), newChannel, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  })
                  .then((response) => {
                    if (response.status === 200) {
                      setCurrentChannelId(response.data.id);
                      handleClose();
                      toast.success(t("toastify.success.add"));
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
                setLoading(false);
              }
            }}
          >
            {({ handleSubmit, handleChange, values, errors, touched }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-2">
                  <label className="input-size">
                    {t("modal.label")}
                    <Form.Control
                      type="text"
                      name="channelName"
                      value={values.channelName}
                      onChange={handleChange}
                      ref={inputRef}
                      isInvalid={touched.channelName && !!errors.channelName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.channelName}
                    </Form.Control.Feedback>
                  </label>
                </Form.Group>
                <div className="modal-buttons">
                  <Button
                    className="cancel-button"
                    variant="secondary"
                    onClick={handleClose}
                  >
                    {t("modal.addChannel.closeBtn")}
                  </Button>
                  <Button variant="primary" type="submit" disabled={loading}>
                    {t("modal.addChannel.submitBtn")}
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

export default AddChannelModal;
