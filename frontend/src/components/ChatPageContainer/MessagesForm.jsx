import { useState, useEffect, useRef } from "react";
import * as formik from "formik";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import filter from "leo-profanity";
import axios from "axios";
import routes from "../../routes";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

const MessagesForm = ({ currentChannelId, inputFocus }) => {
  const { Formik, Form, Field } = formik;
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const { token, username } = useSelector((state) => state.authStore);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (message, resetForm) => {
    setLoading(true);
    try {
      const newMessage = {
        body: filter.clean(message.trim()),
        channelId: currentChannelId,
        username: username,
      };
      await axios.post(routes.addMessage(), newMessage, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      resetForm();
      inputRef.current.focus();
    } catch (err) {
      console.log(err);
      setTimeout(() => {
        sendMessage();
      }, 5000);
      if (err.message === "Network Error") {
        toast.error(t("toastify.error.connectionError"));
      } else {
        toast.error(t("toastify.error.error"));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    inputFocus ? inputRef.current.focus() : null;
  }, [inputFocus]);

  return (
    <div className="input-area">
      <Formik
        initialValues={{ message: "" }}
        onSubmit={({ message }, { resetForm }) => {
          if (message.trim().length > 0) {
            sendMessage(message, resetForm);
          }
        }}
      >
        {({ handleSubmit, handleChange, values }) => (
          <Form onSubmit={handleSubmit}>
            <div className="input-field-and-button">
              {/* <label label="message"></label> */}
              <Field
                type="text"
                name="message"
                className="form-control"
                placeholder={t("messagesForm.placeholder")}
                value={values.message}
                onChange={handleChange}
                ref={inputRef}
                autoComplete="off"
              />
              <Button type="submit" disabled={loading}>
                {t("messagesForm.submitBtn")}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MessagesForm;
