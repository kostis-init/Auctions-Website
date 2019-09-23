package ted.restapi.dto;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class MessageDTO {
    @XmlElement private int id;
    @XmlElement private String senderUsername;
    @XmlElement private String text;
    @XmlElement private String seen;

    public MessageDTO() { }

    public MessageDTO(int id, String senderUsername, String text, String seen) {
        this.id = id;
        this.senderUsername = senderUsername;
        this.text = text;
        this.seen = seen;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getSenderUsername() {
        return senderUsername;
    }

    public void setSenderUsername(String senderUsername) {
        this.senderUsername = senderUsername;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getSeen() { return seen; }

    public void setSeen(String seen) { this.seen = seen; }
}
