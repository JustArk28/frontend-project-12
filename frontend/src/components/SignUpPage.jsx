import { React, useEffect, useRef, useState } from "react";
import axios from "axios"
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { useLocation, useNavigate } from 'react-router-dom'
import * as formik from "formik";
import * as yup from 'yup';
import "./LoginPage/LoginPage.css";
import { useSelector, useDispatch } from 'react-redux';
import { logIn } from "../slices/authSlice";
import routes from "../routes";
import { useTranslation } from 'react-i18next';

const SignUpPage = () => {
  const { t } = useTranslation();
  const inputRef = useRef()
  const [userExist, setUserExist] = useState(false)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const auth = useSelector((state) => state.authStore)
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
// console.log('auth', auth)  
console.log('ls', localStorage)
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
              src="src/assets/avatar-2.jpg"
            />

            <Formik
              validationSchema={schema}
              initialValues={{ username: "", password: "", confirmPassword: "" }}
              onSubmit={async ({ username, password }) => {
                setUserExist(false)
                setLoading(true)
                try {
                  await axios.post(routes.SignUpPath(), { username, password })
                    .then((response) => {                        
                      localStorage.setItem('user', JSON.stringify(response.data))
                      navigate('/')
                      const user = localStorage.getItem('user');
                      const { token, username } = JSON.parse(user)
                      dispatch(logIn({ token, username }))
                    });
                }
                catch (err) {
                    console.log(err)
                  if (err.status === 409) {
                    setUserExist(true)
                    inputRef.current.select()
                    return
                  }
                    throw err
                } finally {
                  setLoading(false)
                }
              }}
            >
              {({ handleSubmit, handleChange, values, errors, touched }) => (
                <Form onSubmit={handleSubmit} className="logInForm">
                  <div className="enter">{t('signUpPage.title')}</div>
                  <br />
                  <Form.Group>
                  <FloatingLabel controlId="floatingUsername1" label={t('signUpPage.username')}>
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
                      isInvalid={!!touched.username && !!errors.username || userExist}
                    //   isInvalid={authFailed}
                    />
                  <Form.Control.Feedback tooltip type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                  </FloatingLabel>
                  </Form.Group>
                  <br />
                  <Form.Group>
                  <FloatingLabel controlId="floatingPassword1" label={t('signUpPage.password')}>
                    <Form.Control
                      size="lg"
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder={t('signUpPage.password')}
                      value={values.password}
                      onChange={handleChange}
                      isInvalid={touched.password && !!errors.password || userExist}
                    //   isInvalid={authFailed}
                    />
                  <Form.Control.Feedback tooltip type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                  </FloatingLabel>
                  </Form.Group>
                  <br />
                  <Form.Group>
                  <FloatingLabel controlId="floatingPassword" label={t('signUpPage.confirmPassword')}>
                    <Form.Control
                      size="lg"
                      type="password"
                      name="confirmPassword"
                      className="form-control"
                      placeholder={t('signUpPage.confirmPassword')}
                      value={values.passwordConfirmation}
                      onChange={handleChange}
                      required
                      isInvalid={touched.confirmPassword && !!errors.confirmPassword || userExist}
                    //   isInvalid={authFailed}
                    />
                  <Form.Control.Feedback tooltip type="invalid">
                    {errors.confirmPassword || t('signUpPage.errors.usernameExist')}
                  </Form.Control.Feedback>
                  </FloatingLabel>
                  </Form.Group>
                  <br />
                  <div className="d-grid gap-2" role='button'>
                    <Button variant="outline-primary" type="submit" disabled={loading}>{t('signUpPage.registrationBtn')}</Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage
