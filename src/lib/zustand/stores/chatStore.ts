import { create } from 'zustand';

export const chatStore = create()((setStore, getStore) => ({
  messageData: [],
  set: (newData) => {
    console.log('🚀 ~ getStore().messageData:', getStore().messageData);
    const messageData = [...getStore().messageData, newData];
    setStore({ messageData });
  },
  get: () => {
    return getStore().messageData;
  },
}));
