package ted.restapi.dto;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.util.Date;

@XmlRootElement
public class BidDTO implements Serializable {
    @XmlElement private int id;
    @XmlElement private String time;
    @XmlElement private Double amount;
    @XmlElement private UserDTO bidder;

    public BidDTO(){ }

    public BidDTO(int id, String time, Double amount, UserDTO bidder) {
        this.id = id;
        this.time = time;
        this.amount = amount;
        this.bidder = bidder;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public UserDTO getBidder() {
        return bidder;
    }

    public void setBidder(UserDTO bidder) {
        this.bidder = bidder;
    }
}
