import makeInspectable from 'mobx-devtools-mst';
import { initializeStore, StoreProvider, IStoreSnapshotIn } from '../stores';
import { onPatch } from 'mobx-state-tree';
import env from '../../env';
import { GlobalStyles } from 'twin.macro';
import { NextPage } from 'next';
import { AppProps } from 'next/app';

import '../styles/tailwind.css';
//import 'tailwindcss/dist/base.min.css';
// import '../styles/build.css';

interface IProps extends AppProps {
  pageProps: {
    initialState: null | IStoreSnapshotIn;
  };
}

const App: NextPage<IProps> = ({ Component, pageProps }) => {
  const store = initializeStore(pageProps.initialState);

  // mst 디버깅 로그
  if (env.NODE_ENV === 'development') {
    // 크롬 console 에 해당값의 변화가 있을 때 나타나게 함
    onPatch(store, (patch) => {});

    // 크롬 mobx tools 에 MST 로 상태변화를 볼 수 있게 한다.
    makeInspectable(store);
  }

  return (
    <StoreProvider value={store}>
      <GlobalStyles />
      <Component {...pageProps} />
    </StoreProvider>
  );
};

export default App;
