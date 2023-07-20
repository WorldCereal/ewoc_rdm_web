import Document, { Html, Head, Main, NextScript } from 'next/document';

import { AppConfig } from '../utils/AppConfig';

//  Need to create a custom _document because i18n support is not compatible with `next export`.
class MyDocument extends Document {
  render() {
    return (
      <Html lang={AppConfig.locale}>
        <Head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.css"
          />
          <link
            href="https://unpkg.com/leaflet-geosearch@latest/assets/css/leaflet.css"
            rel="stylesheet"
          />
        </Head>
        <body className="md:overflow-y-scroll">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
