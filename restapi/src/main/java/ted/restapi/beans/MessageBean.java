package ted.restapi.beans;

import ted.restapi.dto.MessageDTO;
import ted.restapi.persistence.dao.MessageDAO;
import ted.restapi.persistence.entities.Message;
import ted.restapi.persistence.entities.User;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.inject.Inject;
import java.util.*;

@Stateless
@LocalBean
public class MessageBean {

    @Inject private MessageDAO messageDAO;

    public List<MessageDTO> getChat(User currentUser, User otherUser) {
        List<Message> messages = messageDAO.getMessagesOfTwoUsers(currentUser.getId(), otherUser.getId());
        List<MessageDTO> chat = new ArrayList<>();
        for (Message message : messages) {
            if(message.getSender().getId() == currentUser.getId()){
                chat.add(new MessageDTO(message.getId(), currentUser.getUsername(), message.getText(), message.getSeen()));
            } else {
                chat.add(new MessageDTO(message.getId(), otherUser.getUsername(), message.getText(), message.getSeen()));
            }
        }
        return chat;
    }

    public void sendMessage(User currentUser, User otherUser, String text) {
        Message message = new Message(currentUser, otherUser, text, "N");
        messageDAO.create(message);
    }

    public Message getMsgById(int id) {
        return messageDAO.findById(id);
    }

    public void messageSeen(Message msg) {
        msg.setSeen("Y");
        messageDAO.update(msg);
    }
}
