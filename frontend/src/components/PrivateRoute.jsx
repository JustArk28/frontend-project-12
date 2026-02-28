import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { logIn } from '../slices/authSlice'

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch()
  if (localStorage.length > 0) {
    const user = localStorage.getItem('user')
    const { token, username } = JSON.parse(user)
    dispatch(logIn({ token, username }))
  }
  const token = useSelector(state => state.authStore.token)

  const navigate = useNavigate()

  useEffect(() => {
    token !== null ? children : navigate('/login')
  }, [])

  return <>{children}</>
}

export default PrivateRoute
