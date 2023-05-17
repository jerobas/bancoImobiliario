import React from 'react'
import GlobalStyles from './styles/global.styles';
import { ToastContainer } from 'react-toastify'
import Routes from './Routes/Routes';
import { Provider } from 'react-redux';
import store from './pages/Redux/index.js'
import { useAuth0 } from '@auth0/auth0-react'
function App() {
  const { isLoading, error } = useAuth0()
  return (
    <Provider store={store}>
      {error && <p>Authentication Error</p>}
      {
        !error && !isLoading && (
          <>
            <GlobalStyles />
            <ToastContainer
              limit={1}
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
            <Routes />
          </>
        )
      }

    </Provider>
  )
}

export default App
