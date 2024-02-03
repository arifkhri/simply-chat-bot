import { create } from "zustand";

export const botStore = create()((setStore, getStore) => ({
  messageData: [],
  add: (message) => {
    const messages = [message, ...getStore().messageData];
    setStore({ messageData: messages });
  },
  update: (message, index) => {
    const messages = [...getStore().messageData];
    messages[index] = message;
    setStore({ messageData: messages });
  },
  getReplyData: (chatData) => {
    console.log('🚀 ~ chatData:', chatData);
    let replyMessage = "";

    const userMessage = chatData.pop();
    getStore().messageData.forEach((record) => {
      let criteriaIsMatch = record.criteria.includes(userMessage.message);
      if (criteriaIsMatch) {
        replyMessage = record.message;
      } else {
        replyMessage = "Ketik 'Agent' untuk menghubungi agent kami";
      }
    });

    const getReplyData = {
      type: "simple-chat",
      message: replyMessage,
    };

    return getReplyData;
  },
  set: (messageData) => {
    setStore({ messageData });
  },
}));
