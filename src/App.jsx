import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify'

import { ThemeProvider } from 'styled-components'

import 'react-toastify/dist/ReactToastify.css';
import store from './pages/Redux'
import RoutesPage from './routes/index.jsx';
import GlobalStyles from './styles/global.styles';
import { globalTheme } from './styles/theme/global.theme';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={globalTheme}>
        <GlobalStyles />
        <ToastContainer />
        <RoutesPage />
      </ThemeProvider>
    </Provider>
  )
}

export default App
