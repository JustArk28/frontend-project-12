import { React, useEffect, useRef, useState } from "react";
import axios from "axios"
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { useLocation, useNavigate } from 'react-router-dom'
import * as formik from "formik";
import * as yup from 'yup';
import "./LoginPage.css";
import { useSelector, useDispatch } from 'react-redux';
import { logIn } from "../../slices/authSlice";
import routes from "../../routes";
import { useTranslation } from 'react-i18next';

const LoginPage = () => {
  const { t } = useTranslation();
  const inputRef = useRef()
  const [authFailed, setAuthFailed] = useState(false)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const auth = useSelector((state) => state.authStore)
  const dispatch = useDispatch()
  const { Formik } = formik

  const schema = yup.object().shape({
  username: yup.string(),
  password: yup.string(),
  })
// console.log('auth', auth)  
// console.log('ls', localStorage)
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
              variant="left"
              src="src/assets/avatar-1.jpg"
            />

            <Formik
              validationSchema={schema}
              initialValues={{ username: "", password: "" }}
              onSubmit={async (values) => {
                setAuthFailed(false)
                setLoading(true)
                try {
                  const response = await axios.post(routes.loginPath(), values)
                  localStorage.setItem('user', JSON.stringify(response.data))
                  navigate('/')
                  const user = localStorage.getItem('user');
                  const { token, username } = JSON.parse(user)
                  dispatch(logIn({ token, username }))
                }
                catch (err) {
                  if (err.status === 401) {
                    setAuthFailed(true)
                    inputRef.current.select()
                    return
                  }
                    throw err
                } finally {
                  setLoading(false)
                }
              }}
            >
              {({ handleSubmit, handleChange, values }) => (
                <Form onSubmit={handleSubmit} className="logInForm">
                  <div className="enter">{t('logInPage.title')}</div>
                  <br />
                  <Form.Group>
                  <FloatingLabel controlId="floatingUsername" label={t('logInPage.username')}>
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
                  <FloatingLabel controlId="floatingPassword" label={t('logInPage.password')}>
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
                    <Button variant="outline-primary" type="submit" disabled={loading}>{t('logInPage.enterBtn')}</Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className="registration-link-area">
            {t('logInPage.question')} <a href="/signup">{t('logInPage.registration')}</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage
