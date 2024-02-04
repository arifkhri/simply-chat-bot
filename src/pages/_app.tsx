import { useMemo, useReducer } from 'react';

import 'reactflow/dist/style.css';
import '@/styles/globals.scss'

import Layout from '@/components/Layout'

import { LocalDataContext } from '@/contexts/localData';

function MyApp({ Component, pageProps }) {
  const localDataReducer = (state: any, action: { type: 'update' | 'delete', name: string, value: any }) => {
    switch (action.type) {
      case 'update':
        return ({
          ...state,
          [action.name]: action.value
        });
      case 'delete':
        delete state[action.name];
        return state;
      default:
        return state;
    }
  };

  const defaultChatBotData = [{"message":"halo ada yang bisa saya bantu?","criteria":["halo","hi"]},{"message":"Mau pesan ya?\n\nSilahkan kami punya menu:\n1. baso goreng\n2. Telor Goreng\nKlik nomor menu untuk memesan.","criteria":["Saya mau pesan","mau pesan","pesan"]},{"message":"Baik pesanan akan kami proses","criteria":["1","2"]}];

  const [store, dispatch] = useReducer(localDataReducer, {
    configData: {
      chatBotData: defaultChatBotData
    },
    conversationData: [],
  });
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
