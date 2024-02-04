import { PersonIcon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";

import useChatBot from "@/hooks/useChatBot";
import useLocalData from "@/hooks/useLocalData";

import { Avatar, AvatarImage } from "./ui/Avatar";

const ChatRoom = () => {
  const ref = useRef();
  const { store: { conversationData }, dispatch } = useLocalData();
  const { getReplyData } = useChatBot();
  const [prevTotalData, setPrevTotalData] = useState(conversationData.length);
  const type = {
    user: {
      avatar: (
        <Avatar className="text-white bg-black">
          <PersonIcon />
        </Avatar>
      ),
      label: 'You'
    },
    bot: {
      avatar: (
        <Avatar>
          <AvatarImage src="/images/logo.png" />
        </Avatar>
      ),
      label: 'Bot Simple Chat'
    }
  };

  useEffect(() => {
    const newConversation = conversationData;
    if (conversationData.length > 0 && prevTotalData !== conversationData.length) {
      const interval = setInterval(() => {

        const replyData = getReplyData(conversationData);
        newConversation.push(replyData);

        dispatch({
          type: 'update',
          name: 'conversationData',
          value: newConversation
        });


        let chatRoomEl = document.querySelector('.chat-room');

        chatRoomEl.scrollTop = chatRoomEl.scrollHeight;
        setPrevTotalData(conversationData.length);

        clearInterval(interval);
      }, 500);
    }

  }, [conversationData.length]);

  return (
    <div className="chat-room" ref={ref}>
      {
        conversationData.map((record, index) => (
          <div className="flex flex-col mt-3" key={`${record.type}-${index}`}>
            <div className="flex items-center">
              {type[record.type].avatar}
              <span className="ml-2">{type[record.type].label}</span>
            </div>
            <p className="pl-[37px] whitespace-pre">
              {record.message}
            </p>
          </div>
        ))
      }
    </div>
  );
}

export default ChatRoom;

