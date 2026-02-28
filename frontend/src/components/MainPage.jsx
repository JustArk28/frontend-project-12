import { Navbar, Container, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logOut } from '../slices/authSlice'
import { useTranslation } from 'react-i18next'

const MainPage = ({ children }) => {
  const { t } = useTranslation()
  const state = useSelector(state => state.authStore)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logOutFromChat = () => {
    localStorage.clear()
    dispatch(logOut())
    navigate('/login')
  }
  return (
    <>
      <Navbar expand="lg" className="header">
        <Container>
          <Navbar.Brand className="nameOfChat" href="/">
            {t('mainPage.title')}
          </Navbar.Brand>
          {state.token === null
            ? null
            : (
               <Button
                 className="logOutBtn"
                 type="submit"
                 onClick={logOutFromChat}
               >
                 {t('mainPage.exitBtn')}
               </Button>
             )}
        </Container>
      </Navbar>
      {children}
    </>
  )
}

export default MainPage
