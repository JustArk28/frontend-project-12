import { useState, useEffect, useRef } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import * as formik from 'formik'
import * as yup from 'yup'
import '/src/assets/css/style.css'
import { useTranslation } from 'react-i18next'
import { addNewChannel } from '../../api/axiosRequests'

const AddChannelModal = ({
  show,
  handleClose,
  setCurrentChannelId,
  mainInputRef,
}) => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const inputRef = useRef()
  const { token } = useSelector(state => state.authStore)
  const channels = useSelector(state => state.channelsStore.channels)
  const channelsNames = channels.map(channel => channel.name)
  const { Formik } = formik
  const schema = yup.object().shape({
    channelName: yup
      .string()
      .trim()
      .required(t('validation.required'))
      .min(3, t('validation.range'))
      .max(20, t('validation.range'))
      .notOneOf(channelsNames, t('validation.notOneOf')),
  })

  useEffect(() => {
    show ? inputRef.current.focus() : null
  }, [show])

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        restoreFocus={false}
        onExited={() => mainInputRef.current?.focus()}
        className="modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>{t('modal.addChannel.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={schema}
            validateOnChange={false}
            initialValues={{ channelName: '' }}
            onSubmit={({ channelName }) => {
              addNewChannel(
                setLoading,
                channelName,
                t,
                token,
                setCurrentChannelId,
                handleClose,
              )
            }}
          >
            {({ handleSubmit, handleChange, values, errors, touched }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-2">
                  <label htmlFor="channelName" className="input-size">
                    {t('modal.label')}
                  </label>
                  <Form.Control
                    type="text"
                    name="channelName"
                    id="channelName"
                    value={values.channelName}
                    onChange={handleChange}
                    ref={inputRef}
                    isInvalid={touched.channelName && !!errors.channelName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.channelName}
                  </Form.Control.Feedback>
                </Form.Group>
                <div className="modal-buttons">
                  <Button
                    className="cancel-button"
                    variant="secondary"
                    onClick={handleClose}
                  >
                    {t('modal.addChannel.closeBtn')}
                  </Button>
                  <Button variant="primary" type="submit" disabled={loading}>
                    {t('modal.addChannel.submitBtn')}
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

export default AddChannelModal
