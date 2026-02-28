import i18next from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import App from './components/App'
import resources from './locales/index.js'
import { Provider, ErrorBoundary } from '@rollbar/react'

const init = async () => {
  const i18n = i18next.createInstance()

  await i18n.use(initReactI18next).init({
    resources,
    debug: true,
    fallbackLng: 'ru',
  })
  const rollbarConfig = {
    accessToken: '37b301e93ba5470783f252138e3986cd',
    environment: 'testenv',
  }

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </ErrorBoundary>
    </Provider>
  )
}

export default init
