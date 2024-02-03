export interface ILocalDataContext {
  store: {
    configData: {
      form: IConfigForm;
      chatBotData: IMessageData[];
    },
    conversationData: IConversationData
  };
  dispatch: any;
}

export interface IConfigForm extends IMessageData {
  criteriaInput: string;
}

export interface IConversationData extends IMessageData<Pick['message']> {
  type: 'user' | 'bot'
};

export interface IMessageData {
  message: string;
  criteria: string[];
}

export interface IModal {
  open: boolean;
  content?: JSX.Element;
  title?: string;
}

export type BaseProps = React.AllHTMLAttributes<any>;
