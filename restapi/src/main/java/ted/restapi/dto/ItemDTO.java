package ted.restapi.dto;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

@XmlRootElement
public class ItemDTO implements Serializable {
    @XmlElement private int id;
    @XmlElement private String name;
    @XmlElement private Double currentBid;
    @XmlElement private Double buyPrice;
    @XmlElement private Double firstBid;
    @XmlElement private int numberOfBids;
    @XmlElement private Date startedAt;
    @XmlElement private Date endsAt;
    @XmlElement private String description;
    @XmlElement private BigDecimal latitude;
    @XmlElement private BigDecimal longitude;
    @XmlElement private String city;
    @XmlElement private String country;
    @XmlElement private UserDTO seller;

    public ItemDTO() { }

    public ItemDTO(int id, String name, Double currentBid, Double buyPrice, Double firstBid, int numberOfBids, Date startedAt, Date endsAt, String description, BigDecimal latitude, BigDecimal longitude, String city, String country, UserDTO seller) {
        this.id = id;
        this.name = name;
        this.currentBid = currentBid;
        this.buyPrice = buyPrice;
        this.firstBid = firstBid;
        this.numberOfBids = numberOfBids;
        this.startedAt = startedAt;
        this.endsAt = endsAt;
        this.description = description;
        this.latitude = latitude;
        this.longitude = longitude;
        this.city = city;
        this.country = country;
        this.seller = seller;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getCurrentBid() {
        return currentBid;
    }

    public void setCurrentBid(Double currentBid) {
        this.currentBid = currentBid;
    }

    public Double getBuyPrice() {
        return buyPrice;
    }

    public void setBuyPrice(Double buyPrice) {
        this.buyPrice = buyPrice;
    }

    public Double getFirstBid() {
        return firstBid;
    }

    public void setFirstBid(Double firstBid) {
        this.firstBid = firstBid;
    }

    public int getNumberOfBids() {
        return numberOfBids;
    }

    public void setNumberOfBids(int numberOfBids) {
        this.numberOfBids = numberOfBids;
    }

    public Date getStartedAt() {
        return startedAt;
    }

    public void setStartedAt(Date startedAt) {
        this.startedAt = startedAt;
    }

    public Date getEndsAt() {
        return endsAt;
    }

    public void setEndsAt(Date endsAt) {
        this.endsAt = endsAt;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getLatitude() {
        return latitude;
    }

    public void setLatitude(BigDecimal latitude) {
        this.latitude = latitude;
    }

    public BigDecimal getLongitude() {
        return longitude;
    }

    public void setLongitude(BigDecimal longitude) {
        this.longitude = longitude;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public UserDTO getSeller() {
        return seller;
    }

    public void setSeller(UserDTO seller) {
        this.seller = seller;
    }
}
