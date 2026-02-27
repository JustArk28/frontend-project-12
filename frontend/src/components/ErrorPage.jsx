import "../assets/css/style.css";
import { useTranslation } from 'react-i18next';

const ErrorPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <img className="img-error" src="src/assets/404-D.svg" alt={t('image.notFound')} />
      <p className="title-error-page">{t('errorPage.title')}</p>
      <p className="subtitle-error-page">
        {t('errorPage.subtitle')}<a href="/">{t('errorPage.link')}</a>
      </p>
    </>
  );
};

export default ErrorPage;
