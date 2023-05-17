import React from 'react'
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify'

import { useAuth0 } from '@auth0/auth0-react'
import { ThemeProvider } from 'styled-components'

import store from './pages/Redux/index.js'
import Routes from './Routes/Routes';
import GlobalStyles from './styles/global.styles';
import { globalTheme } from './styles/theme/global.theme';

function App() {
  const { isLoading, error } = useAuth0()
  return (
    <Provider store={store}>
      <ThemeProvider theme={globalTheme}>
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
  </ThemeProvider>
    </Provider>
  )
}

export default App
