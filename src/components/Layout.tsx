import { Catamaran } from "next/font/google";
import { useEffect } from "react";

import { botStore } from "@/lib/zustand/stores/botStore";

const font = Catamaran({
  subsets: ["latin"],
  variable: "--font-inter",
});


export default function RootLayout({ children }) {
  const { messageData, set } = botStore();

  useEffect(() => {
    const cacheData = JSON.parse(window.localStorage.getItem('simple-chat') || '[]');
    set(cacheData);
  }, [])

  useEffect(() => {
    if(messageData.length > 0) {
      window.localStorage.setItem('simple-chat', JSON.stringify(messageData));
    }
  }, [messageData.length]);

  return (
    <main>
      <div className={`${font.className} mx-auto max-w-2xl overflow-hidden main h-screen`}>
        {children}
      </div>
    </main>
  )
}
