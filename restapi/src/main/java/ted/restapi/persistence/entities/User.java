package ted.restapi.persistence.entities;

import org.eclipse.persistence.annotations.CascadeOnDelete;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "user")
@NamedQueries({
        @NamedQuery(name = "User.findAll", query = "SELECT u FROM User u"),
        @NamedQuery(name = "User.findByUsername", query = "SELECT u FROM User u WHERE u.username = ?1"),
        @NamedQuery(name = "User.findByEmail", query = "SELECT u FROM User u WHERE u.email = ?1")
})
@Cacheable(false)
public class User{
    private int id;
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String email;
    private String telephoneNum;
    private String afm;
    private Double bidderRating;
    private Double sellerRating;
    private String isAdmin;
    private String address;
    private String city;
    private String country;
    private String isApproved;
    private List<Bid> bids;
    private List<Item> items;

    public User() { }

    public User(String username, String password, String firstName, String lastName, String email, String telephoneNum, String afm, Double bidderRating, Double sellerRating, String isAdmin, String address, String city, String country, String isApproved) {
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
        this.address = address;
        this.city = city;
        this.country = country;
        this.isApproved = isApproved;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", isAdmin='" + isAdmin + '\'' +
                ", isApproved='" + isApproved + '\'' +
                '}';
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    public int getId() {
        return id;
    }
    public void setId(int userId) {
        this.id = userId;
    }

    @Basic
    @Column(name = "username", nullable = false, length = 50)
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }

    @Basic
    @Column(name = "password", nullable = false, length = 100)
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    @Basic
    @Column(name = "first_name", nullable = true, length = 100)
    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    @Basic
    @Column(name = "last_name", nullable = true, length = 100)
    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Basic
    @Column(name = "email", nullable = true, length = 255)
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    @Basic
    @Column(name = "telephone_num", nullable = true, length = 45)
    public String getTelephoneNum() {
        return telephoneNum;
    }
    public void setTelephoneNum(String telephoneNum) {
        this.telephoneNum = telephoneNum;
    }

    @Basic
    @Column(name = "afm", nullable = true, length = 45)
    public String getAfm() {
        return afm;
    }
    public void setAfm(String afm) {
        this.afm = afm;
    }

    @Basic
    @Column(name = "bidder_rating", nullable = true, precision = 0)
    public Double getBidderRating() {
        return bidderRating;
    }
    public void setBidderRating(Double bidderRating) {
        this.bidderRating = bidderRating;
    }

    @Basic
    @Column(name = "seller_rating", nullable = true, precision = 0)
    public Double getSellerRating() {
        return sellerRating;
    }
    public void setSellerRating(Double sellerRating) {
        this.sellerRating = sellerRating;
    }

    @Basic
    @Column(name = "is_admin", nullable = false, length = 1)
    public String getIsAdmin() {
        return isAdmin;
    }
    public void setIsAdmin(String isAdmin) {
        this.isAdmin = isAdmin;
    }

    @Basic
    @Column(name = "address")
    public String getAddress(){ return address;}
    public void setAddress(String address){this.address = address;}

    @Basic
    @Column(name = "city")
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    @Basic
    @Column(name = "country")
    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    @Basic
    @Column(name = "is_approved")
    public String getIsApproved() { return isApproved; }
    public void setIsApproved(String isApproved) { this.isApproved = isApproved; }

    @OneToMany(mappedBy = "bidder")
    public List<Bid> getBids() { return bids; }
    public void setBids(List<Bid> bids) { this.bids = bids; }

    @OneToMany(mappedBy = "seller")
    public List<Item> getItems() { return items; }
    public void setItems(List<Item> items) { this.items = items; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return id == user.id &&
                Objects.equals(username, user.username) &&
                Objects.equals(password, user.password) &&
                Objects.equals(firstName, user.firstName) &&
                Objects.equals(lastName, user.lastName) &&
                Objects.equals(email, user.email) &&
                Objects.equals(telephoneNum, user.telephoneNum) &&
                Objects.equals(afm, user.afm) &&
                Objects.equals(bidderRating, user.bidderRating) &&
                Objects.equals(sellerRating, user.sellerRating) &&
                Objects.equals(address, user.address) &&
                Objects.equals(city, user.city) &&
                Objects.equals(country, user.country) &&
                Objects.equals(isAdmin, user.isAdmin) &&
                Objects.equals(isApproved, user.isApproved);
    }
    @Override
    public int hashCode() {
        return Objects.hash(id, username, password, firstName, lastName, email, telephoneNum,
                            afm, address, city, country, bidderRating, sellerRating, isAdmin, isApproved);
    }
}
