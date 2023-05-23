import { Provider } from 'react-redux';

import { useAuth0 } from '@auth0/auth0-react'
import { ThemeProvider } from 'styled-components'

import store from './pages/Redux'
import RoutesPage from './routes/index.jsx';
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
              <RoutesPage />
            </>
          )
        }
      </ThemeProvider>
    </Provider>
  )
}

export default App
