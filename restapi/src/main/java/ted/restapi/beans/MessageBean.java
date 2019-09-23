package ted.restapi.beans;

import ted.restapi.dto.MessageDTO;
import ted.restapi.persistence.dao.MessageDAO;
import ted.restapi.persistence.dao.UserDAO;
import ted.restapi.persistence.entities.Message;
import ted.restapi.persistence.entities.User;
import ted.restapi.util.Constants;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.inject.Inject;
import java.text.SimpleDateFormat;
import java.util.*;

@Stateless
@LocalBean
public class MessageBean {

    @Inject private MessageDAO messageDAO;
    @Inject private UserDAO userDAO;

    public List<MessageDTO> getChat(User currentUser, User otherUser) {
        List<Message> messages = messageDAO.getMessagesOfTwoUsers(currentUser.getId(), otherUser.getId());
        List<MessageDTO> chat = new ArrayList<>();
        for (Message message : messages) {
            String time = null;
            if(message.getTime() != null){
                time = new SimpleDateFormat(Constants.DATE_FORMAT).format(message.getTime());
            }
            if(message.getSender().getId() == currentUser.getId()){
                chat.add(new MessageDTO(message.getId(), currentUser.getId(), otherUser.getId(), currentUser.getUsername(), otherUser.getUsername(), message.getText(), message.getSeen(), time));
            } else {
                chat.add(new MessageDTO(message.getId(), otherUser.getId(), currentUser.getId(), otherUser.getUsername(), currentUser.getUsername(), message.getText(), message.getSeen(), time));
            }
        }
        chat.sort(Comparator.comparingInt(MessageDTO::getId));
        return chat;
    }

    public void sendMessage(User currentUser, User otherUser, String text) {
        Message message = new Message(currentUser, otherUser, text, "N", new Date());
        messageDAO.create(message);
    }

    public Message getMsgById(int id) {
        return messageDAO.findById(id);
    }

    public void messageSeen(Message msg) {
        msg.setSeen("Y");
        messageDAO.update(msg);
    }

    public List<List<MessageDTO>> getAllChats(User currentUser) {
        List<User> otherUsers = userDAO.getAllExceptOne(currentUser);
        List<List<MessageDTO>> chats = new ArrayList<>();
        for (User otherUser : otherUsers) {
            List<MessageDTO> chat = getChat(currentUser, otherUser);
            if(!chat.isEmpty()){
                chats.add(chat);
            }
        }
        return chats;
    }
}
