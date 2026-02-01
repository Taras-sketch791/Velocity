import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const withTranslationLoader = (WrappedComponent) => {
  const WithTranslationLoader = (props) => {
    const { t, i18n, ready } = useTranslation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (ready) {
        setLoading(false);
      }
    }, [ready]);

    if (loading) {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          Loading translations...
        </div>
      );
    }

    return <WrappedComponent {...props} t={t} i18n={i18n} ready={ready} />;
  };

  // Устанавливаем отображаемое имя для компонента в DevTools
  const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithTranslationLoader.displayName = `withTranslationLoader(${componentName})`;

  return WithTranslationLoader;
};

export default withTranslationLoader;