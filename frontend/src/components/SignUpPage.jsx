import { useEffect, useRef, useState } from 'react'
import { Form, Button, FloatingLabel } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import * as formik from 'formik'
import * as yup from 'yup'
import './LoginPage/LoginPage.css'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { userSignUp } from '../api/axiosRequests'

const SignUpPage = () => {
  const { t } = useTranslation()
  const inputRef = useRef()
  const [userExist, setUserExist] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { Formik } = formik

  const schema = yup.object().shape({
    username: yup
      .string()
      .required(t('signUpPage.errors.required'))
      .min(3, t('signUpPage.errors.usernameRange'))
      .max(20, t('signUpPage.errors.usernameRange')),
    password: yup
      .string()
      .required(t('signUpPage.errors.required'))
      .min(6, t('signUpPage.errors.passwordRange')),
    confirmPassword: yup
      .string()
      .required(t('signUpPage.errors.passwordConfirm'))
      .oneOf([yup.ref('password')], t('signUpPage.errors.passwordConfirm')),
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
              src="src/assets/avatar-2.jpg"
              alt={t('image.signup')}
            />

            <Formik
              validationSchema={schema}
              initialValues={{
                username: '',
                password: '',
                confirmPassword: '',
              }}
              onSubmit={({ username, password }) => {
                userSignUp(
                  setUserExist,
                  setLoading,
                  navigate,
                  username,
                  password,
                  dispatch,
                  inputRef,
                )
              }}
            >
              {({ handleSubmit, handleChange, values, errors, touched }) => (
                <Form onSubmit={handleSubmit} className="logInForm">
                  <div className="enter">{t('signUpPage.title')}</div>
                  <br />
                  <Form.Group>
                    <FloatingLabel
                      controlId="floatingUsername1"
                      label={t('signUpPage.username')}
                    >
                      <Form.Control
                        size="lg"
                        type="text"
                        name="username"
                        className="form-control"
                        placeholder={t('signUpPage.username')}
                        value={values.username}
                        onChange={handleChange}
                        ref={inputRef}
                        required
                        isInvalid={
                          (!!touched.username && !!errors.username) || userExist
                        }
                      />
                      <Form.Control.Feedback tooltip type="invalid">
                        {errors.username}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                  <br />
                  <Form.Group>
                    <FloatingLabel
                      controlId="floatingPassword1"
                      label={t('signUpPage.password')}
                    >
                      <Form.Control
                        size="lg"
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder={t('signUpPage.password')}
                        value={values.password}
                        onChange={handleChange}
                        isInvalid={
                          (touched.password && !!errors.password) || userExist
                        }
                      />
                      <Form.Control.Feedback tooltip type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                  <br />
                  <Form.Group>
                    <FloatingLabel
                      controlId="floatingPassword"
                      label={t('signUpPage.confirmPassword')}
                    >
                      <Form.Control
                        size="lg"
                        type="password"
                        name="confirmPassword"
                        className="form-control"
                        placeholder={t('signUpPage.confirmPassword')}
                        value={values.passwordConfirmation}
                        onChange={handleChange}
                        required
                        isInvalid={
                          (touched.confirmPassword && !!errors.confirmPassword) || userExist
                        }
                      />
                      <Form.Control.Feedback tooltip type="invalid">
                        {errors.confirmPassword || t('signUpPage.errors.usernameExist')}
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
                      {t('signUpPage.registrationBtn')}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUpPage
