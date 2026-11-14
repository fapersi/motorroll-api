import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import App from './App.jsx'
import '@fontsource-variable/archivo'
import '@fontsource/saira-condensed/600.css'
import '@fontsource/saira-condensed/700.css'
import './index.css'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter useTransitions={false}>
      <App />
    </BrowserRouter>
  </Provider>,
)
