package ted.restapi.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import javax.xml.bind.annotation.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder
@XmlRootElement(name = "Item")
@XmlAccessorType(XmlAccessType.FIELD)
public class ItemDTO implements Serializable {
    @XmlAttribute(name = "ItemID")
    private int id;

    @XmlElement(name = "Name")
    private String name;

    @XmlElement(name = "Category")
    private List<CategoryDTO> categories;

    @XmlElement(name = "Currently")
    private Double currentBid;

    @XmlElement(name = "Buy_Price")
    private Double buyPrice;

    @XmlElement(name = "First_Bid")
    private Double firstBid;

    @XmlElement(name = "Number_of_Bids")
    private int numberOfBids;

    @XmlElementWrapper(name = "Bids")
    @XmlElement(name = "Bid")
    private List<BidDTO> bids;

    @XmlElement(name = "Latitude")
    private BigDecimal latitude;

    @XmlElement(name = "Longitude")
    private BigDecimal longitude;

    @XmlElement(name = "City")
    private String city;

    @XmlElement(name = "Country")
    private String country;

    @XmlTransient
    private String state;

    @XmlElement(name = "Started")
    private String startedAt;

    @XmlElement(name = "Ends")
    private String endsAt;

    @XmlElement(name = "Seller")
    private UserDTO seller;

    @XmlElement(name = "Description")
    private String description;

    @XmlTransient
    private List<byte[]> images;

    public ItemDTO() { }

    public ItemDTO(int id, String name, Double currentBid, Double buyPrice, Double firstBid, int numberOfBids, String startedAt, String endsAt, String description, BigDecimal latitude, BigDecimal longitude, String city, String country, UserDTO seller, List<CategoryDTO> categories, List<BidDTO> bids, List<byte[]> images, String state) {
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
        this.categories = categories;
        this.bids = bids;
        this.images = images;
        this.state = state;
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

    public String getStartedAt() {
        return startedAt;
    }

    public void setStartedAt(String startedAt) {
        this.startedAt = startedAt;
    }

    public String getEndsAt() {
        return endsAt;
    }

    public void setEndsAt(String endsAt) {
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

    public List<CategoryDTO> getCategories() {
        return categories;
    }

    public void setCategories(List<CategoryDTO> categories) {
        this.categories = categories;
    }

    public List<BidDTO> getBids() {
        return bids;
    }

    public void setBids(List<BidDTO> bids) {
        this.bids = bids;
    }

    public List<byte[]> getImages() { return images; }

    public void setImages(List<byte[]> images) { this.images = images; }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
}
