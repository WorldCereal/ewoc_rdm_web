import { AppProps } from 'next/app';
import '../styles/main.css';
import { RecoilRoot } from 'recoil';
import { Provider } from 'react-jpex';
import getDiContainer from '../services/di';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    //  eslint-disable-next-line react/jsx-props-no-spreading
    <RecoilRoot>
      <Provider value={getDiContainer()}>
        <Component {...pageProps} />
      </Provider>
    </RecoilRoot>
  );
};

export default MyApp;
