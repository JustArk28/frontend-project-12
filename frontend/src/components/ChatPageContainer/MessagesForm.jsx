import { useState, useEffect, useRef } from "react";
import * as formik from "formik";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import filter from "leo-profanity";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import { sendMessage } from "../../api/axiosRequests";

const MessagesForm = ({ currentChannelId, inputFocus }) => {
  const { Formik, Form, Field } = formik;
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const { token, username } = useSelector((state) => state.authStore);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId]);

  return (
    <div className="input-area">
      <Formik
        initialValues={{ message: "" }}
        onSubmit={({ message }, { resetForm }) => {
          if (message.trim().length > 0) {
            sendMessage(
              message,
              resetForm,
              setLoading,              
              t,              
              currentChannelId,
              token,
              username,
              inputRef,
            );
          }
        }}
      >
        {({ handleSubmit, handleChange, values }) => (
          <Form onSubmit={handleSubmit}>
            <div className="input-field-and-button">
              <label
                className="input-size"
                aria-label={t("messagesForm.label")}
              >
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
              </label>
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
