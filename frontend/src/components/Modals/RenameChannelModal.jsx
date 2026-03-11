import { useState, useRef } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import * as formik from 'formik'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'
import { renameChannel } from '../../api/axiosRequests'

const RenameChannelModal = ({
  showRename,
  handleCloseRename,
  currentChannel,
  mainInputRef,
}) => {
  const { t } = useTranslation()
  const inputRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const { token } = useSelector(state => state.authStore)
  const channels = useSelector(state => state.channelsStore.channels)
  const channelsNames = channels.map(channel => channel.name)
  const { Formik } = formik
  const schema = yup.object().shape({
    newChannelName: yup
      .string()
      .trim()
      .required(t('validation.required'))
      .min(3, t('validation.range'))
      .max(20, t('validation.range'))
      .notOneOf(channelsNames, t('validation.notOneOf')),
  })

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.select()
    }
  }

  return (
    <>
      <Modal
        show={showRename}
        onHide={handleCloseRename}
        onEntered={focusInput}
        className="modal"
        restoreFocus={false} 
        onExited={() => mainInputRef.current?.focus()}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t('modal.renameChannel.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={schema}
            validateOnChange={false}
            initialValues={{ newChannelName: currentChannel.name }}
            onSubmit={({ newChannelName }) => {
              renameChannel(
                setLoading,
                newChannelName,
                currentChannel,
                t,
                token,
                handleCloseRename,
              )
            }}
          >
            {({ handleSubmit, handleChange, values, errors, touched }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-2">
                  <label htmlFor="newChannelName" className="input-size">
                    {t('modal.label')}
                  </label>
                  <Form.Control
                    type="text"
                    name="newChannelName"
                    id="newChannelName"
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
  )
}

export default RenameChannelModal
