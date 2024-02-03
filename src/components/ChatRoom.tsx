import { PersonIcon } from "@radix-ui/react-icons";

import { botStore } from "@/lib/zustand/stores/botStore";
import { chatStore } from "@/lib/zustand/stores/chatStore";

import { Avatar, AvatarImage } from "./ui/Avatar";

const ChatRoom = () => {
  const { messageData } = chatStore();
  console.log('🚀 ~ messageData:', messageData);
  const { messageData: botData } = botStore();
  console.log('🚀 ~ botData:', botData);
  const type = {
    you: {
      avatar: (
        <Avatar className="text-white bg-black">
          <PersonIcon />
        </Avatar>
      ),
      label: 'You'
    },
    'simple-chat': {
      avatar: (
        <Avatar>
          <AvatarImage src="/images/logo.png" />
        </Avatar>
      ),
      label: 'Simple Chat'
    }
  };

  // useEffect(() => {

  //   setTimeout(() => {
  //     if(messageData.length > 0) {
  //       let replyMessage = '';
  //       const userMessage = messageData.pop();

  //       botData.forEach((record) => {
  //         let criteriaIsMatch = record.criteria.includes(userMessage.message);
  //         if(criteriaIsMatch) {
  //           replyMessage = record.message;

  //         } else {
  //           replyMessage = "Ketik 'Agent' untuk menghubungi agent kami";
  //         }
  //       });

  //       const getReplyData = {
  //         type: 'simple-chat',
  //         message: replyMessage
  //       };
  //       setChatData(getReplyData);
  //     }
  //   }, 500);

  // }, [messageData.length]);

  return (
    <div>
      {
        messageData.map((record, index) => (
          <div className="flex flex-col mt-3" key={`${record.type}-${index}`}>
            <div className="flex items-center">
              { type[record.type].avatar }
              <span className="ml-2">{ type[record.type].label }</span>
            </div>
            <p className="pl-[37px]">
              {record.message}
            </p>
          </div>
        ))
      }
    </div>
  );
}

export default ChatRoom;

