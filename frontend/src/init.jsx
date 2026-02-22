/* eslint-disable functional/no-expression-statement */

import i18next from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import App from "./components/App";
// import { useSelector} from "react-redux";
import resources from "./locales/index.js";
import { Provider, ErrorBoundary } from "@rollbar/react";

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n.use(initReactI18next).init({
    resources,
    debug: true,
    fallbackLng: "ru",
  });
  // const rollbarConfig = {
  //   accessToken: "7da34d27cf96378024ec1dd545babff8",
  //   environment: "production",
  // };
  const rollbarConfig = {
  accessToken: '37b301e93ba5470783f252138e3986cd',
  environment: 'testenv',
};

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </ErrorBoundary>
    </Provider>
  );
};

export default init;
// import React from 'react';
// import { Provider, ErrorBoundary } from '@rollbar/react'; // Provider imports 'rollbar'

// const rollbarConfig = {
//   accessToken: '37b301e93ba5470783f252138e3986cd',
//   environment: 'testenv',
// };

// function TestError() {
//   const a = null;
//   return a.hello()
// }

// Provider instantiates Rollbar client instance handling any uncaught errors or unhandled promises in the browser
// ErrorBoundary catches all React errors in the tree below and logs them to Rollbar
// export default function App() {
//   return (
//     <Provider config={rollbarConfig}>
//       <ErrorBoundary>
//         <TestError />
//       </ErrorBoundary>
//     </Provider>
//   );
// }
