import { useMemo, useReducer } from 'react';

import 'reactflow/dist/style.css';
import '@/styles/globals.scss'

import Layout from '@/components/Layout'

import { LocalDataContext } from '@/contexts/localData';
import localDataReducer from '@/reducers/localData';


function MyApp({ Component, pageProps }) {
  const [store, dispatch] = useReducer(localDataReducer, {});
  const contextValue = useMemo(() => ({ store, dispatch }), [store, dispatch]);

  return (
    <LocalDataContext.Provider value={contextValue}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LocalDataContext.Provider>
  );
}

export default MyApp;
