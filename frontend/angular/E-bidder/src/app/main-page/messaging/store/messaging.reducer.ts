import {ConversationModel} from "../../../shared/Models/Conversation.model";
import {MESSAGE_SEEN, MessagingActions, SET_CONVERSATIONS, UPDATE_CONVERSATION} from "./messaging.actions";
import {MessageModel} from "../../../shared/Models/Message.model";

export interface MessagingState {
  Conversations:ConversationModel[];
}

export const InitialState:MessagingState= {
  Conversations:null
};

export function MessagingReducers(state=InitialState, action: MessagingActions):MessagingState {

  switch (action.type) {
    case SET_CONVERSATIONS:
      return {
        ...state,
        Conversations:action.payload.Conversations
      };
    case UPDATE_CONVERSATION :
      let NewConversations = state.Conversations;
      console.log(action.payload.Conversation);
      NewConversations[action.payload.index] = action.payload.Conversation;
      return {
        ...state,
        Conversations:NewConversations
      };
    case MESSAGE_SEEN:
      let Conversations:ConversationModel[] = state.Conversations;
      ((Conversations[action.payload.ConversationIndex] as unknown) as MessageModel[])
        .find((mess:MessageModel)=> mess.id === action.payload.MessageId).seen ='Y';
      return {
        ...state,
        Conversations: Conversations
      };


    default:
      return state;

  }
}
