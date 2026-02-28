import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '../assets/css/style.css'
import store from '../slices/index.js'
import LoginPage from './LoginPage/LoginPage.jsx'
import SignUpPage from './SignUpPage.jsx'
import ErrorPage from './ErrorPage.jsx'
import MainPage from './MainPage.jsx'
import ChatPage from './ChatPageContainer/ChatPage.jsx'
import PrivateRoute from './PrivateRoute.jsx'
import { ToastContainer, Bounce } from 'react-toastify'

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        <Provider store={store}>
          <MainPage>
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <ChatPage />
                  </PrivateRoute>
                }
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </MainPage>
        </Provider>
      </BrowserRouter>
    </>
  )
}

export default App
