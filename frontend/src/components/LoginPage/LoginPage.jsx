import { useEffect, useRef, useState } from 'react'
import { Form, Button, FloatingLabel } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import * as formik from 'formik'
import * as yup from 'yup'
import './LoginPage.css'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { userLogIn } from '../../api/axiosRequests'

const LoginPage = () => {
  const { t } = useTranslation()
  const inputRef = useRef()
  const [authFailed, setAuthFailed] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { Formik } = formik

  const schema = yup.object().shape({
    username: yup.string(),
    password: yup.string(),
  })

  useEffect(() => {
    inputRef.current.focus()
  }, [])
  return (
    <>
      <div className="div-position">
        <div className="card-position">
          <div className="my-body-card">
            <img
              className="img"
              src="src/assets/avatar-1.jpg"
              alt={t('image.login')}
            />
            <Formik
              validationSchema={schema}
              initialValues={{ username: '', password: '' }}
              onSubmit={(values) => {
                setAuthFailed(false)
                userLogIn(
                  values,
                  setLoading,
                  navigate,
                  dispatch,
                  setAuthFailed,
                  inputRef,
                )
              }}
            >
              {({ handleSubmit, handleChange, values }) => (
                <Form onSubmit={handleSubmit} className="logInForm">
                  <div className="enter">{t('logInPage.title')}</div>
                  <br />
                  <Form.Group>
                    <FloatingLabel
                      controlId="floatingUsername"
                      label={t('logInPage.username')}
                    >
                      <Form.Control
                        size="lg"
                        type="text"
                        name="username"
                        className="form-control"
                        placeholder={t('logInPage.username')}
                        value={values.username}
                        onChange={handleChange}
                        required
                        ref={inputRef}
                        isInvalid={authFailed}
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <br />
                  <Form.Group>
                    <FloatingLabel
                      controlId="floatingPassword"
                      label={t('logInPage.password')}
                    >
                      <Form.Control
                        size="lg"
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder={t('logInPage.password')}
                        value={values.password}
                        onChange={handleChange}
                        required
                        isInvalid={authFailed}
                      />
                      <Form.Control.Feedback tooltip type="invalid">
                        {t('logInPage.feedback')}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                  <br />
                  <div className="d-grid gap-2">
                    <Button
                      variant="outline-primary"
                      type="submit"
                      disabled={loading}
                    >
                      {t('logInPage.enterBtn')}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className="registration-link-area">
            {t('logInPage.question')}
            {' '}
            <a href="/signup">{t('logInPage.registration')}</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
