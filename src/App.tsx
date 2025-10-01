import React from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom'
import { Slide, ToastContainer } from 'react-toastify'
import Navigation from '@/components/Navigation/Navigation'
import NotFound from '@/pages/NotFound/NotFound'
import Home from '@/pages/Home/Home'
import Auth from '@/pages/Auth/Auth'
import { routes } from '@utils/routes'
import { Profile } from './pages/Profile/Profile'
import { AudioPlayer } from './components/AudioPlayer/AudioPlayer'
import { useLogin } from './hooks/useLogin'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { isTokenExpired } from '@utils/isTokenExpired'
import axios from 'axios'
import { getTokenState, setToken } from '@/components/Login/sessionSlice'
import { AlbumPage } from '@/components/Albums/AlbumPage'
import AlbumSidebar from '@/components/AlbumSidebar/AlbumSidebar.tsx'

// Split into two components so hooks like useNavigate live inside the router
const AppRoutes: React.FC = () => {
  const { user } = useLogin()
  const dispatch = useAppDispatch()
  const token = useAppSelector(getTokenState)
  const navigate = useNavigate()

  const logout = React.useCallback(() => {
    localStorage.removeItem('token')
    dispatch(setToken(null))
    // navigate on next tick to ensure state is applied
    setTimeout(() => navigate(routes.auth), 0)
  }, [dispatch, navigate])

  // Check token expiry on token changes
  React.useEffect(() => {
    if (!token) return
    try {
      if (isTokenExpired(token)) {
        logout()
      }
    } catch {
      // If decoding fails, treat token as invalid
      logout()
    }
  }, [token, logout])

  // Axios interceptors: add Authorization and auto-logout on 401/403
  React.useEffect(() => {
    const reqId = axios.interceptors.request.use((config) => {
      const authToken = token || localStorage.getItem('token')
      if (authToken) {
        config.headers = config.headers ?? {}
        config.headers.Authorization = `Bearer ${authToken}`
      }
      return config
    })

    const resId = axios.interceptors.response.use(
      (res) => res,
      (error) => {
        const status = error?.response?.status
        if (status === 401 || status === 403) {
          logout()
        }
        return Promise.reject(error)
      },
    )

    return () => {
      axios.interceptors.request.eject(reqId)
      axios.interceptors.response.eject(resId)
    }
  }, [token, logout])

  return (
    <Routes>
      <Route path={routes.home} element={<Home />} />
      {user ? (
        <>
          <Route path={routes.profile} element={<Profile />} />
          <Route path={routes.auth} element={<Navigate to={routes.home} />} />
          <Route path={routes.album} element={<AlbumPage />} />
        </>
      ) : (
        <>
          <Route path={routes.auth} element={<Auth />} />
        </>
      )}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <AppRoutes />
      <AlbumSidebar />
      <AudioPlayer />
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="dark"
        transition={Slide}
      />
    </BrowserRouter>
  )
}

export default App
