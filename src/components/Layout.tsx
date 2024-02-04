import { Catamaran } from "next/font/google";
import { useEffect } from "react";

import useLocalData from "@/hooks/useLocalData";

const font = Catamaran({
  subsets: ["latin"],
  variable: "--font-inter",
});


export default function RootLayout({ children }) {
  const { store, dispatch } = useLocalData();

  useEffect(() => {
    const cacheData = window.localStorage.getItem('simple-chat') ? JSON.parse(window.localStorage.getItem('simple-chat')) : { chatBotData: [] };

    if (cacheData.chatBotData.length > 0) {
      dispatch({
        type: 'update',
        name: 'configData',
        value: {
          ...cacheData
        }
      });
    } else {
      dispatch({
        type: 'update',
        name: 'showConfigModal',
        value: true
      });
    }
  }, [])

  useEffect(() => {

    window.localStorage.setItem('simple-chat', JSON.stringify(store.configData));
    dispatch({
      type: 'update',
      name: 'showConfigModal',
      value: false
    });
  }, [store.configData.chatBotData.length]);

  return (
    <main>
      <div className={`${font.className} mx-auto max-w-2xl overflow-hidden main h-screen`}>
        {children}
      </div>
    </main>
  )
}
