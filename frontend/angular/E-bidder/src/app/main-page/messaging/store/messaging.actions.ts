import {ConversationModel} from "../../../shared/Models/Conversation.model";

export const SET_CONVERSATIONS = 'SET_CONVERSATIONS';
export const UPDATE_CONVERSATION = 'UPDATE_CONVERSATION';
export const MESSAGE_SEEN = 'MESSAGE_SEEN';



export class UpdateConversation {
  readonly type = UPDATE_CONVERSATION;
  constructor(public payload:{Conversation:ConversationModel, index:number}){};
}

export class SetConversations {
  readonly type=SET_CONVERSATIONS;
  constructor(public payload:{Conversations:ConversationModel[]}){}
}

export class MessageSeen {
  readonly type=MESSAGE_SEEN;
  constructor(public payload:{ConversationIndex:number, MessageId:number}){}

}


export type MessagingActions = SetConversations | UpdateConversation | MessageSeen;
