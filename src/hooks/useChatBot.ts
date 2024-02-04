import useLocalData from "./useLocalData";
import { IConversationData } from "../../global";

export interface IChatBot {
  getReplyData: (conversationData: IConversationData[]) => IConversationData
}

const useChatBot = () => {
  const { store: { configData: { chatBotData } } } = useLocalData();

  const getReplyData = (conversationData: IConversationData[]): IConversationData => {
    let replyMessage = "";

    const userMessage = [...conversationData].pop();
      for (let index = 0; index < chatBotData.length; index++) {
        const criteria = chatBotData[index].criteria.map((value) => value.toLowerCase());
        let criteriaIsMatch = criteria.includes(userMessage.message.toLowerCase());
        if (criteriaIsMatch) {
          replyMessage = chatBotData[index].message;
          break;
        } else {
          replyMessage = "Ketik 'Agent' untuk menghubungi agent kami";
        }

      }

    const getReplyData = {
      type: "bot",
      message: replyMessage,
    };

    return getReplyData as IConversationData;
  };

  return { getReplyData };
};


export default useChatBot;
