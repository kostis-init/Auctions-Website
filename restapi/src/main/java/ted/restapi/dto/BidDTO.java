package ted.restapi.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import javax.xml.bind.annotation.*;
import java.io.Serializable;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder
@JsonIgnoreProperties(ignoreUnknown=true)
@XmlRootElement(name = "Bid")
@XmlAccessorType(XmlAccessType.FIELD)
public class BidDTO implements Serializable {
    @XmlAttribute(name = "BidID")
    private int id;

    @XmlElement(name = "Time")
    private String time;

    @XmlElement(name = "Amount")
    private Double amount;

    @XmlElement(name = "Bidder")
    private UserDTO bidder;

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
