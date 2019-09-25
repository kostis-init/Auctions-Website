package ted.restapi.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import javax.xml.bind.annotation.*;
import java.io.Serializable;
import java.math.BigDecimal;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder
@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
public class UserDTO implements Serializable {
    @XmlAttribute(name = "UserID") private int id;
    @XmlElement(name = "Username") private String username;
    @XmlTransient private String password;
    @XmlElement private String firstName;
    @XmlElement private String lastName;
    @XmlElement private String email;
    @XmlElement private String telephoneNum;
    @XmlElement private String afm;
    @XmlElement(name = "Bidder_Rating") private Double bidderRating;
    @XmlElement(name = "Seller_Rating") private Double sellerRating;
    @XmlElement private String isAdmin;
    @XmlElement private String isApproved;
    @XmlTransient private String address;
    @XmlTransient private BigDecimal latitude;
    @XmlTransient private BigDecimal longitude;
    @XmlElement(name = "City") private String city;
    @XmlElement(name = "Country") private String country;

    public UserDTO() { }

    public UserDTO(int id, String username, String password, String firstName, String lastName, String email, String telephoneNum, String afm, Double bidderRating, Double sellerRating, String isAdmin, String isApproved, String address, String city, String country) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.telephoneNum = telephoneNum;
        this.afm = afm;
        this.bidderRating = bidderRating;
        this.sellerRating = sellerRating;
        this.isAdmin = isAdmin;
        this.isApproved = isApproved;
        this.address = address;
        this.city = city;
        this.country = country;
    }

    public UserDTO(int id, String username, Double bidderRating, Double sellerRating, String address, String city, String country) {
        this.id = id;
        this.username = username;
        this.bidderRating = bidderRating;
        this.sellerRating = sellerRating;
        this.address = address;
        this.city = city;
        this.country = country;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelephoneNum() {
        return telephoneNum;
    }

    public void setTelephoneNum(String telephoneNum) {
        this.telephoneNum = telephoneNum;
    }

    public String getAfm() {
        return afm;
    }

    public void setAfm(String afm) {
        this.afm = afm;
    }

    public Double getBidderRating() {
        return bidderRating;
    }

    public void setBidderRating(Double bidderRating) {
        this.bidderRating = bidderRating;
    }

    public Double getSellerRating() {
        return sellerRating;
    }

    public void setSellerRating(Double sellerRating) {
        this.sellerRating = sellerRating;
    }

    public String getIsAdmin() {
        return isAdmin;
    }

    public void setIsAdmin(String isAdmin) {
        this.isAdmin = isAdmin;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public BigDecimal getLatitude() { return latitude; }

    public void setLatitude(BigDecimal latitude) { this.latitude = latitude; }

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

    public String getIsApproved() {
        return isApproved;
    }

    public void setIsApproved(String isApproved) {
        this.isApproved = isApproved;
    }
}
